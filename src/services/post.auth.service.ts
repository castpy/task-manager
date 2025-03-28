import { api } from "@/config/api.axios.config";
import {
  AuthUserResponse,
  VerifyTokenResponse,
} from "./types/post.auth.service";
import { UseAuthForm } from "@/templates/app/types/use.app.template";

export const authUser = async (
  form: UseAuthForm
): Promise<AuthUserResponse> => {
  try {
    const response = await api.post<AuthUserResponse>("/auth", form);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyToken = async (
  token: string
): Promise<VerifyTokenResponse> => {
  try {
    const response = await api.post<VerifyTokenResponse>("/auth/verify-token", {
      token,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
