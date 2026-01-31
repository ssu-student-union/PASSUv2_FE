export interface ApiResponse<T> {
  message: string;
  detail: string;
  data: T;
  success: boolean;
}

export interface ApiErrorResponse {
  message: string;
  detail?: string;
  success: boolean;
}
