import { createRequestHandler } from "@remix-run/express";
import dotenv from "dotenv";
import express from "express";
import { calculateBookingEstimate, formatInr } from "./app/lib/booking-estimate";
import { sendBookingNotification } from "./app/lib/booking.server";
import { getChatbotReply } from "./app/lib/chatbot.server";
import { prisma } from "./app/lib/db.server";
import { z } from "zod";

dotenv.config({ path: ".env.local" });
dotenv.config();

const app = express();
const PORT = 3000;

// FastAPI-like API logic using Zod for validation
const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string(),
  message: z.string().min(10),
});

const ChatbotSchema = z.object({
  message: z.string().min(2),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      })
    )
    .optional(),
});

const BookingSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  passengers: z.coerce.number().int().min(1).max(50),
  carType: z.string().min(2),
  carModel: z.string().min(2),
  from: z.string().min(3),
  to: z.string().min(3),
  distanceKm: z.coerce.number().positive().optional(),
});

app.use(express.json());

app.get("/.well-known/appspecific/com.chrome.devtools.json", (_req, res) => {
  res.status(204).end();
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Blog API
app.get("/api/blog", async (req, res) => {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { publishedAt: "desc" },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// Contact API with validation (FastAPI style)
app.post("/api/contact", async (req, res) => {
  try {
    const data = ContactSchema.parse(req.body);
    // In a real app, save to DB or send email
    console.log("Contact form submission:", data);
    res.json({ message: "Success", data });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.flatten() });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

app.post("/api/chatbot", async (req, res) => {
  try {
    const data = ChatbotSchema.parse(req.body);
    const reply = await getChatbotReply(data.message, data.history);
    res.json({ reply });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.flatten() });
    } else {
      res.status(500).json({
        reply:
          "I can help with NVS services, fleet options, school bus safety, corporate transport, or cab rentals. Please try asking again.",
      });
    }
  }
});

app.post("/api/chatbot/book", async (req, res) => {
  try {
    const data = BookingSchema.parse(req.body);
    const travelDate = new Date(`${data.date}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (Number.isNaN(travelDate.getTime()) || travelDate < today) {
      return res.status(400).json({
        error: "Please choose a valid travel date that is today or later.",
      });
    }

    const estimate = calculateBookingEstimate(data);
    await sendBookingNotification(data);

    return res.json({
      reply: [
        "# Booking Request Received",
        "",
        "Your travel request has been recorded and emailed to the NVS team.",
        "",
        `- **Date:** ${data.date}`,
        `- **Passengers:** ${data.passengers}`,
        `- **Car Type:** ${data.carType}`,
        `- **Car:** ${data.carModel}`,
        `- **From:** ${data.from}`,
        `- **To:** ${data.to}`,
        `- **Estimated Distance:** ${estimate.estimatedDistanceKm} km`,
        `- **Estimated Cost:** ${formatInr(estimate.estimatedCost)}`,
        "",
        "**Next step:** The team will review the request and follow up with availability and pricing.",
      ].join("\n"),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.flatten() });
    }

    console.error("Chatbot booking request failed:", error);

    return res.status(500).json({
      error:
        "The booking could not be emailed right now. Check the SMTP settings in .env.local and try again.",
    });
  }
});

// CMS-like API for Headless Content Management (Strapi-inspired)
app.get("/api/cms/posts", async (req, res) => {
  const posts = await prisma.blogPost.findMany();
  res.json(posts);
});

app.post("/api/cms/posts", async (req, res) => {
  try {
    const post = await prisma.blogPost.create({ data: req.body });
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: "Failed to create post" });
  }
});

app.put("/api/cms/posts/:id", async (req, res) => {
  try {
    const post = await prisma.blogPost.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: "Failed to update post" });
  }
});

// Remix handler
const viteDevServer =
  process.env.NODE_ENV === "production"
    ? null
    : await import("vite").then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
          appType: "custom",
        })
      );

if (viteDevServer) {
  app.use(viteDevServer.middlewares);
} else {
  app.use(
    "/assets",
    express.static("build/client/assets", { immutable: true, maxAge: "1y" })
  );
  app.use(express.static("build/client", { maxAge: "1h" }));
}

app.all(
  "*",
  createRequestHandler({
    build: viteDevServer
      ? () => viteDevServer.ssrLoadModule("virtual:remix/server-build")
      : await import("./build/server/index.js") as any,
  })
);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`AI Pipe chatbot enabled: ${Boolean(process.env.AIPIPE_TOKEN)}`);
});
