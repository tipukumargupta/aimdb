/**
 * A WhatsApp click-to-chat link. `number` may be formatted for display ("+880 1711-000000");
 * wa.me wants the digits only, country code first. `text` prefills the visitor's message.
 */
export function whatsappLink(number: string, text?: string) {
  const link = `https://wa.me/${number.replace(/\D/g, "")}`;
  return text ? `${link}?text=${encodeURIComponent(text)}` : link;
}
