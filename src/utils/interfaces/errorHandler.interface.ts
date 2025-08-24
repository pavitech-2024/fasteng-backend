export interface ErrorResponse {
  success: false;
  message: string;
  details?: any;
  stack?: string;
}