export interface EventRequest {
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

export interface EventResponse {
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

export interface PageEventResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  content: EventResponse[];
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface EnrollmentRequest {
  randomKey: string;
}

export interface EnrollmentResponse {
  eventId: number;
  studentId: string;
  enrollmentId: number;
  timestamp: string;
}

export interface EnrolledCountResponse {
  count: number;
}

export interface EnrollmentListResponse {
  enrollmentId: number;
  studentId: string;
  studentName: string;
  studentDepartment: string;
  randomKey: number;
  timestamp: string;
  status: string;
}
