// Common API Response Structures (OpenAPI format)
export interface ApiErrorResponse {
  message: string;
  detail: string;
  success: boolean;
}

export interface ApiSuccessResponse<T> {
  message: string;
  detail: string;
  data: T;
  success: boolean;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// 1. Random Key Issuance API
export interface IssueRandomKeyData {
  randomKey: string;
  expiredAt: string; // ISO8601 timestamp
}

export type IssueRandomKeyResponse = ApiSuccessResponse<IssueRandomKeyData>;

// 2. Student Enrollment API
export interface EnrollStudentRequest {
  randomKey: string;
}

export interface EnrollStudentData {
  eventId: number;
  studentId: string;
  enrollmentId: number;
  timestamp: string; // ISO8601 timestamp (enrolled time)
}

export type EnrollStudentResponse = ApiSuccessResponse<EnrollStudentData>;

// 3. Enrolled Student Count API
export interface EnrolledCountData {
  count: number;
}

export type EnrolledCountResponse = ApiSuccessResponse<EnrolledCountData>;

export interface EnrolledCountErrorResponse {
  error: string;
}

// 6. Event Detail Lookup API
export interface EventDetailData {
  eventId: number;
  name: string;
  description: string;
  conditions: EventConditions; // Reusing EventConditions from Event Management API
  createdAt: string; // ISO8601 timestamp
}

export type EventDetailResponse = ApiSuccessResponse<EventDetailData>;

// Note: EventDetailErrorResponse can reuse ApiErrorResponse or a specific error type if needed.
// For now, assuming it can be covered by ApiErrorResponse if the error structure is consistent.
// If not, a specific interface like EventManagementErrorResponse would be needed.
// Based on API-ARCHITECTURE.md, it's { "error": "..." }, so EventManagementErrorResponse is a good fit.
// I will define it as EventDetailErrorResponse for clarity, even if it's identical.
export interface EventDetailErrorResponse {
  error: string;
}

// Re-adding EventConditions as it's used by EventDetailData
export interface EventConditions {
  major?: string[];
  year?: string[];
  other_criteria?: unknown; // Placeholder for other criteria
}

// User Info API
export interface UserInfoData {
  name?: string;
  studentId?: string;
  major?: string;
  isCouncil?: boolean;
}

export type UserInfoResponse = ApiSuccessResponse<UserInfoData>;
