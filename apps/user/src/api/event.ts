import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { HTTPError } from "ky";
import { authenticatedApiClient, apiClient } from "./client";
import type {
  RandomKeyResponse,
  EnrollStudentRequest,
  EnrollmentResponse,
  ProductCountResponse,
  EventInfoResponse,
  EventListResponse,
  PassuErrorResponse,
} from "@/model/api";
import { getDefaultStore } from "jotai";
import { accessTokenAtom } from "@/atoms/auth";

const store = getDefaultStore();

// 0. 전체 이벤트 목록 조회 API
export const useEventList = (
  options?: Partial<UseQueryOptions<EventListResponse, Error>>,
) => {
  return useQuery({
    queryKey: ["eventList"],
    queryFn: async (): Promise<EventListResponse> => {
      try {
        const response = await apiClient.get("user-api/v2/events");
        return response.json();
      } catch (error) {
        // 422 에러 처리
        if (error instanceof HTTPError && error.response.status === 422) {
          const errorResponse: PassuErrorResponse = await error.response.json();
          throw new Error(errorResponse.message);
        }
        throw error;
      }
    },
    ...options,
  });
};

// 1. 랜덤 키 발급 API
export const useIssueRandomKey = (
  options?: Partial<
    UseMutationOptions<RandomKeyResponse, Error, { eventId: string }>
  >,
) => {
  return useMutation({
    mutationFn: async ({
      eventId,
    }: {
      eventId: string;
    }): Promise<RandomKeyResponse> => {
      const token = store.get(accessTokenAtom);
      if (token === null) {
        throw new Error("Access token is required");
      }
      const response = await authenticatedApiClient.post(
        `user-api/v2/events/${eventId}/issue-random-key`,
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
        `user-api/v1/event/${eventId}/enroll`,
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
          `user-api/v2/events/${eventId}/count`,
        );
        return response.json();
      } catch (error) {
        // 422 에러 처리
        if (error instanceof HTTPError && error.response.status === 422) {
          const errorResponse: PassuErrorResponse = await error.response.json();
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
        const response = await apiClient.get(`user-api/v2/events/${eventId}`);
        return response.json();
      } catch (error) {
        // 422 에러 처리
        if (error instanceof HTTPError && error.response.status === 422) {
          const errorResponse: PassuErrorResponse = await error.response.json();
          throw new Error(errorResponse.message);
        }
        throw error;
      }
    },
    enabled: !!eventId,
    ...options,
  });
};
