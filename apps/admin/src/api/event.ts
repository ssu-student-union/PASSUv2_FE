import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import type {
  InfiniteData,
  UseInfiniteQueryResult,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import type {
  EnrolledCountData,
  EnrollmentListData,
  EnrollmentData,
  EventRequest,
  EventData,
  PageEventResponse,
  UserInfoData,
  FinishedEventListData,
} from "@/types/event.api";
import type { ApiResponse } from "@/types/api-response";
import apiClient from "@/api/apiClient";
import ky from "ky";

// 1. 행사 목록 조회 API
export const useInfiniteEventList = (
  status: string,
  size = 10,
): UseInfiniteQueryResult<InfiniteData<ApiResponse<PageEventResponse>>> =>
  useInfiniteQuery<ApiResponse<PageEventResponse>, Error>({
    queryKey: ["eventList", status, size],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await apiClient.get("api/v1/event", {
        searchParams: {
          status,
          page: pageParam as number,
          size,
        },
      });
      return response.json();
    },
    getNextPageParam: (lastPage) =>
      lastPage.data.last ? undefined : lastPage.data.number + 1,
    initialPageParam: 0,
  });

// 2. 행사 생성 API
export const useCreateEvent = (
  options?: Partial<UseMutationOptions<EventData, Error, EventRequest>>,
) =>
  useMutation({
    mutationFn: async (data: EventRequest): Promise<EventData> => {
      const response = await apiClient.post("api/v1/event", { json: data });
      return response.json();
    },
    ...options,
  });

// 3. 행사 디테일 조회 API
export const useEventDetail = (
  id: number,
  options?: Partial<UseQueryOptions<EventData, Error>>,
) =>
  useQuery({
    queryKey: ["eventDetail", id],
    queryFn: async (): Promise<EventData> => {
      const response = await apiClient.get(`api/v1/event/${id}`);
      return response.json();
    },
    enabled: !!id,
    ...options,
  });

// 4. 행사 수정 API
export const useUpdateEvent = (
  options?: Partial<
    UseMutationOptions<EventData, Error, { id: number; data: EventRequest }>
  >,
) =>
  useMutation({
    mutationFn: async ({ id, data }): Promise<EventData> => {
      const response = await apiClient.put(`api/v1/event/${id}`, {
        json: data,
      });
      return response.json();
    },
    ...options,
  });

// 5. 행사 삭제 API
export const useDeleteEvent = (
  options?: Partial<UseMutationOptions<void, Error, number>>,
) =>
  useMutation({
    mutationFn: async (id: number): Promise<void> => {
      await apiClient.delete(`api/v1/event/${id}`);
    },
    ...options,
  });

// 6. 행사 시작
export const useStartEvent = (
  options?: Partial<UseMutationOptions<EventData, Error, number>>,
) =>
  useMutation({
    mutationFn: async (id: number): Promise<EventData> => {
      const response = await apiClient.patch(`api/v1/event/${id}/start`);
      return response.json();
    },
    ...options,
  });

// 7. 행사 멈춤
export const usePauseEvent = (
  options?: Partial<UseMutationOptions<EventData, Error, number>>,
) =>
  useMutation({
    mutationFn: async (id: number): Promise<EventData> => {
      const response = await apiClient.patch(`api/v1/event/${id}/pause`);
      return response.json();
    },
    ...options,
  });

// 8. 행사 종료
export const useEndEvent = (
  options?: Partial<UseMutationOptions<EventData, Error, number>>,
) =>
  useMutation({
    mutationFn: async (id: number): Promise<EventData> => {
      const response = await apiClient.patch(`api/v1/event/${id}/end`);
      return response.json();
    },
    ...options,
  });

// 9. 학생 등록 API
export const useEnrollStudent = (
  options?: Partial<
    UseMutationOptions<
      ApiResponse<EnrollmentData>,
      Error,
      { eventId: number; randomKey: string }
    >
  >,
) =>
  useMutation({
    mutationFn: async ({
      eventId,
      randomKey,
    }): Promise<ApiResponse<EnrollmentData>> => {
      const response = await apiClient.post(`api/v1/event/${eventId}/enroll`, {
        json: { randomKey },
      });
      return response.json();
    },
    ...options,
  });

// 10. 등록된 학생 수 조회 API
export const useEnrolledCount = (
  eventId: number,
  options?: Partial<UseQueryOptions<ApiResponse<EnrolledCountData>, Error>>,
) =>
  useQuery({
    queryKey: ["enrolledCount", eventId],
    queryFn: async (): Promise<ApiResponse<EnrolledCountData>> => {
      const response = await apiClient.get(
        `api/v1/event/${eventId}/enrolled-count`,
      );
      return response.json();
    },
    enabled: !!eventId,
    ...options,
  });

// 11. 등록된 학생 목록 조회
export const useEnrollmentList = (
  eventId: number,
  options?: Partial<UseQueryOptions<ApiResponse<EnrollmentListData[]>, Error>>,
) =>
  useQuery({
    queryKey: ["enrollmentList", eventId],
    queryFn: async (): Promise<ApiResponse<EnrollmentListData[]>> => {
      const response = await apiClient.get(
        `api/v1/event/${eventId}/enrollments`,
      );
      return response.json();
    },
    enabled: !!eventId,
    ...options,
  });

// 12. 계정 정보 조회
export const useUserInfo = (
  options?: Partial<UseQueryOptions<UserInfoData>>,
) => {
  const accessToken = localStorage.getItem("accessToken");
  return useQuery({
    queryKey: ["userInfo", accessToken],
    queryFn: async (): Promise<UserInfoData> => {
      const response = await ky.get(
        `${import.meta.env.VITE_ACCOUNT_API_URL}/users/user-info`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return response.json();
    },
    enabled: !!accessToken,
    ...options,
  });
};

// 13. 학부별 종료된 행사 목록 조회
export const useFinishedEventList = (
  options?: Partial<UseQueryOptions<ApiResponse<FinishedEventListData>, Error>>,
) =>
  useQuery({
    queryKey: ["finishedEventList"],
    queryFn: async (): Promise<ApiResponse<FinishedEventListData>> => {
      const response = await apiClient.get("api/v1/event/grouped-by-creator");
      return response.json();
    },
    ...options,
  });
