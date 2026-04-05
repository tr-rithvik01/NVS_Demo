import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { z } from "zod";
import { BookingSchema } from "~/lib/api-schemas";
import { calculateBookingEstimate, formatInr } from "~/lib/booking-estimate";
import { sendBookingNotification } from "~/lib/booking.server";

export const action = async ({ request, context }: ActionFunctionArgs) => {
  try {
    const booking = BookingSchema.parse(await request.json());
    const travelDate = new Date(`${booking.date}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (Number.isNaN(travelDate.getTime()) || travelDate < today) {
      return Response.json(
        {
          error: "Please choose a valid travel date that is today or later.",
        },
        { status: 400 }
      );
    }

    const estimate = calculateBookingEstimate(booking);
    await sendBookingNotification(context, booking);

    return Response.json({
      reply: [
        "# Booking Request Received",
        "",
        "Your travel request has been recorded and forwarded to the NVS team.",
        "",
        `- **Date:** ${booking.date}`,
        `- **Passengers:** ${booking.passengers}`,
        `- **Car Type:** ${booking.carType}`,
        `- **Car:** ${booking.carModel}`,
        `- **From:** ${booking.from}`,
        `- **To:** ${booking.to}`,
        `- **Estimated Distance:** ${estimate.estimatedDistanceKm} km`,
        `- **Estimated Cost:** ${formatInr(estimate.estimatedCost)}`,
        "",
        "**Next step:** The team will review the request and follow up with availability and pricing.",
      ].join("\n"),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: error.flatten() }, { status: 400 });
    }

    console.error("Chatbot booking request failed:", error);

    return Response.json(
      {
        error:
          "The booking request could not be forwarded right now. Check BOOKING_WEBHOOK_URL in Cloudflare Pages settings and try again.",
      },
      { status: 500 }
    );
  }
};
