import { calculateBookingEstimate, formatInr } from "./booking-estimate";
import nodemailer from "nodemailer";

export type BookingRequest = {
  date: string;
  passengers: number;
  carType: string;
  carModel: string;
  from: string;
  to: string;
  distanceKm?: number;
};

const BOOKING_NOTIFICATION_EMAIL =
  process.env.BOOKING_NOTIFICATION_EMAIL || "tr.rithvik01@gmail.com";

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

function createTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("SMTP configuration is incomplete.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: {
      user,
      pass,
    },
  });
}

export async function sendBookingNotification(booking: BookingRequest) {
  const transporter = createTransport();
  const formattedDate = formatBookingDate(booking.date);
  const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER || BOOKING_NOTIFICATION_EMAIL;
  const estimate = calculateBookingEstimate(booking);

  const text = [
    "New NVS chatbot booking request",
    "",
    `Travel date: ${formattedDate}`,
    `Passengers: ${booking.passengers}`,
    `Car type: ${booking.carType}`,
    `Car model: ${booking.carModel}`,
    `Pickup: ${booking.from}`,
    `Dropoff: ${booking.to}`,
    `Estimated distance: ${estimate.estimatedDistanceKm} km`,
    `Estimated fare: ${formatInr(estimate.estimatedCost)}`,
  ].join("\n");

  const html = `
    <h2>New NVS chatbot booking request</h2>
    <ul>
      <li><strong>Travel date:</strong> ${formattedDate}</li>
      <li><strong>Passengers:</strong> ${booking.passengers}</li>
      <li><strong>Car type:</strong> ${booking.carType}</li>
      <li><strong>Car model:</strong> ${booking.carModel}</li>
      <li><strong>Pickup:</strong> ${booking.from}</li>
      <li><strong>Dropoff:</strong> ${booking.to}</li>
      <li><strong>Estimated distance:</strong> ${estimate.estimatedDistanceKm} km</li>
      <li><strong>Estimated fare:</strong> ${formatInr(estimate.estimatedCost)}</li>
    </ul>
  `;

  await transporter.sendMail({
    from: fromAddress,
    to: BOOKING_NOTIFICATION_EMAIL,
    subject: `NVS booking request for ${formattedDate}`,
    text,
    html,
  });
}
