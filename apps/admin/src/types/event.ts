export interface Event {
  id: number;
  name: string;
  place: string;
  date: string;
  time: string;
}

export const PARTICIPANT_OPTIONS = [
  "재학생",
  "휴학생",
  "졸업 유예",
  "졸업생",
] as const;
export const FEE_OPTIONS = ["납부자", "미납자"] as const;

export type ParticipantOption = (typeof PARTICIPANT_OPTIONS)[number];
export type FeeStatusOption = (typeof FEE_OPTIONS)[number];

export interface FormValues {
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
