import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Overline } from "@/components/ui/Overline";
import { bookingPage, getBookingType } from "@/content/booking";
import type { BookingValues } from "@/lib/booking/schema";
import { describeTime } from "@/lib/booking/summary";
import { bookingWhatsAppLink } from "@/lib/booking/whatsapp";

// Stable, so the heading is focused once when the screen appears, not on every render.
const focusOnMount = (node: HTMLElement | null) => node?.focus();

/**
 * Shown after the request is sent (flow step 7), or after WhatsApp opens with it for the visitor
 * to send. Never says "confirmed": the team replies to confirm a time.
 */
export function BookingSuccess({ values, interest }: { values: BookingValues; interest: string }) {
  const copy = bookingPage.success;
  const type = getBookingType(values.type);
  const time = describeTime(values);
  const firstName = values.fullName.split(/\s+/)[0];

  return (
    <div className="rounded-2xl border border-copper-500/25 bg-ink-900/60 p-6 sm:p-10 motion-safe:animate-fade-up">
      <span className="flex size-14 items-center justify-center rounded-full border border-copper-500/40 bg-copper-500/10 shadow-glow">
        <Check aria-hidden className="size-7 text-copper-400" />
      </span>
      <h2
        ref={focusOnMount}
        tabIndex={-1}
        className="mt-6 text-balance text-2xl font-bold tracking-tight focus:outline-none sm:text-3xl"
      >
        {copy.title}
      </h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-titanium-500">
        {copy.intro(firstName, values.email)}
      </p>

      <div className="mt-8 rounded-xl border border-line bg-ink-950/40 p-5">
        <Overline>{copy.requested}</Overline>
        <p className="mt-2 font-semibold text-titanium-50">
          {type?.title} · {interest}
        </p>
        {time && (
          <p className="mt-1 text-titanium-300">
            {time.date} · {time.slot} · {time.zone}
          </p>
        )}
      </div>

      <Overline className="mt-8">{copy.nextTitle}</Overline>
      <ol className="mt-4 space-y-3">
        {copy.next.map((item, index) => (
          <li key={item} className="flex gap-4">
            <span className="font-mono text-sm text-copper-400">{String(index + 1).padStart(2, "0")}</span>
            <span className="text-titanium-300">{item}</span>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-wrap gap-4">
        {copy.reopen && (
          <ButtonLink href={bookingWhatsAppLink(values, interest)} target="_blank" rel="noopener noreferrer">
            {copy.reopen}
          </ButtonLink>
        )}
        {copy.actions.map((action, index) => (
          <ButtonLink
            key={action.href}
            href={action.href}
            variant={index === 0 && !copy.reopen ? "primary" : "outline"}
          >
            {action.label}
          </ButtonLink>
        ))}
      </div>
    </div>
  );
}
