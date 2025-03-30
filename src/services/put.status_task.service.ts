import { api } from "@/config/api.axios.config";
import { AxiosResponse } from "axios";

export const putStatusTask = async (
  token: string,
  form: { id: string; status: string }
): Promise<AxiosResponse["status"]> => {
  try {
    const response = await api.put<AxiosResponse["status"]>(
      "/user/status-task",
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
