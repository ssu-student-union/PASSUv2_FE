import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { authenticatedApiClient, apiClient } from "./client";
import type { StudentInfoResponse, ApiErrorResponse } from "@/model/api";

// 사용자 정보 조회 API
export const useUserInfo = (options?: {
  accessToken?: string;
  queryOptions?: Partial<UseQueryOptions<StudentInfoResponse>>;
}) => {
  const { accessToken, queryOptions } = options ?? {};

  return useQuery({
    queryKey: ["userInfo", accessToken],
    queryFn: async (): Promise<StudentInfoResponse> => {
      try {
        let response;
        if (accessToken) {
          // 임시 토큰을 사용하여 API 호출
          response = await apiClient.get("user-api/student-info", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
        } else {
          // 기본 인증된 클라이언트 사용
          response = await authenticatedApiClient.get("user-api/student-info");
        }
        return response.json();
      } catch (error) {
        // 401 에러 처리
        if (error instanceof HTTPError && error.response.status === 401) {
          const errorResponse: ApiErrorResponse = await error.response.json();
          throw new Error(errorResponse.message);
        }
        throw error;
      }
    },
    ...queryOptions,
  });
};
