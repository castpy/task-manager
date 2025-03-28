export interface AuthUserResponse {
  token: string;
}

export interface VerifyTokenResponse {
  valid: boolean;
  error?: string;
}
