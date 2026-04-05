import { Bot, Bus, MessageCircleQuestion, Send, ShieldCheck, Sparkles } from "lucide-react";
import { Fragment, useState, type FormEvent, type ReactNode } from "react";
import { calculateBookingEstimate, carOptionsByType, carTypeOptions, formatInr } from "~/lib/booking-estimate";
import { cn } from "~/lib/utils";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatbotApiResponse = {
  reply?: string;
  error?: string;
};

type BookingFormState = {
  date: string;
  passengers: string;
  carType: string;
  carModel: string;
  from: string;
  to: string;
};

const suggestedPrompts = [
  "What services does NVS offer?",
  "Which fleet options do you have for airport transfer?",
  "How do you handle school bus safety?",
  "Can you support employee transport in Bengaluru?",
];

const starterMessages: ChatMessage[] = [
  {
    role: "assistant",
    content:
      "Hi, I am the NVS support prototype. Ask me about school buses, corporate transport, fleet options, cab rentals, safety, or how to get a quote.",
  },
];

function detectBookingIntent(text: string) {
  const normalized = text.toLowerCase();
  const bookingKeywords = [
    "book a cab",
    "book cab",
    "book a car",
    "book car",
    "book ride",
    "need a cab",
    "need cab",
    "need a car",
    "want to book",
    "want cab",
    "want a cab",
    "reserve a cab",
    "schedule a cab",
    "airport pickup",
    "airport drop",
  ];

  return bookingKeywords.some((keyword) => normalized.includes(keyword));
}

function renderInlineFormatting(text: string) {
  const segments = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);

  return segments.map((segment, index) => {
    if (segment.startsWith("**") && segment.endsWith("**")) {
      return <strong key={`${segment}-${index}`}>{segment.slice(2, -2)}</strong>;
    }

    return <Fragment key={`${segment}-${index}`}>{segment}</Fragment>;
  });
}

function renderFormattedMessage(content: string): ReactNode {
  const lines = content.split("\n");
  const blocks: ReactNode[] = [];
  let bulletItems: string[] = [];
  let numberedItems: string[] = [];

  const flushBullets = () => {
    if (!bulletItems.length) return;
    blocks.push(
      <ul key={`bullets-${blocks.length}`} className="list-disc space-y-1 pl-5">
        {bulletItems.map((item, index) => (
          <li key={`${item}-${index}`}>{renderInlineFormatting(item)}</li>
        ))}
      </ul>
    );
    bulletItems = [];
  };

  const flushNumbered = () => {
    if (!numberedItems.length) return;
    blocks.push(
      <ol key={`numbered-${blocks.length}`} className="list-decimal space-y-1 pl-5">
        {numberedItems.map((item, index) => (
          <li key={`${item}-${index}`}>{renderInlineFormatting(item)}</li>
        ))}
      </ol>
    );
    numberedItems = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushBullets();
      flushNumbered();
      continue;
    }

    const bulletMatch = line.match(/^[-*]\s+(.+)$/);
    if (bulletMatch) {
      flushNumbered();
      bulletItems.push(bulletMatch[1]);
      continue;
    }

    const numberedMatch = line.match(/^\d+\.\s+(.+)$/);
    if (numberedMatch) {
      flushBullets();
      numberedItems.push(numberedMatch[1]);
      continue;
    }

    flushBullets();
    flushNumbered();

    const headingMatch = line.match(/^#{1,3}\s+(.+)$/);
    if (headingMatch) {
      blocks.push(
        <p key={`heading-${blocks.length}`} className="font-semibold">
          {renderInlineFormatting(headingMatch[1])}
        </p>
      );
      continue;
    }

    blocks.push(
      <p key={`paragraph-${blocks.length}`} className="whitespace-pre-wrap">
        {renderInlineFormatting(line)}
      </p>
    );
  }

  flushBullets();
  flushNumbered();

  return <div className="space-y-3">{blocks}</div>;
}

