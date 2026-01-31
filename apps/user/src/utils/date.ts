import { format, parseISO, isToday as dateFnsIsToday } from "date-fns";
import { ko } from "date-fns/locale";

/** 날짜 포맷 상수 */
export const DATE_FORMAT = {
  /** 날짜만 표시 (예: "2026. 1. 31. (금)") */
  DATE_ONLY: "yyyy. M. d. (E)",
  /** 날짜와 시간 표시 (예: "2026. 1. 31. (금) 16:30") */
  DATE_TIME: "yyyy. M. d. (E) HH:mm",
} as const;

/**
 * RFC3339 형식의 날짜 문자열을 사용자의 로컬 시간대에 맞춰 포맷팅합니다.
 * @param dateString RFC3339 형식의 날짜 문자열 (예: "2026-01-31T16:30:00+09:00")
 * @returns 포맷된 날짜 문자열 (예: "2026. 1. 31. (금) 16:30")
 */
export function formatDateTime(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, DATE_FORMAT.DATE_TIME, { locale: ko });
}

/**
 * RFC3339 형식의 날짜 문자열을 사용자의 로컬 시간대에 맞춰 날짜만 포맷팅합니다.
 * @param dateString RFC3339 형식의 날짜 문자열
 * @returns 포맷된 날짜 문자열 (예: "2026. 1. 31. (금)")
 */
export function formatDate(dateString?: string): string {
  const date = dateString ? parseISO(dateString) : new Date();
  return format(date, DATE_FORMAT.DATE_ONLY, { locale: ko });
}

/**
 * 주어진 날짜가 사용자의 로컬 시간대 기준으로 오늘인지 확인합니다.
 * RFC3339 문자열도 지원합니다.
 * @param date 확인할 날짜 (Date 객체 또는 RFC3339 문자열)
 * @returns 오늘인 경우 true
 */
export function isToday(date: Date | string): boolean {
  const d = typeof date === "string" ? parseISO(date) : date;
  return dateFnsIsToday(d);
}
