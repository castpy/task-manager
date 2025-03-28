import { User } from "@/@types/user";
import { api } from "@/config/api.axios.config";

export const getMe = async (token: string): Promise<User> => {
  try {
    const response = await api.get<User>("/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
