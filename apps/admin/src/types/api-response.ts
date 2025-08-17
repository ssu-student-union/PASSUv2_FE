export interface ApiResponse<T> {
  message: string;
  detail: string;
  data: T;
  success: boolean;
}
