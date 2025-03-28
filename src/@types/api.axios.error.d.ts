import { AxiosResponse } from "axios";

export interface AxiosErrorWithResponse extends AxiosError {
  response: AxiosResponse<{
    error: string;
    message: string;
    statusCode: number;
  }>;
}
