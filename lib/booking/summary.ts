import { bookingLabels, bookingPage, businessTimeZone, getBookingType, timeSlots } from "@/content/booking";
import type { BookingFieldName, BookingValues } from "./schema";
import { convertTime, formatDate, formatOffset, isIsoDate, isValidTimeZone, zoneLabel } from "./time";

export type SummaryRow = { label: string; value: string };

/** The preferred time in the visitor's timezone, plus the team's local time when it differs. */
export function describeTime({ date, slot: slotId, timeZone }: Pick<BookingValues, "date" | "slot" | "timeZone">) {
  const slot = timeSlots.find((item) => item.id === slotId);
  if (!slot || !isIsoDate(date) || !isValidTimeZone(timeZone)) return null;

  const start = convertTime(date, slot.start, timeZone, businessTimeZone.id);
  const end = convertTime(date, slot.end, timeZone, businessTimeZone.id);
  const sameClock = start.date === date && start.time === slot.start;
  const otherDay = start.date === date ? "" : `, ${formatDate(start.date, "short")}`;

  return {
    date: formatDate(date),
    slot: `${slot.label}, ${slot.start}–${slot.end}`,
    zone: `${zoneLabel(timeZone)} (${formatOffset(timeZone, date)})`,
    business: sameClock
      ? null
      : `${start.time}–${end.time}${otherDay} (${formatOffset(businessTimeZone.id, start.date)})`,
  };
}

const detailFields: BookingFieldName[] = [
  "fullName",
  "email",
  "phone",
  "company",
  "institution",
  "website",
  "skillLevel",
  "budget",
  "timeline",
  "message",
];

/** Review rows grouped by form step: meeting, time, details. Shared by the review step and the email. */
export function bookingSummary(values: BookingValues, interest: string): SummaryRow[][] {
  const type = getBookingType(values.type);
  const time = describeTime(values);

  const meeting = [
    { label: bookingLabels.type, value: type ? `${type.title} · ${type.duration}` : "" },
    { label: bookingLabels.interest, value: interest },
  ];
  const when = time
    ? [
        { label: bookingLabels.date, value: time.date },
        { label: bookingLabels.slot, value: `${time.slot} · ${time.zone}` },
        ...(time.business ? [{ label: bookingPage.timeSummary.business, value: time.business }] : []),
      ]
    : [];
  const details = detailFields
    .filter((name) => values[name])
    .map((name) => ({ label: bookingLabels[name], value: values[name] }));

  return [meeting, when, details];
}

/**
 * The summary as plain-text blocks, one per step, for the team's email and the WhatsApp
 * message. `formatLabel` lets WhatsApp bold the labels.
 */
export function bookingSummaryText(
  values: BookingValues,
  interest: string,
  formatLabel = (label: string) => label,
): string[] {
  return bookingSummary(values, interest).map((rows) =>
    rows
      .map(({ label, value }) => {
        // "What would you like to discuss?" reads badly with a colon after it.
        const key = formatLabel(label.endsWith("?") ? label : `${label}:`);
        return value.includes("\n") ? `${key}\n${value}` : `${key} ${value}`;
      })
      .join("\n"),
  );
}
