type ChatHistoryMessage = {
  role: "user" | "assistant";
  content: string;
};

const AIPIPE_BASE_URL = process.env.AIPIPE_BASE_URL || "https://aipipe.org/openrouter/v1";
const AIPIPE_MODEL = process.env.AIPIPE_MODEL || "openai/gpt-4.1-nano-2025-04-14";

const systemContext = `
You are NVS Travel Solutions Assistant, a helpful pre-sales and support assistant for a Bengaluru transport service provider.

Your identity:
- Speak as if you represent NVS Travel Solutions directly.
- NVS is based in Bengaluru.
- NVS provides school bus services, corporate transport services, and cab rental services.
- NVS supports schools, companies, admins, parents, and individual customers.

What you know about NVS:
- School bus services include driver verification, attendants, CCTV, GPS tracking, child safety systems, route discipline, and emergency readiness.
- Corporate transport includes shift-based planning, employee safety, route monitoring, control-room support, fleet allocation, and reporting.
- Cab rental includes city rides, airport transfers, executive travel, premium fleet options, multi-fleet support, and dispatch coordination.
- Office location: No 3, Old No, 120, 1st Cross Rd, S.G. Palya, Bengaluru, Karnataka 560029.
- Main office phone: +91 80 4228 7279.
- Main email: info@nvstravelsolutions.in.

How you should answer:
- Sound like a Bengaluru transport service provider speaking to a customer.
- Be practical, support-oriented, and reasonably detailed.
- Use clean markdown-style formatting when it improves readability:
  - short headings with # or ## when useful
  - bullet points for lists
  - numbered steps for processes
  - bold for important labels or contact details
- Prefer well-structured answers over one-line replies.
- When the topic is broad, explain it in 2 to 5 short sections or grouped bullet lists.
- When the user asks for options, compare them clearly and mention suitable use cases.
- When the user asks about a service, cover what it includes, who it is for, and what the next step would be.
- End useful answers with a short next-step suggestion when appropriate.
- When useful, mention Bengaluru-specific use cases like airport transfers, office commute routes, school pickup zones, and city traffic constraints.
- If the user asks about fleet, explain options such as hatchbacks, sedans, SUVs, MPVs, tempo travellers, school buses, and premium vehicles.
- If the user asks for pricing, do not invent exact commercial quotes. Explain that pricing depends on route, fleet type, hours, and support requirements.
- If the user asks about exact live availability, clearly say that this prototype cannot verify live fleet availability.
- If the user asks something unrelated, gently steer the conversation back to NVS, transport, fleet, buses, cabs, commuter support, or booking questions.
- Prefer short paragraphs and bullets. Avoid sounding generic.
- Do not use markdown tables.
`;

function buildUserPrompt(message: string, history: ChatHistoryMessage[]) {
  const transcript = history
    .slice(-6)
    .map((entry) => `${entry.role === "assistant" ? "Assistant" : "User"}: ${entry.content}`)
    .join("\n");

  return `
Stay in character as NVS Travel Solutions Assistant, a Bengaluru transport service provider.

If the user asks about:
- NVS: explain services, office details, or next steps.
- fleet: explain vehicle categories and typical use cases.
- school buses: explain safety, child handling, visibility, and operations.
- corporate transport: explain employee commute support, shift movement, and monitoring.
- cabs: explain city rides, airport transfers, executive travel, and premium options.
- support: answer like a front-line customer support and pre-sales assistant.

Conversation so far:
${transcript || "No prior messages."}

Latest user question:
${message}

Formatting requirement:
- Structure the reply so it reads well in a chat UI.
- Use headings and bullets for multi-part answers instead of long comma-heavy sentences.
- Default to a fuller answer unless the user clearly asks for a brief reply.
- Aim for roughly 120 to 250 words when the question is open-ended and the topic supports it.
- For simple factual questions, still keep the formatting clean and readable.
- If giving contact or next steps, make the labels bold.
`;
}

function fallbackReply(message: string) {
  const text = message.toLowerCase();

  if (text.includes("school") || text.includes("bus safety") || text.includes("student")) {
    return "NVS school bus services focus on driver verification, trained attendants, CCTV, GPS tracking, child check systems, route discipline, and emergency readiness. If you want, I can also explain the school safety features in more detail.";
  }

  if (text.includes("corporate") || text.includes("employee") || text.includes("shift")) {
    return "NVS corporate transport supports employee commute programs with route planning, shift-based coverage, control-room monitoring, live GPS visibility, and escalation support. You can share employee count and shift windows to start a quote discussion.";
  }

  if (text.includes("cab") || text.includes("airport") || text.includes("fleet") || text.includes("car")) {
    return "NVS cab rental services cover city rides, airport transfers, executive movement, group travel, and premium fleet support. Fleet categories typically include sedans, SUVs, MPVs, travellers, and premium vehicles depending on the trip type.";
  }

  if (text.includes("contact") || text.includes("office") || text.includes("call")) {
    return "You can reach NVS at +91 80 4228 7279 or info@nvstravelsolutions.in. The office is at No 3, Old No, 120, 1st Cross Rd, S.G. Palya, Bengaluru, Karnataka 560029.";
  }

  if (text.includes("quote") || text.includes("price") || text.includes("cost")) {
    return "Pricing depends on the service type, route, fleet category, duty hours, and support requirements. For a proper quote, it is best to use the form on the homepage or contact the NVS team directly.";
  }

  return "I can help with NVS services, fleet options, school bus safety, corporate transport, cab rentals, office contact details, and support-style questions. Try asking about buses, employee transport, fleet categories, or how to get a quote.";
}

export async function getChatbotReply(message: string, history: ChatHistoryMessage[] = []) {
  if (!process.env.AIPIPE_TOKEN) {
    return fallbackReply(message);
  }

  try {
    const baseUrl = AIPIPE_BASE_URL.replace(/\/$/, "");
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AIPIPE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: AIPIPE_MODEL,
        temperature: 0.7,
        max_tokens: 700,
        messages: [
          {
            role: "system",
            content: systemContext.trim(),
          },
          ...history.slice(-6).map((entry) => ({
            role: entry.role,
            content: entry.content,
          })),
          {
            role: "user",
            content: buildUserPrompt(message, history).trim(),
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`AI Pipe request failed with status ${response.status}: ${errorText}`);
    }

    const data = (await response.json()) as {
      choices?: Array<{
        message?: {
          content?: string;
        };
      }>;
    };

    return data.choices?.[0]?.message?.content?.trim() || fallbackReply(message);
  } catch (error) {
    console.error("AI Pipe chatbot request failed:", error);
    return fallbackReply(message);
  }
}
