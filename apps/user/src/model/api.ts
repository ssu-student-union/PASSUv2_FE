// Common API Response Structures (PassuResponse)
export type PassuResponse<T> = PassuSuccessResponse<T> | PassuErrorResponse;

export interface PassuSuccessResponse<T> {
  result: true;
  message: string;
  data: T;
}

export interface PassuErrorResponse {
  result: false;
  message: string;
}

// Student Info Response (from /user-api/v2/student-info)
export interface StudentInfoData {
  studentId: string;
  name: string;
  major: string;
  status: string | null;
  isPaidUnionFee: boolean;
  isCouncil: boolean;
}

export type StudentInfoResponse = PassuResponse<StudentInfoData>;

export const enum EventRequireStatus {
  /** 기타 */
  OTHER = 0,
  /** 재학생 */
  ATTENDED = 1,
  /** 휴학생 */
  ON_LEAVE = 2,
  /** 졸업생 */
  GRADUATED = 4,
}

// Event Info Response (from /user-api/v2/events/{eventId})
export interface EventInfoData {
  id: number;
  name: string;
  description: string;
  product_name: string;
  product_quantity: number;
  product_enrolled_count: number;
  location: string;
  require_status: EventRequireStatus;
  require_union_fee: boolean;
  allowed_departments: string[];
  status: "BEFORE" | "ONGOING" | "PAUSE" | "AFTER";
  start_time: string;
  end_time: string;
  created_at: string;
  updated_at: string;
}

export type EventInfoResponse = PassuResponse<EventInfoData>;

// Product Count Response (from /user-api/v2/events/{eventId}/count)
export type ProductCountResponse = PassuResponse<number>;

// Random Key Response (from /user-api/v2/events/{eventId}/issue-random-key)
export interface IssueRandomKeyRequest {
  token: string;
}

export interface RandomKeyData {
  random_key: string;
  expire_time: number;
}

export type RandomKeyResponse = PassuResponse<RandomKeyData>;

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
