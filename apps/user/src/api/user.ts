import { useQuery } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { authenticatedApiClient } from "./client";
import type {
  UserInfoResponse,
  ApiResponse,
  ApiErrorResponse,
} from "@/model/api";

// 사용자 정보 조회 API
export const useUserInfo = () => {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: async (): Promise<ApiResponse<UserInfoResponse>> => {
      try {
        const response = await authenticatedApiClient.get("api/v1/user");
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
  });
};
