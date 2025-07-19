// Common API Response Structures
export interface ApiErrorResponse {
  isSuccess: false;
  message: string;
  detail?: string;
}

export type ApiSuccessResponse<T> = {
  isSuccess: true;
  message: string;
} & T;

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// 1. Random Key Issuance API
export interface IssueRandomKeyPayload {
  random_key: string;
  expired_at: string; // ISO8601 timestamp
}

export type IssueRandomKeyResponse = ApiResponse<IssueRandomKeyPayload>;

// 2. Student Enrollment API
export interface EnrollStudentRequest {
  random_key: string;
}

export interface EnrollStudentPayload {
  event_id: string;
  student_id: string;
  enrollment_id: string;
  timestamp: string; // ISO8601 timestamp (enrolled time)
}

export type EnrollStudentResponse = ApiResponse<EnrollStudentPayload>;

// 3. Enrolled Student Count API
export interface EnrolledCountPayload {
  count: number;
}

export type EnrolledCountResponse = ApiSuccessResponse<EnrolledCountPayload>;

export interface EnrolledCountErrorResponse {
  error: string;
}

// 6. Event Detail Lookup API
export interface EventDetailPayload {
  event_id: string;
  name: string;
  description: string;
  conditions: EventConditions; // Reusing EventConditions from Event Management API
  created_at: string; // ISO8601 timestamp
}

export type EventDetailResponse = ApiResponse<EventDetailPayload>;

// Note: EventDetailErrorResponse can reuse ApiErrorResponse or a specific error type if needed.
// For now, assuming it can be covered by ApiErrorResponse if the error structure is consistent.
// If not, a specific interface like EventManagementErrorResponse would be needed.
// Based on API-ARCHITECTURE.md, it's { "error": "..." }, so EventManagementErrorResponse is a good fit.
// I will define it as EventDetailErrorResponse for clarity, even if it's identical.
export interface EventDetailErrorResponse {
  error: string;
}

// Re-adding EventConditions as it's used by EventDetailPayload
export interface EventConditions {
  major?: string[];
  year?: string[];
  other_criteria?: unknown; // Placeholder for other criteria
}
