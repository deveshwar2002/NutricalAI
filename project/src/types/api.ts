export interface GeminiResponse {
  text: string;
}

export interface GeminiError {
  message: string;
  status?: number;
}