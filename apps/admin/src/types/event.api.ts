import type { EventStatus } from "@/types/event";

export interface EventRequest {
  name: string;
  location: string;
  productName: string;
  description: string;
  productQuantity: number;
  requireStatus: number[];
  requireUnionFee: boolean;
  startTime: string;
  endTime: string;
}

export interface EventData {
  id: number;
  name: string;
  location: string;
  productName: string;
  productQuantity: number;
  description: string;
  status: EventStatus;
  requireStatus: number[];
  requireUnionFee: boolean;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  allowAllDepartments?: boolean;
}

export interface PageEventResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  content: EventData[];
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface EnrollmentRequest {
  randomKey: string;
}

export interface EnrollmentData {
  eventId: number;
  studentId: string;
  studentName: string;
  enrollmentId: number;
  timestamp: string;
}

export interface EnrolledCountData {
  count: number;
}

export interface EnrollmentListData {
  enrollmentId: number;
  studentId: string;
  studentName: string;
  studentDepartment: string;
  randomKey: number;
  timestamp: string;
  status: string;
}

export interface UserInfoData {
  code: string;
  message: string;
  data: {
    name: string;
    studentId: string;
    major: string;
    isCouncil: boolean;
    status: number;
    isPaidUnionFee: boolean;
  };
  isSuccess: boolean;
}

// 학부별 행사 종료 이벤트 목록
export interface FinishedEventSection {
  organizationName: string;
  events: EventData[];
  eventCount: number;
}

export interface FinishedEventListData {
  sections: FinishedEventSection[];
}
