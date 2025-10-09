import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { HTTPError } from "ky";
import { authenticatedApiClient, apiClient } from "./client";
import type {
  RandomKeyResponse,
  IssueRandomKeyRequest,
  EnrollStudentRequest,
  EnrollmentResponse,
  ProductCountResponse,
  EnrolledCountErrorResponse,
  EventInfoResponse,
  EventDetailErrorResponse,
} from "@/model/api";

// 1. 랜덤 키 발급 API
export const useIssueRandomKey = (
  options?: Partial<
    UseMutationOptions<
      RandomKeyResponse,
      Error,
      { eventId: string; token: string }
    >
  >,
) => {
  return useMutation({
    mutationFn: async ({
      eventId,
      token,
    }: {
      eventId: string;
      token: string;
    }): Promise<RandomKeyResponse> => {
      const requestBody: IssueRandomKeyRequest = {
        token,
      };
      const response = await apiClient.post(
        `user-api/events/${eventId}/issue-random-key`,
        {
          json: requestBody,
        },
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
      EnrollmentResponse,
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
    }): Promise<EnrollmentResponse> => {
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
  options?: Partial<UseQueryOptions<ProductCountResponse, Error>>,
) => {
  return useQuery({
    queryKey: ["enrolledCount", eventId],
    queryFn: async (): Promise<ProductCountResponse> => {
      try {
        const response = await apiClient.get(
          `user-api/events/${eventId}/count`,
        );
        return response.json();
      } catch (error) {
        // 404 에러 처리
        if (error instanceof HTTPError && error.response.status === 404) {
          const errorResponse: EnrolledCountErrorResponse =
            await error.response.json();
          throw new Error(errorResponse.message);
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
  options?: Partial<UseQueryOptions<EventInfoResponse, Error>>,
) => {
  return useQuery({
    queryKey: ["eventDetail", eventId],
    queryFn: async (): Promise<EventInfoResponse> => {
      try {
        const response = await apiClient.get(`user-api/events/${eventId}`);
        return response.json();
      } catch (error) {
        // 에러 처리
        if (error instanceof HTTPError && error.response.status === 404) {
          const errorResponse: EventDetailErrorResponse =
            await error.response.json();
          throw new Error(errorResponse.message);
        }
        throw error;
      }
    },
    enabled: !!eventId,
    ...options,
  });
};
