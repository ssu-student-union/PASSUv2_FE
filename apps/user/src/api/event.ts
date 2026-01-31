import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { HTTPError } from "ky";
import { authenticatedApiClient, apiClient } from "./client";
import type {
  RandomKeyResponse,
  ProductCountResponse,
  EventInfoResponse,
  EventListResponse,
  IsEnrolledResponse,
  PassuErrorResponse,
} from "@/model/api";

// 0. 전체 행사 목록 조회 API
export const useEventList = (
  options?: Partial<
    UseQueryOptions<EventListResponse, HTTPError<PassuErrorResponse>>
  >,
) => {
  return useQuery({
    queryKey: ["eventList"],
    queryFn: async (): Promise<EventListResponse> => {
      const response = await apiClient.get("user-api/v2/events");
      return response.json();
    },
    ...options,
  });
};

// 1. 랜덤 키 발급 API
export const useIssueRandomKey = (
  options?: Partial<
    UseMutationOptions<
      RandomKeyResponse,
      HTTPError<PassuErrorResponse>,
      { eventId: string }
    >
  >,
) => {
  return useMutation({
    mutationFn: async ({
      eventId,
    }: {
      eventId: string;
    }): Promise<RandomKeyResponse> => {
      const response = await authenticatedApiClient.post(
        `user-api/v2/events/${eventId}/issue-random-key`,
      );
      return response.json();
    },
    ...options,
  });
};

// 3. 등록 학생 수 조회 API
export const useEnrolledCount = (
  eventId: string,
  options?: Partial<
    UseQueryOptions<ProductCountResponse, HTTPError<PassuErrorResponse>>
  >,
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
        if (error instanceof HTTPError && error.response.status === 404) {
          return { result: true, message: "", data: 0 };
        }
        throw error;
      }
    },
    enabled: !!eventId,
    ...options,
  });
};

// 4. 행사 디테일 조회 API
export const useEventDetail = (
  eventId: string,
  options?: Partial<
    UseQueryOptions<EventInfoResponse, HTTPError<PassuErrorResponse>>
  >,
) => {
  return useQuery({
    queryKey: ["eventDetail", eventId],
    queryFn: async (): Promise<EventInfoResponse> => {
      const response = await apiClient.get(`user-api/v2/events/${eventId}`);
      return response.json();
    },
    enabled: !!eventId,
    ...options,
  });
};

// 5. 학생 행사 등록 여부 조회 API (Bearer 토큰으로 인증)
export const useIsEnrolled = (
  eventId: string,
  options?: Partial<
    UseQueryOptions<IsEnrolledResponse, HTTPError<PassuErrorResponse>>
  >,
) => {
  return useQuery({
    queryKey: ["isEnrolled", eventId],
    queryFn: async (): Promise<IsEnrolledResponse> => {
      const response = await authenticatedApiClient.get(
        `user-api/v2/events/${eventId}/enrolled`,
      );
      return response.json();
    },
    enabled: !!eventId,
    ...options,
  });
};
