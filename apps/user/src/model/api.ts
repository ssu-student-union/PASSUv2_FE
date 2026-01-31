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

// Event Status Enum
export type EventStatus = "BEFORE" | "ONGOING" | "PAUSE" | "AFTER";

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
  allow_all_departments: boolean;
  allowed_departments: string[];
  status: EventStatus;
  start_time: string;
  end_time: string;
  created_at: string;
  updated_at: string;
}

export type EventInfoResponse = PassuResponse<EventInfoData>;

// Event List Response (from /user-api/v2/events)
export type EventListResponse = PassuResponse<EventInfoData[]>;

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

// Is Enrolled Response (from /user-api/v2/events/{event_id}/enrolled)
export type IsEnrolledResponse = PassuResponse<boolean>;
