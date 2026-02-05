import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";
import type { HTTPError } from "ky";
import { apiClient } from "./client";
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
      const response = await apiClient.get(
        "user-api/v2/student-info",
        accessToken
          ? {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          : undefined,
      );
      return response.json();
    },
    ...queryOptions,
  });
};
