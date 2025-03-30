import { api } from "@/config/api.axios.config";
import { AxiosResponse } from "axios";

export const putTask = async (
  token: string,
  form: { id: string; status: string }
): Promise<AxiosResponse["status"]> => {
  try {
    const response = await api.put<AxiosResponse["status"]>(
      "/user/task",
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.status;
  } catch (error) {
    throw error;
  }
};
