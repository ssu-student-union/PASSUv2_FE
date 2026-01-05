export interface Event {
  id: number;
  name: string;
  place: string;
  date: string;
  time: string;
}

export const PARTICIPANT_OPTIONS = [
  { label: "재학생", value: 1 },
  { label: "휴학생", value: 2 },
  { label: "졸업생", value: 4 },
];

export const PARTICIPANT_OPTIONS_MAP: Record<number, string> =
  Object.fromEntries(PARTICIPANT_OPTIONS.map((opt) => [opt.value, opt.label]));

export const FEE_OPTIONS = [
  { label: "납부자", value: "PAID" },
  { label: "미납자", value: "UNPAID" },
];

export type ParticipantOption = (typeof PARTICIPANT_OPTIONS)[number];
export type FeeStatusOption = (typeof FEE_OPTIONS)[number];

export interface EventFormValues {
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  time: string;
  product: string;
  quantity: number;
  participants: ParticipantOption[];
  feeStatus: FeeStatusOption[];
  description: string;
}

export const enum EventStatus {
  BEFORE = "BEFORE",
  ONGOING = "ONGOING",
  PAUSE = "PAUSE",
  AFTER = "AFTER",
}
