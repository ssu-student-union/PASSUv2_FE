import ky from "ky";
import type { HTTPError } from "ky";
import { getDefaultStore } from "jotai";
import { accessTokenAtom } from "@/atoms/auth";

const store = getDefaultStore();

// API 베이스 URL 설정
const API_BASE_URL = (import.meta.env.VITE_API_URL as string) || "/";

// beforeError 훅: 401 에러 시 인증 정보 초기화
const handleAuthError = (error: HTTPError) => {
  if (error.response.status === 401) {
    store.set(accessTokenAtom, null);
  }
  return error;
};

// ky 인스턴스 생성 - 자동으로 Authorization 헤더 추가
export const apiClient = ky.create({
  prefixUrl: API_BASE_URL,
  hooks: {
    beforeRequest: [
      (request) => {
        const accessToken = store.get(accessTokenAtom);
        if (accessToken) {
          request.headers.set("Authorization", `Bearer ${accessToken}`);
        }
      },
    ],
    beforeError: [handleAuthError],
  },
});
