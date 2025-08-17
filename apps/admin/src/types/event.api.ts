export interface EventRequestDto {
  name: string;
  location: string;
  productName: string;
  description: string;
  productQuantity: number;
  requireStatus: number;
  requireUnionFee: boolean;
  startTime: string;
  endTime: string;
}

export interface EventResponseDto {
  id: number;
  name: string;
  location: string;
  productName: string;
  productQuantity: number;
  description: string;
  status: "BEFORE" | "ONGOING" | "PAUSE" | "AFTER";
  requireStatus: number;
  requireUnionFee: boolean;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface PageEventResponseDto {
  totalElements: number;
  totalPages: number;
  size: number;
  content: EventResponseDto[];
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface EnrollmentRequestDto {
  randomKey: string;
}

export interface EnrollmentResponseDto {
  eventId: number;
  studentId: string;
  enrollmentId: number;
  timestamp: string;
}

export interface EnrolledCountResponseDto {
  count: number;
}
