// Common API Response Structures
export interface ApiErrorResponse {
  message: string;
}

// Student Info Response (from /user-api/student-info)
export interface StudentInfoData {
  studentId: string;
  name: string;
  status: number;
  isPaidUnionFee: boolean;
  isCouncil: boolean;
  majorCode: number;
}

export interface StudentInfoResponse {
  message: string;
  data: StudentInfoData;
}

// Event Info Response (from /user-api/events/{eventId})
export interface EventInfoData {
  id: number;
  name: string;
  description: string;
  product_name: string;
  product_quantity: number;
  location: string;
  require_status: number;
  require_union_fee: boolean;
  allowed_departments: number[];
  status: "BEFORE" | "ONGOING" | "PAUSE" | "FINISHED";
  start_time: string;
  end_time: string;
  created_at: string;
  updated_at: string;
}

export interface EventInfoResponse {
  message: string;
  data: EventInfoData;
}

// Product Count Response (from /user-api/events/{eventId}/count)
export interface ProductCountData {
  enrolled_count: number;
}

export interface ProductCountResponse {
  message: string;
  data: ProductCountData;
}

// Random Key Response (from /user-api/events/{eventId}/issue-random-key)
export interface IssueRandomKeyRequest {
  token: string;
}

export interface RandomKeyData {
  random_key: string;
  expire_time: number;
  event_id: number;
}

export interface RandomKeyResponse {
  message: string;
  data: RandomKeyData;
}

// Enrollment API (from /api/v1/event/{eventId}/enroll)
export interface EnrollStudentRequest {
  randomKey: string;
}

export interface EnrollmentData {
  eventId: number;
  studentId: string;
  studentName: string;
  enrollmentId: number;
  timestamp: string;
}

export interface EnrollmentResponse {
  message: string;
  detail: string;
  data: EnrollmentData;
  success: boolean;
}

// Legacy types for backward compatibility
export type UserInfoData = StudentInfoData;
export type UserInfoResponse = StudentInfoResponse;
export type IssueRandomKeyResponse = RandomKeyResponse;
export type EnrollStudentResponse = EnrollmentResponse;
export type EnrolledCountData = ProductCountData;
export type EnrolledCountResponse = ProductCountResponse;
export type EventDetailData = EventInfoData;
export type EventDetailResponse = EventInfoResponse;

export interface EnrolledCountErrorResponse {
  message: string;
}

export interface EventDetailErrorResponse {
  message: string;
}

// Generic API Response type for backward compatibility
export interface ApiSuccessResponse<T> {
  message: string;
  detail: string;
  data: T;
  success: boolean;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
