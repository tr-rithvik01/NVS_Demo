import { calculateBookingEstimate, formatInr } from "./booking-estimate";
import type { AppLoadContext } from "@remix-run/cloudflare";
import { getRuntimeEnv } from "./env.server";

export type BookingRequest = {
  date: string;
  passengers: number;
  carType: string;
  carModel: string;
  from: string;
  to: string;
  distanceKm?: number;
};

function formatBookingDate(value: string) {
  const parsed = new Date(`${value}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function sendBookingNotification(context: AppLoadContext, booking: BookingRequest) {
  const env = getRuntimeEnv(context);
  const webhookUrl = env.BOOKING_WEBHOOK_URL;
  const formattedDate = formatBookingDate(booking.date);
  const estimate = calculateBookingEstimate(booking);
  const recipient = env.BOOKING_NOTIFICATION_EMAIL || "ops@nvstravelsolutions.in";

  if (!webhookUrl) {
    console.warn("BOOKING_WEBHOOK_URL is not configured; skipping remote booking notification.");
    return;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source: "nvs-chatbot-booking",
      recipient,
      booking,
      formattedDate,
      estimate: {
        estimatedDistanceKm: estimate.estimatedDistanceKm,
        estimatedCost: estimate.estimatedCost,
        estimatedCostFormatted: formatInr(estimate.estimatedCost),
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Booking webhook failed with status ${response.status}: ${errorText}`);
  }
}
