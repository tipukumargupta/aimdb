import "server-only";
import { getBookingType } from "@/content/booking";
import { sendEmail } from "@/lib/email";
import type { BookingValues } from "./schema";
import { bookingSummaryText } from "./summary";

/** Emails a validated meeting request to the team, with the visitor as reply-to. */
export function sendBookingEmail(values: BookingValues, interest: string) {
  const type = getBookingType(values.type);
  const text = [
    `New meeting request from the website. Reply to this email to answer ${values.fullName} directly.`,
    ...bookingSummaryText(values, interest),
    "Nothing is booked yet. Reply to agree a time and send the meeting link.",
  ].join("\n\n");

  return sendEmail({ subject: `Booking request: ${type?.title} — ${values.fullName}`, text, replyTo: values.email });
}
