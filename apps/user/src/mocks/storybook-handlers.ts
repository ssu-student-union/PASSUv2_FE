import { http, HttpResponse, delay } from "msw";
import {
  type RandomKeyResponse,
  type RandomKeyData,
  type PassuErrorResponse,
  type ProductCountResponse,
  type EventInfoData,
  type EventInfoResponse,
  type EventListResponse,
  type StudentInfoData,
  type StudentInfoResponse,
  EventRequireStatus,
} from "@/model/api";

// 오늘 날짜 기준의 mock 이벤트 데이터 생성
function createMockEvents(): EventInfoData[] {
  const today = new Date();
  const formatDate = (date: Date) => {
    return date.toISOString().replace("T", " ").slice(0, 19);
  };

  return [
    {
      id: 1,
      name: "2026 신입생 환영회",
      description: "새로운 학기를 맞이하여 신입생 환영회를 개최합니다.",
      product_name: "환영 키트",
      product_quantity: 500,
      product_enrolled_count: 123,
      location: "대강당",
      require_status: EventRequireStatus.ATTENDED,
      require_union_fee: false,
      allow_all_departments: true,
      allowed_departments: [],
      status: "ONGOING",
      start_time: formatDate(today),
      end_time: formatDate(new Date(today.getTime() + 3 * 60 * 60 * 1000)),
      created_at: formatDate(new Date(today.getTime() - 24 * 60 * 60 * 1000)),
      updated_at: formatDate(new Date(today.getTime() - 24 * 60 * 60 * 1000)),
    },
    {
      id: 2,
      name: "IT대학 취업 설명회",
      description: "IT대학 학생들을 위한 취업 설명회입니다.",
      product_name: "간식 세트",
      product_quantity: 200,
      product_enrolled_count: 50,
      location: "정보과학관 301호",
      require_status: EventRequireStatus.ATTENDED,
      require_union_fee: true,
      allow_all_departments: false,
      allowed_departments: ["컴퓨터학부", "소프트웨어학부", "글로벌미디어학부"],
      status: "BEFORE",
      start_time: formatDate(new Date(today.getTime() + 2 * 60 * 60 * 1000)),
      end_time: formatDate(new Date(today.getTime() + 5 * 60 * 60 * 1000)),
      created_at: formatDate(new Date(today.getTime() - 48 * 60 * 60 * 1000)),
      updated_at: formatDate(new Date(today.getTime() - 48 * 60 * 60 * 1000)),
    },
    {
      id: 3,
      name: "동아리 박람회",
      description: "다양한 동아리를 만나보세요!",
      product_name: "기념품",
      product_quantity: 1000,
      product_enrolled_count: 800,
      location: "학생회관 앞",
      require_status: EventRequireStatus.ATTENDED | EventRequireStatus.ON_LEAVE,
      require_union_fee: false,
      allow_all_departments: true,
      allowed_departments: [],
      status: "AFTER",
      start_time: formatDate(new Date(today.getTime() - 5 * 60 * 60 * 1000)),
      end_time: formatDate(new Date(today.getTime() - 2 * 60 * 60 * 1000)),
      created_at: formatDate(new Date(today.getTime() - 72 * 60 * 60 * 1000)),
      updated_at: formatDate(new Date(today.getTime() - 72 * 60 * 60 * 1000)),
    },
  ];
}

// 단일 이벤트 mock 데이터
function createMockEvent(eventId: string): EventInfoData {
  const today = new Date();
  const formatDate = (date: Date) => {
    return date.toISOString().replace("T", " ").slice(0, 19);
  };

  return {
    id: Number(eventId),
    name: "2026 신입생 환영회",
    description:
      "새로운 학기를 맞이하여 신입생 환영회를 개최합니다. 다양한 이벤트와 선물이 준비되어 있으니 많은 참여 부탁드립니다!",
    product_name: "환영 키트",
    product_quantity: 500,
    product_enrolled_count: 123,
    location: "대강당",
    require_status: EventRequireStatus.ATTENDED,
    require_union_fee: true,
    allow_all_departments: false,
    allowed_departments: ["컴퓨터학부", "소프트웨어학부", "글로벌미디어학부"],
    status: "ONGOING",
    start_time: formatDate(today),
    end_time: formatDate(new Date(today.getTime() + 3 * 60 * 60 * 1000)),
    created_at: formatDate(new Date(today.getTime() - 24 * 60 * 60 * 1000)),
    updated_at: formatDate(new Date(today.getTime() - 24 * 60 * 60 * 1000)),
  };
}

// 사용자 정보 mock 데이터
const mockStudentInfo: StudentInfoData = {
  studentId: "20211234",
  name: "홍길동",
  major: "컴퓨터학부",
  status: "1",
  isPaidUnionFee: true,
  isCouncil: false,
};

