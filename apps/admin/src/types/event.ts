export interface Event {
  id: number;
  name: string;
  place: string;
  date: string;
  time: string;
}

export const PARTICIPANT_OPTIONS = [
  { label: "재학생", value: "ENROLLED" },
  { label: "휴학생", value: "ON_LEAVE" },
  { label: "졸업 유예", value: "DELAYED" },
  { label: "졸업생", value: "GRADUATED" },
] as const;

export const FEE_OPTIONS = [
  { label: "납부자", value: "PAID" },
  { label: "미납자", value: "UNPAID" },
] as const;

export type ParticipantOption = (typeof PARTICIPANT_OPTIONS)[number];
export type FeeStatusOption = (typeof FEE_OPTIONS)[number];

export interface EventFormValues {
  title: string;
  location: string;
  date: string;
  time: string;
  product: string;
  quantity: number;
  participants: ParticipantOption[];
  feeStatus: FeeStatusOption[];
  description: string;
}

export enum EventStatus {
  NotStarted = "not_started",
  Ongoing = "ongoing",
  Paused = "paused",
  Finished = "finished",
}
