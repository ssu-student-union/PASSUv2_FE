import { http, HttpResponse } from "msw";
import type {
  EventRequest,
  EventData,
  PageEventResponse,
  EnrollmentRequest,
  EnrollmentData,
  EnrolledCountData,
  EnrollmentListData,
} from "@/types/event.api";
import type { ApiResponse } from "@/types/api-response";

const mockEvent: EventData = {
  id: 1,
  name: "총학 이벤트",
  location: "학생회관",
  productName: "텀블러",
  productQuantity: 100,
  description: "환경을 위한 텀블러 나눔 행사입니다.",
  status: "BEFORE",
  requireStatus: 1,
  requireUnionFee: true,
  startTime: "2025-08-20T10:00:00Z",
  endTime: "2025-08-20T14:00:00Z",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const wrap = <T>(data: T): ApiResponse<T> => ({
  success: true,
  message: "요청이 성공했습니다.",
  detail: "",
  data,
});

const isUnauthorized = (request: Request) => {
  const authHeader = request.headers.get("Authorization");
  return !authHeader?.startsWith("Bearer ");
};

export const eventHandlers = [
  // 행사 목록 조회
  http.get("*/api/v1/event", ({ request }) => {
    if (isUnauthorized(request)) {
      return HttpResponse.json(
        {
          success: false,
          message: "Unauthorized",
          detail: "Access token is required",
        },
        { status: 401 },
      );
    }

    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") ?? "0");
    const size = Number(url.searchParams.get("size") ?? "10");

    const response: PageEventResponse = {
      totalElements: 1,
      totalPages: 1,
      size,
      number: page,
      content: [mockEvent],
      first: true,
      last: true,
      empty: false,
    };

    return HttpResponse.json(wrap(response));
  }),

  //행사 디테일
  http.get("*/api/v1/event/:eventId", ({ request, params }) => {
    if (isUnauthorized(request)) {
      return HttpResponse.json(
        {
          success: false,
          message: "Unauthorized",
          detail: "Access token is required",
        },
        { status: 401 },
      );
    }

    const data: EventData = {
      ...mockEvent,
      id: Number(params.eventId),
    };
    return HttpResponse.json(data);
  }),

  // 행사 생성
  http.post("*/api/v1/event", async ({ request }) => {
    if (isUnauthorized(request)) {
      return HttpResponse.json(
        {
          success: false,
          message: "Unauthorized",
          detail: "Access token is required",
        },
        { status: 401 },
      );
    }

    const body: EventRequest = (await request.json()) as EventRequest;
    const data: EventData = {
      ...body,
      id: 999,
      status: "BEFORE",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return HttpResponse.json(data, { status: 201 });
  }),

  // 행사 수정
  http.put("*/api/v1/event/:eventId", async ({ request, params }) => {
    if (isUnauthorized(request)) {
      return HttpResponse.json(
        {
          success: false,
          message: "Unauthorized",
          detail: "Access token is required",
        },
        { status: 401 },
      );
    }

    const body: EventRequest = (await request.json()) as EventRequest;
    const data: EventData = {
      ...body,
      id: Number(params.eventId),
      status: "BEFORE",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return HttpResponse.json(data);
  }),

  // 행사 삭제
  http.delete("*/api/v1/event/:eventId", ({ request }) => {
    if (isUnauthorized(request)) {
      return HttpResponse.json(
        {
          success: false,
          message: "Unauthorized",
          detail: "Access token is required",
        },
        { status: 401 },
      );
    }

    return HttpResponse.json(wrap(null), { status: 204 });
  }),

  // 행사 시작
  http.patch("*/api/v1/event/:eventId/start", ({ request, params }) => {
    if (isUnauthorized(request)) {
      return HttpResponse.json(
        {
          success: false,
          message: "Unauthorized",
          detail: "Access token is required",
        },
        { status: 401 },
      );
    }

    const data = {
      ...mockEvent,
      id: Number(params.eventId),
      status: "ONGOING",
    };
    return HttpResponse.json(data);
  }),

  // 행사 멈춤
  http.patch("*/api/v1/event/:eventId/pause", ({ request, params }) => {
    if (isUnauthorized(request)) {
      return HttpResponse.json(
        {
          success: false,
          message: "Unauthorized",
          detail: "Access token is required",
        },
        { status: 401 },
      );
    }

    const data = { ...mockEvent, id: Number(params.eventId), status: "PAUSE" };
    return HttpResponse.json(data);
  }),

  // 행사 종료
  http.patch("*/api/v1/event/:eventId/end", ({ request, params }) => {
    if (isUnauthorized(request)) {
      return HttpResponse.json(
        {
          success: false,
          message: "Unauthorized",
          detail: "Access token is required",
        },
        { status: 401 },
      );
    }

    const data = { ...mockEvent, id: Number(params.eventId), status: "AFTER" };
    return HttpResponse.json(data);
  }),

  // 학생 등록
  http.post("*/api/v1/event/:eventId/enroll", async ({ request, params }) => {
    if (isUnauthorized(request)) {
      return HttpResponse.json(
        {
          success: false,
          message: "Unauthorized",
          detail: "Access token is required",
        },
        { status: 401 },
      );
    }

    (await request.json()) as EnrollmentRequest;
    const data: EnrollmentData = {
      eventId: Number(params.eventId),
      studentId: "20231234",
      enrollmentId: 1001,
      timestamp: new Date().toISOString(),
    };
    return HttpResponse.json(wrap(data), { status: 201 });
  }),

  // 등록된 학생 수 조회
  http.get("*/api/v1/event/:eventId/enrolled-count", ({ request }) => {
    if (isUnauthorized(request)) {
      return HttpResponse.json(
        {
          success: false,
          message: "Unauthorized",
          detail: "Access token is required",
        },
        { status: 401 },
      );
    }

    const data: EnrolledCountData = { count: 42 };
    return HttpResponse.json(wrap(data));
  }),

  // 등록된 학생 목록 조회
  http.get("*/api/v1/event/:eventId/enrollments", ({ request }) => {
    if (isUnauthorized(request)) {
      return HttpResponse.json(
        {
          success: false,
          message: "Unauthorized",
          detail: "Access token is required",
        },
        { status: 401 },
      );
    }

    const data: EnrollmentListData[] = [
      {
        enrollmentId: 1001,
        studentId: "20231234",
        studentName: "홍길동",
        studentDepartment: "컴퓨터공학부",
        randomKey: 1234,
        timestamp: new Date().toISOString(),
        status: "APPROVED",
      },
      {
        enrollmentId: 1002,
        studentId: "20241235",
        studentName: "김영희",
        studentDepartment: "경영학부",
        randomKey: 5678,
        timestamp: new Date().toISOString(),
        status: "PENDING",
      },
    ];
    return HttpResponse.json(wrap(data));
  }),
];
