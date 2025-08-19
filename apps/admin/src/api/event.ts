import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import type {
  EnrolledCountResponse,
  EnrollmentListResponse,
  EnrollmentResponse,
  EventRequest,
  EventResponse,
  PageEventResponse,
} from "@/types/event.api";
import type { ApiResponse } from "@/types/api-response";
import apiClient from "@/api/apiClient";

// 1. 행사 목록 조회 API
export const useEventList = (
  status: string,
  page = 0,
  size = 10,
  options?: Partial<UseQueryOptions<ApiResponse<PageEventResponse>, Error>>,
) => {
  return useQuery({
    queryKey: ["eventList", status, page, size],
    queryFn: async (): Promise<ApiResponse<PageEventResponse>> => {
      const response = await apiClient.get("/api/v1/event", {
        searchParams: {
          status,
          page: page.toString(),
          size: size.toString(),
        },
      });
      return response.json();
    },
    ...options,
  });
};

// 2. 행사 생성 API
export const useCreateEvent = (
  options?: Partial<
    UseMutationOptions<ApiResponse<EventResponse>, Error, EventRequest>
  >,
) => {
  return useMutation({
    mutationFn: async (
      data: EventRequest,
    ): Promise<ApiResponse<EventResponse>> => {
      const response = await apiClient.post("/api/v1/event", {
        json: data,
      });
      return response.json();
    },
    ...options,
  });
};

// 3. 행사 디테일 조회 API
export const useEventDetail = (
  id: number,
  options?: Partial<UseQueryOptions<ApiResponse<EventResponse>, Error>>,
) => {
  return useQuery({
    queryKey: ["eventDetail", id],
    queryFn: async (): Promise<ApiResponse<EventResponse>> => {
      const response = await apiClient.get(`/api/v1/event/${id}`);
      return response.json();
    },
    enabled: !!id,
    ...options,
  });
};

// 4. 행사 수정 API
export const useUpdateEvent = (
  options?: Partial<
    UseMutationOptions<
      ApiResponse<EventResponse>,
      Error,
      { id: number; data: EventRequest }
    >
  >,
) => {
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: EventRequest;
    }): Promise<ApiResponse<EventResponse>> => {
      const response = await apiClient.put(`/api/v1/event/${id}`, {
        json: data,
      });
      return response.json();
    },
    ...options,
  });
};

// 5. 행사 삭제 API
export const useDeleteEvent = (
  options?: Partial<UseMutationOptions<void, Error, number>>,
) => {
  return useMutation({
    mutationFn: async (id: number): Promise<void> => {
      await apiClient.delete(`/api/v1/event/${id}`);
    },
    ...options,
  });
};

// 6. 행사 시작 API
export const useStartEvent = (
  options?: Partial<
    UseMutationOptions<ApiResponse<EventResponse>, Error, number>
  >,
) => {
  return useMutation({
    mutationFn: async (id: number): Promise<ApiResponse<EventResponse>> => {
      const response = await apiClient.patch(`/api/v1/event/${id}/start`);
      return response.json();
    },
    ...options,
  });
};

// 7. 행사 멈춤 API
export const usePauseEvent = (
  options?: Partial<
    UseMutationOptions<ApiResponse<EventResponse>, Error, number>
  >,
) => {
  return useMutation({
    mutationFn: async (id: number): Promise<ApiResponse<EventResponse>> => {
      const response = await apiClient.patch(`/api/v1/event/${id}/pause`);
      return response.json();
    },
    ...options,
  });
};

// 8. 행사 종료 API
export const useEndEvent = (
  options?: Partial<
    UseMutationOptions<ApiResponse<EventResponse>, Error, number>
  >,
) => {
  return useMutation({
    mutationFn: async (id: number): Promise<ApiResponse<EventResponse>> => {
      const response = await apiClient.patch(`/api/v1/event/${id}/end`);
      return response.json();
    },
    ...options,
  });
};

// 9. 학생 등록 API
export const useEnrollStudent = (
  options?: Partial<
    UseMutationOptions<
      ApiResponse<EnrollmentResponse>,
      Error,
      {
        eventId: number;
        randomKey: string;
      }
    >
  >,
) => {
  return useMutation({
    mutationFn: async ({
      eventId,
      randomKey,
    }: {
      eventId: number;
      randomKey: string;
    }): Promise<ApiResponse<EnrollmentResponse>> => {
      const response = await apiClient.post(`/api/v1/event/${eventId}/enroll`, {
        json: { randomKey },
      });
      return response.json();
    },
    ...options,
  });
};

// 10. 등록된 학생 수 조회 API
export const useEnrolledCount = (
  eventId: number,
  options?: Partial<UseQueryOptions<ApiResponse<EnrolledCountResponse>, Error>>,
) => {
  return useQuery({
    queryKey: ["enrolledCount", eventId],
    queryFn: async (): Promise<ApiResponse<EnrolledCountResponse>> => {
      const response = await apiClient.get(
        `/api/v1/event/${eventId}/enrolled-count`,
      );
      return response.json();
    },
    enabled: !!eventId,
    ...options,
  });
};

// 11. 등록된 학생 목록 조회
export const useEnrollmentList = (
  eventId: number,
  options?: Partial<
    UseQueryOptions<ApiResponse<EnrollmentListResponse[]>, Error>
  >,
) => {
  return useQuery({
    queryKey: ["enrollmentList", eventId],
    queryFn: async (): Promise<ApiResponse<EnrollmentListResponse[]>> => {
      const response = await apiClient.get(
        `/api/v1/event/${eventId}/enrollments`,
      );
      return response.json();
    },
    enabled: !!eventId,
    ...options,
  });
};
