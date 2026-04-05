import { z } from "zod";

export const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string(),
  message: z.string().min(10),
});

export const ChatbotSchema = z.object({
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

export const BookingSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  passengers: z.coerce.number().int().min(1).max(50),
  carType: z.string().min(2),
  carModel: z.string().min(2),
  from: z.string().min(3),
  to: z.string().min(3),
  distanceKm: z.coerce.number().positive().optional(),
});
