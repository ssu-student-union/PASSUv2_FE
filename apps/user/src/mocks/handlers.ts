import { http, HttpResponse } from "msw";
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
    return date.toISOString();
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

export const handlers = [
  // 0. 전체 이벤트 목록 조회 API
  http.get<
    Record<string, never>, // Params
    undefined, // RequestBody
    EventListResponse // ResponseBody
  >("*/user-api/v2/events", () => {
    console.log("Mock: Getting event list");

    const response: EventListResponse = {
      result: true,
      message: "Events retrieved successfully",
      data: createMockEvents(),
    };
    return HttpResponse.json(response, { status: 200 });
  }),

  // 1. 랜덤 키 발급 API
  http.post<
    { eventId: string }, // Params
    undefined, // RequestBody
    RandomKeyResponse | PassuErrorResponse
  >("*/user-api/v2/events/:eventId/issue-random-key", ({ request, params }) => {
    const { eventId } = params;
    console.log(`Mock: Issuing random key for event ${eventId}`);

    // Check for Authorization header
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      const errorResponse: PassuErrorResponse = {
        result: false,
        message: "Invalid token or failed to retrieve user information",
      };
      return HttpResponse.json(errorResponse, { status: 422 });
    }

    const data: RandomKeyData = {
      random_key: Math.floor(1000 + Math.random() * 9000).toString(),
      expire_time: 900, // 15 minutes in seconds
    };
    const response: RandomKeyResponse = {
      result: true,
      message: "Random key issued successfully",
      data,
    };
    return HttpResponse.json(response, { status: 200 });
  }),

  // 3. 등록 학생 수 조회 API
  http.get<
    { eventId: string }, // Params
    undefined, // RequestBody
    ProductCountResponse | PassuErrorResponse // ResponseBody
  >("*/user-api/v2/events/:eventId/count", ({ params }) => {
    const { eventId } = params;
    console.log(`Mock: Getting enrolled count for event ${eventId}`);

    if (eventId === "notfound") {
      const errorResponse: PassuErrorResponse = {
        result: false,
        message: "Event not found",
      };
      return HttpResponse.json(errorResponse, { status: 422 });
    }

    const response: ProductCountResponse = {
      result: true,
      message: "Product count retrieved successfully",
      data: 123, // Mock count
    };
    return HttpResponse.json(response, { status: 200 });
  }),

  // 4. 이벤트 디테일 조회 API
  http.get<
    { eventId: string }, // Params
    undefined, // RequestBody
    EventInfoResponse | PassuErrorResponse // ResponseBody
  >("*/user-api/v2/events/:eventId", ({ params }) => {
    const { eventId } = params;
    console.log(`Mock: Getting event detail for event ${eventId}`);

    if (eventId === "notfound") {
      const errorResponse: PassuErrorResponse = {
        result: false,
        message: "Event not found",
      };
      return HttpResponse.json(errorResponse, { status: 422 });
    }

    const data: EventInfoData = {
      id: Number(eventId),
      name: `Mock Event ${eventId}`,
      description: `Description for mock event ${eventId}`,
      product_name: "축제 티켓",
      product_quantity: 1000,
      product_enrolled_count: 123,
      location: "대강당",
      require_status: EventRequireStatus.ATTENDED,
      require_union_fee: true,
      allow_all_departments: false,
      allowed_departments: ["컴퓨터학부", "글로벌미디어학부", "소프트웨어학부"],
      status: "ONGOING",
      start_time: "2024-01-15 10:00:00",
      end_time: "2024-01-22 18:00:00",
      created_at: "2024-01-01 00:00:00",
      updated_at: "2024-01-01 00:00:00",
    };
    const response: EventInfoResponse = {
      result: true,
      message: "Event retrieved successfully",
      data,
    };
    return HttpResponse.json(response, { status: 200 });
  }),

  // 5. 학생 정보 조회 API
  http.get<
    Record<string, never>, // Params
    undefined, // RequestBody
    StudentInfoResponse | PassuErrorResponse
  >("*/user-api/v2/student-info", ({ request }) => {
    console.log("Mock: Getting student info");

    // Check for Authorization header
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      const errorResponse: PassuErrorResponse = {
        result: false,
        message: "Invalid token or failed to retrieve user information",
      };
      return HttpResponse.json(errorResponse, { status: 422 });
    }

    const data: StudentInfoData = {
      studentId: "20211234",
      name: "홍길동",
      major: "컴퓨터학부",
      status: "1",
      isPaidUnionFee: true,
      isCouncil: false,
    };
    const response: StudentInfoResponse = {
      result: true,
      message: "Student information retrieved successfully",
      data,
    };
    return HttpResponse.json(response, { status: 200 });
  }),
];
