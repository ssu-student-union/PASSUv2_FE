import { http, HttpResponse } from "msw";
import type {
  IssueRandomKeyResponse,
  IssueRandomKeyData,
  EnrollStudentRequest,
  EnrollStudentData,
  EnrollStudentResponse,
  ApiErrorResponse,
  EnrolledCountData,
  EnrolledCountResponse,
  EnrolledCountErrorResponse,
  EventDetailData,
  EventDetailResponse,
  EventDetailErrorResponse,
  UserInfoData,
  UserInfoResponse,
  ApiResponse,
} from "@/model/api";

export const handlers = [
  // 1. 랜덤 키 발급 API
  http.post<
    { eventId: string }, // Params
    undefined, // RequestBody (no explicit body for this API)
    ApiResponse<IssueRandomKeyData>
  >("*/api/v1/event/:eventId/issue-key", ({ request, params }) => {
    const { eventId } = params; // eventId is now typed as string
    console.log(`Mock: Issuing random key for event ${eventId}`);

    // Check for Authorization header
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      const errorResponse: ApiErrorResponse = {
        success: false,
        message: "Unauthorized",
        detail: "Access token is required",
      };
      return HttpResponse.json(errorResponse, { status: 401 });
    }
    const data: IssueRandomKeyData = {
      randomKey: Math.floor(1000 + Math.random() * 9000).toString(),
      expiredAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutes from now
    };
    const response: IssueRandomKeyResponse = {
      success: true,
      message: "Random key issued successfully",
      detail: "Key successfully generated",
      data,
    };
    return HttpResponse.json(response, { status: 200 });
  }),
  // 2. 학생 등록 API
  http.post<
    { eventId: string }, // Params
    EnrollStudentRequest, // RequestBody
    ApiResponse<EnrollStudentData>
  >("*/api/v1/event/:eventId/enroll", async ({ request, params }) => {
    const { eventId } = params;
    console.log(`Mock: Enrolling student for event ${eventId}`);

    // Check for Authorization header
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      const errorResponse: ApiErrorResponse = {
        success: false,
        message: "Unauthorized",
        detail: "Access token is required",
      };
      return HttpResponse.json(errorResponse, { status: 401 });
    }

    const { randomKey } = await request.json();
    console.log(`Mock: Using random key ${randomKey}`);

    if (randomKey === "invalid") {
      return HttpResponse.json(
        {
          success: false,
          message: "Invalid random key",
          detail: "Random key not found or expired",
        },
        { status: 400 },
      );
    }

    const data: EnrollStudentData = {
      eventId: Number(eventId),
      studentId: "mock_student_123",
      enrollmentId: 12345,
      timestamp: new Date().toISOString(),
    };
    const response: EnrollStudentResponse = {
      success: true,
      message: "Student enrolled successfully",
      detail: "Enrollment completed successfully",
      data,
    };
    return HttpResponse.json(response, { status: 201 });
  }),
  // 3. 등록 학생 수 조회 API
  http.get<
    { eventId: string }, // Params
    undefined, // RequestBody
    EnrolledCountResponse | EnrolledCountErrorResponse // ResponseBody
  >("*/api/v1/event/:eventId/enrolled-count", ({ params }) => {
    const { eventId } = params;
    console.log(`Mock: Getting enrolled count for event ${eventId}`);

    if (eventId === "notfound") {
      const errorResponse: EnrolledCountErrorResponse = {
        error: "Event not found",
      };
      return HttpResponse.json(errorResponse, { status: 404 });
    }

    const data: EnrolledCountData = {
      count: 123, // Mock count
    };
    const response: EnrolledCountResponse = {
      success: true,
      message: "Successfully retrieved enrolled count",
      detail: "Count retrieved successfully",
      data,
    };
    return HttpResponse.json(response, { status: 200 });
  }),
  // 6. 이벤트 디테일 조회 API
  http.get<
    { eventId: string }, // Params
    undefined, // RequestBody
    EventDetailResponse | EventDetailErrorResponse // ResponseBody
  >("*/api/v1/event/:eventId", ({ params }) => {
    const { eventId } = params;
    console.log(`Mock: Getting event detail for event ${eventId}`);

    // Mock authorization check (assuming it's an admin API based on API-ARCHITECTURE.md)
    // if (request.headers.get("Authorization") !== "Bearer studentcounciltoken") {
    //   const errorResponse: EventDetailErrorResponse = {
    //     error: "Only student council can call this API",
    //   };
    //   return HttpResponse.json(errorResponse, { status: 401 });
    // }

    const data: EventDetailData = {
      eventId: Number(eventId),
      name: `Mock Event ${eventId}`,
      description: `Description for mock event ${eventId}`,
      conditions: {
        major: ["Computer Science"],
        year: ["3", "4"],
        other_criteria: "mock_criteria",
      },
      createdAt: "2024-06-15T10:00:00Z",
    };
    const response: EventDetailResponse = {
      success: true,
      message: "Successfully retrieved event details",
      detail: "Event details retrieved successfully",
      data,
    };
    return HttpResponse.json(response, { status: 200 });
  }),
  // User Info API
  http.get<
    Record<string, never>, // Params
    undefined, // RequestBody
    ApiResponse<UserInfoResponse>
  >("*/api/v1/user", ({ request }) => {
    console.log("Mock: Getting user info");

    // Check for Authorization header
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      const errorResponse: ApiErrorResponse = {
        success: false,
        message: "Unauthorized",
        detail: "Access token is required",
      };
      return HttpResponse.json(errorResponse, { status: 401 });
    }

    // Mock user info response
    const data: UserInfoData = {
      name: "홍길동",
      studentId: "20211234",
      major: "컴퓨터학부",
      isCouncil: false,
    };
    const response: UserInfoResponse = {
      success: true,
      message: "User info retrieved successfully",
      detail: "User information retrieved successfully",
      data,
    };
    return HttpResponse.json(response, { status: 200 });
  }),
];
