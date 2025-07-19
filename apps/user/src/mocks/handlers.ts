import { http, HttpResponse } from "msw";
import type {
  IssueRandomKeyResponse,
  IssueRandomKeyPayload,
  EnrollStudentRequest,
  EnrollStudentPayload,
  EnrollStudentResponse,
  ApiErrorResponse,
  EnrolledCountPayload,
  EnrolledCountResponse,
  EnrolledCountErrorResponse,
  EventDetailPayload,
  EventDetailResponse,
  EventDetailErrorResponse,
} from "../model/api";

export const handlers = [
  // 1. 랜덤 키 발급 API
  http.post<
    { eventId: string }, // Params
    undefined, // RequestBody (no explicit body for this API)
    IssueRandomKeyResponse // ResponseBody
  >("*/api/v1/event/:eventId/issue_random_key", ({ params }) => {
    const { eventId } = params; // eventId is now typed as string
    console.log(`Mock: Issuing random key for event ${eventId}`);
    const payload: IssueRandomKeyPayload = {
      random_key: Math.floor(1000 + Math.random() * 9000).toString(),
      expired_at: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutes from now
    };
    const response: IssueRandomKeyResponse = {
      isSuccess: true,
      message: "Random key issued successfully",
      ...payload,
    };
    return HttpResponse.json(response, { status: 200 });
  }),
  // 2. 학생 등록 API
  http.post<
    { eventId: string }, // Params
    EnrollStudentRequest, // RequestBody
    EnrollStudentResponse | ApiErrorResponse // ResponseBody
  >("*/api/v1/event/:eventId/enroll", async ({ request, params }) => {
    const { eventId } = params;
    const { random_key } = await request.json();
    console.log(
      `Mock: Enrolling student for event ${eventId} with key ${random_key}`,
    );

    if (random_key === "invalid") {
      return HttpResponse.json(
        {
          isSuccess: false,
          message: "Invalid random key",
          detail: "Random key not found or expired",
        },
        { status: 400 },
      );
    }

    const payload: EnrollStudentPayload = {
      event_id: eventId,
      student_id: "mock_student_123",
      enrollment_id: "mock_enrollment_abc",
      timestamp: new Date().toISOString(),
    };
    const response: EnrollStudentResponse = {
      isSuccess: true,
      message: "Student enrolled successfully",
      ...payload,
    };
    return HttpResponse.json(response, { status: 201 });
  }),
  // 3. 등록 학생 수 조회 API
  http.get<
    { eventId: string }, // Params
    undefined, // RequestBody
    EnrolledCountResponse | EnrolledCountErrorResponse // ResponseBody
  >("*/api/v1/event/:eventId/enrolled_count", ({ params }) => {
    const { eventId } = params;
    console.log(`Mock: Getting enrolled count for event ${eventId}`);

    if (eventId === "notfound") {
      const errorResponse: EnrolledCountErrorResponse = {
        error: "Event not found",
      };
      return HttpResponse.json(errorResponse, { status: 404 });
    }

    const payload: EnrolledCountPayload = {
      count: 123, // Mock count
    };
    const response: EnrolledCountResponse = {
      isSuccess: true,
      message: "Successfully retrieved enrolled count",
      ...payload,
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

    const payload: EventDetailPayload = {
      event_id: eventId,
      name: `Mock Event ${eventId}`,
      description: `Description for mock event ${eventId}`,
      conditions: {
        major: ["Computer Science"],
        year: ["3", "4"],
        other_criteria: "mock_criteria",
      },
      created_at: "2024-06-15T10:00:00Z",
    };
    const response: EventDetailResponse = {
      isSuccess: true,
      message: "Successfully retrieved event details",
      ...payload,
    };
    return HttpResponse.json(response, { status: 200 });
  }),
];