export function HomeChatPrototype() {
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingForm, setBookingForm] = useState<BookingFormState>({
    date: "",
    passengers: "1",
    carType: "",
    carModel: "",
    from: "",
    to: "",
  });

  const bookingEstimate =
    bookingForm.carType && bookingForm.carModel && bookingForm.from.trim() && bookingForm.to.trim()
      ? calculateBookingEstimate({
          carType: bookingForm.carType,
          carModel: bookingForm.carModel,
          passengers: Number(bookingForm.passengers) || 1,
          from: bookingForm.from.trim(),
          to: bookingForm.to.trim(),
        })
      : null;

  const sendMessage = async (messageText: string) => {
    const trimmed = messageText.trim();
    if (!trimmed || isLoading) return;

    if (detectBookingIntent(trimmed)) {
      setShowBookingForm(true);
    }

    const nextMessages = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: nextMessages.slice(-6),
        }),
      });

      const data = (await response.json()) as ChatbotApiResponse;
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            data.reply ||
            "I can help with NVS services, fleet options, support questions, and next steps. Try asking about school bus safety, employee transport, or cab rental availability.",
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "I could not reach the live assistant right now. For the demo, ask about NVS services, fleet categories, bus safety, corporate transport, or cab rental support.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await sendMessage(input);
  };

  const handleBookingSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isBooking) return;

    const payload = {
      date: bookingForm.date,
      passengers: Number(bookingForm.passengers),
      carType: bookingForm.carType,
      carModel: bookingForm.carModel,
      from: bookingForm.from.trim(),
      to: bookingForm.to.trim(),
    };

    if (
      !payload.date ||
      !payload.from ||
      !payload.to ||
      !payload.carType ||
      !payload.carModel ||
      Number.isNaN(payload.passengers)
    ) {
      setBookingError("Please complete the trip details before submitting the booking request.");
      return;
    }

    setBookingError("");
    setIsBooking(true);

    const summary = [
      "# Booking Request",
      "",
      `- **Date:** ${payload.date}`,
      `- **Passengers:** ${payload.passengers}`,
      `- **Car Type:** ${payload.carType}`,
      `- **Car:** ${payload.carModel}`,
      `- **From:** ${payload.from}`,
      `- **To:** ${payload.to}`,
      ...(bookingEstimate
        ? [
            `- **Estimated Distance:** ${bookingEstimate.estimatedDistanceKm} km`,
            `- **Estimated Cost:** ${formatInr(bookingEstimate.estimatedCost)}`,
          ]
        : []),
    ].join("\n");

    setMessages((current) => [...current, { role: "user", content: summary }]);

    try {
      const response = await fetch("/api/chatbot/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as ChatbotApiResponse;
      if (!response.ok) {
        throw new Error(data.error || "Booking failed.");
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            data.reply ||
            "## Booking Request Received\n\nYour request has been forwarded to the NVS team.",
        },
      ]);
      setBookingForm({
        date: "",
        passengers: "1",
        carType: "",
        carModel: "",
        from: "",
        to: "",
      });
      setShowBookingForm(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Booking failed.";
      setBookingError(message);
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: `## Booking Request Failed\n\n${message}`,
        },
      ]);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <section className="relative pb-12">
      <div className="container-wide">
        <div className="overflow-hidden rounded-[3rem] border border-white/70 bg-white/80 shadow-2xl backdrop-blur">
          <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="border-b border-slate-200/80 p-8 lg:border-b-0 lg:border-r lg:p-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
                <Sparkles size={14} />
                AI Support Prototype
              </div>
              <h2 className="mt-5 max-w-xl text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                A simple chatbot demo for NVS support, fleet questions, and service discovery.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                This prototype shows what a customer-facing assistant could do: explain NVS services, answer fleet
                questions, guide school and corporate users, and handle basic support-style queries.
              </p>

              <div className="mt-8 grid gap-4">
                <div className="rounded-[1.75rem] bg-slate-50 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <MessageCircleQuestion size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Ask about NVS</p>
                      <p className="text-sm text-slate-600">Services, locations, contact flow, and operating model</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-[1.75rem] bg-slate-50 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                      <Bus size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Ask about fleet</p>
                      <p className="text-sm text-slate-600">Vehicle categories, bus types, cab options, and use cases</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-[1.75rem] bg-slate-50 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Ask for support</p>
                      <p className="text-sm text-slate-600">Safety features, quote guidance, and next steps</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => void sendMessage(prompt)}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-primary hover:text-primary"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-[linear-gradient(180deg,#f8fbfb_0%,#f3f8f7_100%)] p-6 sm:p-8 lg:p-10">
              <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lg">
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white">
                      <Bot size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">NVS Assistant</p>
                      <p className="text-xs text-slate-500">Prototype support experience</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700">
                    Live Demo
                  </span>
                </div>

                <div className="max-h-[28rem] space-y-4 overflow-y-auto bg-slate-50 px-4 py-5 sm:px-5">
                  {messages.map((message, index) => (
                    <div
                      key={`${message.role}-${index}`}
                      className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] rounded-[1.5rem] px-4 py-3 text-sm leading-relaxed shadow-sm",
                          message.role === "user"
                            ? "bg-primary text-white"
                            : "border border-slate-200 bg-white text-slate-700"
                        )}
                      >
                        {renderFormattedMessage(message.content)}
                      </div>
                    </div>
                  ))}
                  {isLoading ? (
                    <div className="flex justify-start">
                      <div className="rounded-[1.5rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
                        Thinking...
                      </div>
                    </div>
                  ) : null}
                </div>

                {showBookingForm ? (
                  <div className="border-t border-slate-200 bg-slate-50/70 p-4">
                    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
                      <div className="mb-4 flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-bold text-slate-900">Book a vehicle</p>
                          <p className="text-xs text-slate-500">
                            Enter your pickup and drop locations as text and send the request from the chatbot.
                          </p>
                        </div>
                        <span className="rounded-full bg-sky-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-sky-700">
                          Booking
                        </span>
                      </div>

                      <form onSubmit={handleBookingSubmit} className="grid gap-3 sm:grid-cols-2">
                        <label className="space-y-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                          Date
                          <input
                            type="date"
                            min={new Date().toISOString().split("T")[0]}
                            value={bookingForm.date}
                            onChange={(event) =>
                              setBookingForm((current) => ({ ...current, date: event.target.value }))
                            }
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-normal tracking-normal text-slate-900 outline-none transition focus:border-primary focus:bg-white"
                          />
                        </label>

                        <label className="space-y-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                          Passengers
                          <input
                            type="number"
                            min="1"
                            max="50"
                            value={bookingForm.passengers}
                            onChange={(event) =>
                              setBookingForm((current) => ({ ...current, passengers: event.target.value }))
                            }
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-normal tracking-normal text-slate-900 outline-none transition focus:border-primary focus:bg-white"
                          />
                        </label>

                        <label className="space-y-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                          Car Type
                          <select
                            value={bookingForm.carType}
                            onChange={(event) =>
                              setBookingForm((current) => {
                                const nextType = event.target.value as keyof typeof carOptionsByType;
                                return {
                                  ...current,
                                  carType: nextType,
                                  carModel: nextType ? carOptionsByType[nextType][0] : "",
                                };
                              })
                            }
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-normal tracking-normal text-slate-900 outline-none transition focus:border-primary focus:bg-white"
                          >
                            <option value="">Select car type</option>
                            {carTypeOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className="space-y-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                          Car
                          <select
                            value={bookingForm.carModel}
                            disabled={!bookingForm.carType}
                            onChange={(event) =>
                              setBookingForm((current) => ({ ...current, carModel: event.target.value }))
                            }
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-normal tracking-normal text-slate-900 outline-none transition focus:border-primary focus:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <option value="">{bookingForm.carType ? "Select car" : "Choose car type first"}</option>
                            {bookingForm.carType
                              ? carOptionsByType[bookingForm.carType as keyof typeof carOptionsByType].map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))
                              : null}
                          </select>
                        </label>

                        <label className="space-y-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                          From
                          <input
                            type="text"
                            value={bookingForm.from}
                            onChange={(event) =>
                              setBookingForm((current) => ({
                                ...current,
                                from: event.target.value,
                              }))
                            }
                            placeholder="Enter pickup location"
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-normal tracking-normal text-slate-900 outline-none transition focus:border-primary focus:bg-white"
                          />
                        </label>

                        <label className="space-y-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-500 sm:col-span-2">
                          To
                          <input
                            type="text"
                            value={bookingForm.to}
                            onChange={(event) =>
                              setBookingForm((current) => ({
                                ...current,
                                to: event.target.value,
                              }))
                            }
                            placeholder="Enter drop location"
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-normal tracking-normal text-slate-900 outline-none transition focus:border-primary focus:bg-white"
                          />
                        </label>

                        {bookingEstimate ? (
                          <div className="sm:col-span-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                            <p className="font-semibold">Estimated fare: {formatInr(bookingEstimate.estimatedCost)}</p>
                            <p className="mt-1 text-xs text-emerald-800">
                              Based on an estimated trip distance of {bookingEstimate.estimatedDistanceKm} km, selected vehicle type, and passenger count.
                            </p>
                          </div>
                        ) : (
                          <p className="sm:col-span-2 text-xs text-slate-500">
                            Enter pickup and drop locations and choose the vehicle details to see an estimated cost.
                          </p>
                        )}

                        {bookingError ? <p className="sm:col-span-2 text-sm text-rose-600">{bookingError}</p> : null}

                        <div className="sm:col-span-2 flex justify-end gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              setShowBookingForm(false);
                              setBookingError("");
                            }}
                            className="inline-flex min-w-32 items-center justify-center rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                          >
                            Close
                          </button>
                          <button
                            type="submit"
                            disabled={isBooking}
                            className="inline-flex min-w-40 items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {isBooking ? "Sending booking..." : "Book from chatbot"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                ) : null}

                <form onSubmit={handleSubmit} className="border-t border-slate-200 bg-white p-4">
                  <div className="flex items-center gap-3">
                    <input
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                      placeholder="Ask about NVS, fleet, bus safety, or support..."
                      className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:bg-white"
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white transition hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
