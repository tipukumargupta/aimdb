"use client";

import { useRef, useState, useTransition, type FormEvent } from "react";
import { flushSync } from "react-dom";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { submitBookingRequest } from "@/app/book/actions";
import { Honeypot } from "@/components/forms/FormParts";
import { Button } from "@/components/ui/Button";
import { Overline } from "@/components/ui/Overline";
import { bookingErrors, bookingPage, bookingViaWhatsApp } from "@/content/booking";
import {
  bookingFieldNames,
  emptyBooking,
  interestLabel,
  interestValues,
  normalizeBooking,
  validateBooking,
  type BookingErrors,
  type BookingFieldName,
  type BookingValues,
  type InterestGroup,
} from "@/lib/booking/schema";
import { bookingSummary } from "@/lib/booking/summary";
import { bookingWhatsAppLink } from "@/lib/booking/whatsapp";
import { BookingSuccess } from "./BookingSuccess";
import { StepIndicator } from "./StepIndicator";
import { DetailsStep } from "./steps/DetailsStep";
import { ReviewStep } from "./steps/ReviewStep";
import { TimeStep } from "./steps/TimeStep";
import { TypeStep } from "./steps/TypeStep";
import { useDetectedTimeZone } from "./useBrowserTime";

/** Fields each step checks before moving on. The review step checks them all. */
const stepFields: BookingFieldName[][] = [
  ["type", "interest"],
  ["date", "slot", "timeZone"],
  ["fullName", "email", "phone", "company", "institution", "website", "skillLevel", "budget", "timeline", "message"],
];
const REVIEW = stepFields.length;

type BookingFlowProps = {
  interestGroups: InterestGroup[];
  initialType?: string;
  initialInterest?: string;
};

/**
 * The "Request a Meeting" flow (requirements §9.3, steps 1–7). Every step stays mounted and
 * inactive ones are hidden, so the final submit posts the whole form as one FormData.
 */
export function BookingFlow({ interestGroups, initialType = "", initialInterest = "" }: BookingFlowProps) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<BookingValues>({ ...emptyBooking, type: initialType, interest: initialInterest });
  const [errors, setErrors] = useState<BookingErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [sent, setSent] = useState<BookingValues | null>(null);
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // The browser's timezone applies until the visitor picks another.
  const detectedZone = useDetectedTimeZone();
  const current = { ...values, timeZone: values.timeZone || detectedZone };
  const { actions } = bookingPage;

  function update(name: BookingFieldName, value: string) {
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => (previous[name] ? { ...previous, [name]: undefined } : previous));
  }

  /** Moves focus to the new step's heading so screen readers announce it. */
  function goTo(next: number) {
    flushSync(() => setStep(next));
    headingRef.current?.focus();
  }

  /** Opens the step with the first error and focuses that field. */
  function showErrors(found: BookingErrors) {
    const first = bookingFieldNames.find((name) => found[name]);
    if (!first) return;
    flushSync(() => {
      setErrors(found);
      setStep(stepFields.findIndex((fields) => fields.includes(first)));
    });
    formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const checked: readonly BookingFieldName[] = stepFields[step] ?? bookingFieldNames;
    const all = validateBooking(normalizeBooking(current), interestValues(interestGroups));
    const found = Object.fromEntries(
      Object.entries(all).filter(([name]) => checked.includes(name as BookingFieldName)),
    );
    if (Object.keys(found).length > 0) return showErrors(found);
    if (step < REVIEW) return goTo(step + 1);

    if (bookingViaWhatsApp) {
      // Opened inside the submit gesture so pop-up blockers allow it. The visitor sends the
      // message themselves; the success screen links to it again in case it didn't open.
      const request = normalizeBooking(current);
      const link = bookingWhatsAppLink(request, interestLabel(request.interest, interestGroups));
      window.open(link, "_blank", "noopener,noreferrer");
      setSent(request);
      return;
    }

    const formData = new FormData(event.currentTarget);
    const request = current;
    setSubmitError("");
    startTransition(async () => {
      try {
        const result = await submitBookingRequest(formData);
        if (result.ok) setSent(request);
        else if (result.errors) showErrors(result.errors);
        else setSubmitError(result.message ?? bookingErrors.send);
      } catch {
        setSubmitError(bookingErrors.network);
      }
    });
  }

  if (sent) return <BookingSuccess values={sent} interest={interestLabel(sent.interest, interestGroups)} />;

  const stepProps = { values: current, errors, onChange: update };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="booking-step-title"
      className="rounded-2xl border border-copper-500/25 bg-ink-900/60 p-5 sm:p-8 lg:p-10"
    >
      <StepIndicator current={step} />
      <Overline className="mt-8 text-copper-400">{bookingPage.stepCount(step + 1, bookingPage.steps.length)}</Overline>
      <h2
        ref={headingRef}
        id="booking-step-title"
        tabIndex={-1}
        className="mt-3 text-2xl font-bold tracking-tight focus:outline-none sm:text-3xl"
      >
        {bookingPage.steps[step].title}
      </h2>

      <div hidden={step !== 0} className="mt-8 motion-safe:animate-fade-up">
        <TypeStep {...stepProps} interestGroups={interestGroups} />
      </div>
      <div hidden={step !== 1} className="mt-8 motion-safe:animate-fade-up">
        <TimeStep {...stepProps} />
      </div>
      <div hidden={step !== 2} className="mt-8 motion-safe:animate-fade-up">
        <DetailsStep {...stepProps} />
      </div>
      <div hidden={step !== REVIEW} className="mt-8 motion-safe:animate-fade-up">
        <ReviewStep
          sections={bookingSummary(current, interestLabel(current.interest, interestGroups))}
          onEdit={goTo}
          error={submitError}
        />
      </div>

      <Honeypot id="booking-homepage" />

      <div className="mt-10 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        {step > 0 ? (
          <Button variant="outline" onClick={() => goTo(step - 1)} disabled={pending}>
            <ArrowLeft aria-hidden className="size-4" />
            {actions.back}
          </Button>
        ) : (
          <span aria-hidden className="hidden sm:block" />
        )}
        <Button type="submit" size="lg" arrow={step < REVIEW && !pending} disabled={pending}>
          {pending && <LoaderCircle aria-hidden className="size-4 motion-safe:animate-spin" />}
          {step < REVIEW ? actions.next : pending ? actions.sending : actions.submit}
        </Button>
      </div>
      <p aria-live="polite" className="sr-only">
        {pending ? actions.sending : ""}
      </p>
    </form>
  );
}
