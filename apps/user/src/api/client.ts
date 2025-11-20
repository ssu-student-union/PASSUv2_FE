import ky from "ky";
import { getDefaultStore } from "jotai";
import { accessTokenAtom } from "@/atoms/auth";

const store = getDefaultStore();

// API 베이스 URL 설정
const API_BASE_URL = (import.meta.env.VITE_API_URL as string) || "/";

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
  },
});

// 인증이 필요한 API 클라이언트
export const authenticatedApiClient = ky.create({
  prefixUrl: API_BASE_URL,
  hooks: {
    beforeRequest: [
      (request) => {
        const accessToken = store.get(accessTokenAtom);
        if (!accessToken) {
          throw new Error("Access token is required");
        }
        request.headers.set("Authorization", `Bearer ${accessToken}`);
      },
    ],
  },
});
