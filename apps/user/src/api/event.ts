import { useMutation, useQuery } from "@tanstack/react-query";
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
} from "@/model/api";

// 1. 랜덤 키 발급 API
export const useIssueRandomKey = () => {
  return useMutation({
    mutationFn: async (eventId: string): Promise<IssueRandomKeyResponse> => {
      const response = await authenticatedApiClient.post(
        `api/v1/event/${eventId}/issue-key`,
      );
      return response.json();
    },
  });
};

// 2. 학생 등록 API
export const useEnrollStudent = () => {
  return useMutation({
    mutationFn: async ({
      eventId,
      randomKey,
    }: {
      eventId: string;
      randomKey: string;
    }): Promise<EnrollStudentResponse> => {
      const requestBody: EnrollStudentRequest = {
        random_key: randomKey,
      };
      const response = await authenticatedApiClient.post(
        `api/v1/event/${eventId}/enroll`,
        {
          json: requestBody,
        },
      );
      return response.json();
    },
  });
};

// 3. 등록 학생 수 조회 API
export const useEnrolledCount = (eventId: string) => {
  return useQuery({
    queryKey: ["enrolledCount", eventId],
    queryFn: async (): Promise<EnrolledCountResponse> => {
      try {
        const response = await apiClient.get(
          `api/v1/event/${eventId}/enrolled_count`,
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
  });
};

// 4. 이벤트 디테일 조회 API
export const useEventDetail = (eventId: string) => {
  return useQuery({
    queryKey: ["eventDetail", eventId],
    queryFn: async (): Promise<EventDetailResponse> => {
      try {
        const response = await apiClient.get(`api/v1/event/${eventId}`);
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
  });
};
