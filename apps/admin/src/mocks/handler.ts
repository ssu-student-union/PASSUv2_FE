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

export const mockEvent: EventData = {
  id: 1,
  name: "2025-1학기 야식 행사",
  location: "슈파크 일대 (돌계단)",
  productName: "지코바 순살 양념구이(순한맛) + 밥 + 무알콜 맥주 음료",
  productQuantity: 600,
  description: `[2025-1학기 야식 행사 안내]

안녕하세요. 우리의 숭실에 확신을
제65대 총학생회 S:SURE입니다.

중간고사 기간을 맞이하여 학업으로 지친 학우분들을 위해 야식 행사를 준비하였습니다.
자세한 내용은 하단의 내용을 참고 부탁드립니다.

<행사 안내>
✅일시: 4/30(수), 5/1(목) 18:00 ~ 준비 수량 소진 시까지
✅장소: 슈파크 일대 (돌계단)
✅대상: 2025-1학기 재학생 600명 (일일 선착순 300명)
✅메뉴: 지코바 순살 양념구이(순한맛) + 밥 + 무알콜 맥주 음료

<유의 사항>
⛔번호표 배부는 17시부터 시작합니다. (줄 맡아두기 및 이탈 불가)
⛔1일 차 참여 시, 2일 차 중복 참여가 불가합니다.
⛔행사 당일 PASSU를 통해 재학 여부 확인 예정입니다.

시험기간을 보내고 계신 모든 학우 여러분의 노력이 빛나길 바라며,
확신으로 가득 찬 응원을 전합니다.

제65대 총학생회 S:SURE는 앞으로도 학우 여러분의 만족도 높은
학교생활을 위해 노력하겠습니다. 감사합니다.

-
문의
총학생회 S:SURE 복지국
인스타그램 @ssure65th
카카오톡 ‘숭실대학교 총학생회’
이메일 ssure65welfare@gmail.com`,
  status: "BEFORE",
  requireStatus: [1], // 재학생
  requireUnionFee: true,
  startTime: "2025-04-30T18:00:00+09:00",
  endTime: "2025-05-01T21:00:00+09:00",
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
