import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";
import type { HTTPError } from "ky";
import { authenticatedApiClient, apiClient } from "./client";
import type { StudentInfoResponse, PassuErrorResponse } from "@/model/api";

// 사용자 정보 조회 API
export const useUserInfo = (options?: {
  accessToken?: string;
  queryOptions?: Partial<
    UseQueryOptions<StudentInfoResponse, HTTPError<PassuErrorResponse>>
  >;
}) => {
  const { accessToken, queryOptions } = options ?? {};

  return useQuery({
    queryKey: ["userInfo", accessToken],
    queryFn: async (): Promise<StudentInfoResponse> => {
      let response;
      if (accessToken) {
        // 임시 토큰을 사용하여 API 호출
        response = await apiClient.get("user-api/v2/student-info", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } else {
        // 기본 인증된 클라이언트 사용
        response = await authenticatedApiClient.get("user-api/v2/student-info");
      }
      return response.json();
    },
    ...queryOptions,
  });
};
