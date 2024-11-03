export interface GenerateRequest {
  theme: string;
  target: string;
  instructions: string;
  url: string;
}

export interface GenerateResponse {
  answer: string;
} 