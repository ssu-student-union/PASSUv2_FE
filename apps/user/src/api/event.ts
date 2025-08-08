import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { HTTPError } from "ky";
import { authenticatedApiClient, apiClient } from "./client";
import type {
  IssueRandomKeyResponse,
  EnrollStudentRequest,
  EnrollStudentResponse,
  EnrolledCountResponse,
  EnrolledCountErrorResponse,
  EventDetailResponse,
  EventDetailErrorResponse,
  UserInfoResponse,
} from "@/model/api";

// 1. 랜덤 키 발급 API
export const useIssueRandomKey = (
  options?: Partial<UseMutationOptions<IssueRandomKeyResponse, Error, string>>,
) => {
  return useMutation({
    mutationFn: async (eventId: string): Promise<IssueRandomKeyResponse> => {
      const response = await authenticatedApiClient.post(
        `/api/v1/event/${eventId}/issue-key`,
      );
      return response.json();
    },
    ...options,
  });
};

// 2. 학생 등록 API
export const useEnrollStudent = (
  options?: Partial<
    UseMutationOptions<
      EnrollStudentResponse,
      Error,
      {
        eventId: string;
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
      eventId: string;
      randomKey: string;
    }): Promise<EnrollStudentResponse> => {
      const requestBody: EnrollStudentRequest = {
        randomKey: randomKey,
      };
      const response = await authenticatedApiClient.post(
        `/api/v1/event/${eventId}/enroll`,
        {
          json: requestBody,
        },
      );
      return response.json();
    },
    ...options,
  });
};

// 3. 등록 학생 수 조회 API
export const useEnrolledCount = (
  eventId: string,
  options?: Partial<UseQueryOptions<EnrolledCountResponse, Error>>,
) => {
  return useQuery({
    queryKey: ["enrolledCount", eventId],
    queryFn: async (): Promise<EnrolledCountResponse> => {
      try {
        const response = await apiClient.get(
          `/api/v1/event/${eventId}/enrolled-count`,
        );
        return response.json();
      } catch (error) {
        // 404 에러 처리
        if (error instanceof HTTPError && error.response.status === 404) {
          const errorResponse: EnrolledCountErrorResponse =
            await error.response.json();
          throw new Error(errorResponse.error);
        }
        throw error;
      }
    },
    enabled: !!eventId,
    ...options,
  });
};

// 4. 이벤트 디테일 조회 API
export const useEventDetail = (
  eventId: string,
  options?: Partial<UseQueryOptions<EventDetailResponse, Error>>,
) => {
  return useQuery({
    queryKey: ["eventDetail", eventId],
    queryFn: async (): Promise<EventDetailResponse> => {
      try {
        const response = await apiClient.get(`/api/v1/event/${eventId}`);
        return response.json();
      } catch (error) {
        // 에러 처리
        if (error instanceof HTTPError && error.response.status === 401) {
          const errorResponse: EventDetailErrorResponse =
            await error.response.json();
          throw new Error(errorResponse.error);
        }
        throw error;
      }
    },
    enabled: !!eventId,
    ...options,
  });
};

// 5. 사용자 정보 조회 API
export const useUserInfo = (
  options?: Partial<UseQueryOptions<UserInfoResponse, Error>>,
) => {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: async (): Promise<UserInfoResponse> => {
      const response = await authenticatedApiClient.get("/api/v1/user");
      return response.json();
    },
    ...options,
  });
};
