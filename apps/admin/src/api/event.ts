import apiClient from "@/api/apiClient";
import type { ApiResponse } from "@/types/api-response";
import type {
  EnrolledCountResponseDto,
  EnrollmentResponseDto,
  EventRequestDto,
  EventResponseDto,
  PageEventResponseDto,
} from "@/types/event.api";
import { useMutation, useQuery } from "@tanstack/react-query";

// 행사 목록
export const useEventList = (status: string, page = 0, size = 10) => {
  return useQuery({
    queryKey: ["eventList", status, page, size],
    queryFn: () =>
      apiClient
        .get<ApiResponse<PageEventResponseDto>>(`/api/v1/event`, {
          params: { status, page, size },
        })
        .then((res) => res.data),
  });
};

// 행사 생성
export const useCreateEvent = () => {
  return useMutation({
    mutationFn: (data: EventRequestDto) =>
      apiClient
        .post<ApiResponse<EventResponseDto>>("/api/v1/event", data)
        .then((res) => res.data),
  });
};

// 행사 디테일 조회
export const useEventDetail = (id: number) => {
  return useQuery({
    queryKey: ["eventDetail", id],
    queryFn: () =>
      apiClient
        .get<ApiResponse<EventResponseDto>>(`/api/v1/event/${id}`)
        .then((res) => res.data),
    enabled: !!id,
  });
};

// 행사 수정
export const useUpdateEvent = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: EventRequestDto }) =>
      apiClient
        .put<ApiResponse<EventResponseDto>>(`/api/v1/event/${id}`, data)
        .then((res) => res.data),
  });
};

// 행사 삭제
export const useDeleteEvent = () => {
  return useMutation({
    mutationFn: (id: number) => apiClient.delete(`/api/v1/event/${id}`),
  });
};

// 행사 시작
export const useStartEvent = () => {
  return useMutation({
    mutationFn: (id: number) =>
      apiClient
        .patch<ApiResponse<EventResponseDto>>(`/api/v1/event/${id}/start`)
        .then((res) => res.data),
  });
};

// 행사 멈춤
export const usePauseEvent = () => {
  return useMutation({
    mutationFn: (id: number) =>
      apiClient
        .patch<ApiResponse<EventResponseDto>>(`/api/v1/event/${id}/pause`)
        .then((res) => res.data),
  });
};

// 행사 종료
export const useEndEvent = () => {
  return useMutation({
    mutationFn: (id: number) =>
      apiClient
        .patch<ApiResponse<EventResponseDto>>(`/api/v1/event/${id}/end`)
        .then((res) => res.data),
  });
};

// 학생 등록
export const useEnrollStudent = () => {
  return useMutation({
    mutationFn: ({
      eventId,
      randomKey,
    }: {
      eventId: number;
      randomKey: string;
    }) =>
      apiClient
        .post<
          ApiResponse<EnrollmentResponseDto>
        >(`/api/v1/event/${eventId}/enroll`, { randomKey })
        .then((res) => res.data),
  });
};

// 등록된 학생 수 조회
export const useEnrolledCount = (eventId: number) => {
  return useQuery({
    queryKey: ["enrolledCount", eventId],
    queryFn: () =>
      apiClient
        .get<
          ApiResponse<EnrolledCountResponseDto>
        >(`/api/v1/event/${eventId}/enrolled-count`)
        .then((res) => res.data),
    enabled: !!eventId,
  });
};
