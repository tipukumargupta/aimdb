import { bookingPage } from "@/content/booking";
import { contactDetails } from "@/content/contact";
import { whatsappLink } from "@/lib/whatsapp";
import type { BookingValues } from "./schema";
import { bookingSummaryText } from "./summary";

/**
 * A WhatsApp link that opens a chat with the business, the whole request filled in for the
 * visitor to send. Only used when `contactDetails.whatsapp` is set (see `bookingViaWhatsApp`).
 */
export function bookingWhatsAppLink(values: BookingValues, interest: string) {
  const text = [
    bookingPage.whatsAppGreeting,
    ...bookingSummaryText(values, interest, (label) => `*${label}*`),
  ].join("\n\n");

  return whatsappLink(contactDetails.whatsapp ?? "", text);
}