// ============================================
// 성공 시나리오 핸들러
// ============================================

export const eventListSuccessHandler = http.get<
  Record<string, never>,
  undefined,
  EventListResponse
>("*/user-api/v2/events", async () => {
  await delay(300);
  const response: EventListResponse = {
    result: true,
    message: "Events retrieved successfully",
    data: createMockEvents(),
  };
  return HttpResponse.json(response, { status: 200 });
});

export const eventDetailSuccessHandler = http.get<
  { eventId: string },
  undefined,
  EventInfoResponse
>("*/user-api/v2/events/:eventId", async ({ params }) => {
  await delay(300);
  const response: EventInfoResponse = {
    result: true,
    message: "Event retrieved successfully",
    data: createMockEvent(params.eventId),
  };
  return HttpResponse.json(response, { status: 200 });
});

export const enrolledCountSuccessHandler = http.get<
  { eventId: string },
  undefined,
  ProductCountResponse
>("*/user-api/v2/events/:eventId/count", async () => {
  await delay(200);
  const response: ProductCountResponse = {
    result: true,
    message: "Product count retrieved successfully",
    data: 123,
  };
  return HttpResponse.json(response, { status: 200 });
});

export const studentInfoSuccessHandler = http.get<
  Record<string, never>,
  undefined,
  StudentInfoResponse
>("*/user-api/v2/student-info", async () => {
  await delay(200);
  const response: StudentInfoResponse = {
    result: true,
    message: "Student information retrieved successfully",
    data: mockStudentInfo,
  };
  return HttpResponse.json(response, { status: 200 });
});

export const randomKeySuccessHandler = http.post<
  { eventId: string },
  undefined,
  RandomKeyResponse
>("*/user-api/v2/events/:eventId/issue-random-key", async () => {
  await delay(500);
  const data: RandomKeyData = {
    random_key: Math.floor(1000 + Math.random() * 9000).toString(),
    expire_time: 900,
  };
  const response: RandomKeyResponse = {
    result: true,
    message: "Random key issued successfully",
    data,
  };
  return HttpResponse.json(response, { status: 200 });
});

// ============================================
// 실패 시나리오 핸들러
// ============================================

export const eventListErrorHandler = http.get(
  "*/user-api/v2/events",
  async () => {
    await delay(300);
    const errorResponse: PassuErrorResponse = {
      result: false,
      message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
    return HttpResponse.json(errorResponse, { status: 500 });
  },
);

export const eventDetailErrorHandler = http.get(
  "*/user-api/v2/events/:eventId",
  async () => {
    await delay(300);
    const errorResponse: PassuErrorResponse = {
      result: false,
      message: "이벤트를 찾을 수 없습니다.",
    };
    return HttpResponse.json(errorResponse, { status: 404 });
  },
);

export const studentInfoUnauthorizedHandler = http.get(
  "*/user-api/v2/student-info",
  async () => {
    await delay(200);
    const errorResponse: PassuErrorResponse = {
      result: false,
      message: "로그인이 필요합니다.",
    };
    return HttpResponse.json(errorResponse, { status: 401 });
  },
);

export const randomKeyErrorHandler = http.post(
  "*/user-api/v2/events/:eventId/issue-random-key",
  async () => {
    await delay(500);
    const errorResponse: PassuErrorResponse = {
      result: false,
      message: "랜덤 키 발급에 실패했습니다. 다시 시도해주세요.",
    };
    return HttpResponse.json(errorResponse, { status: 500 });
  },
);

// ============================================
// 핸들러 그룹
// ============================================

// 모든 성공 핸들러
export const successHandlers = [
  eventListSuccessHandler,
  eventDetailSuccessHandler,
  enrolledCountSuccessHandler,
  studentInfoSuccessHandler,
  randomKeySuccessHandler,
];

// 모든 실패 핸들러
export const errorHandlers = [
  eventListErrorHandler,
  eventDetailErrorHandler,
  studentInfoUnauthorizedHandler,
  randomKeyErrorHandler,
];

// 빈 이벤트 목록 핸들러
export const emptyEventListHandler = http.get<
  Record<string, never>,
  undefined,
  EventListResponse
>("*/user-api/v2/events", async () => {
  await delay(300);
  const response: EventListResponse = {
    result: true,
    message: "Events retrieved successfully",
    data: [],
  };
  return HttpResponse.json(response, { status: 200 });
});

// 로그인하지 않은 사용자 핸들러 (student-info만 실패)
export const notLoggedInStudentInfoHandler = http.get(
  "*/user-api/v2/student-info",
  async () => {
    await delay(200);
    const errorResponse: PassuErrorResponse = {
      result: false,
      message: "Invalid token or failed to retrieve user information",
    };
    return HttpResponse.json(errorResponse, { status: 422 });
  },
);
