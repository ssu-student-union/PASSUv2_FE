import { http, HttpResponse } from "msw";
import {
  type RandomKeyResponse,
  type RandomKeyData,
  type EnrollStudentRequest,
  type EnrollmentData,
  type EnrollmentResponse,
  type PassuErrorResponse,
  type ProductCountResponse,
  type EventInfoData,
  type EventInfoResponse,
  type StudentInfoData,
  type StudentInfoResponse,
  EventRequireStatus,
} from "@/model/api";

export const handlers = [
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

  // 2. 학생 등록 API
  http.post<
    { eventId: string }, // Params
    EnrollStudentRequest, // RequestBody
    EnrollmentResponse | PassuErrorResponse
  >("*/api/v1/event/:eventId/enroll", async ({ request, params }) => {
    const { eventId } = params;
    console.log(`Mock: Enrolling student for event ${eventId}`);

    // Check for Authorization header
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      const errorResponse: PassuErrorResponse = {
        result: false,
        message: "Unauthorized",
      };
      return HttpResponse.json(errorResponse, { status: 401 });
    }

    const { randomKey } = await request.json();
    console.log(`Mock: Using random key ${randomKey}`);

    if (randomKey === "invalid") {
      const errorResponse: PassuErrorResponse = {
        result: false,
        message: "Invalid random key",
      };
      return HttpResponse.json(errorResponse, { status: 400 });
    }

    const data: EnrollmentData = {
      eventId: Number(eventId),
      studentId: "20211234",
      studentName: "홍길동",
      enrollmentId: 12345,
      timestamp: new Date().toISOString(),
    };
    const response: EnrollmentResponse = {
      success: true,
      message: "Student enrolled successfully",
      detail: "Enrollment completed successfully",
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
