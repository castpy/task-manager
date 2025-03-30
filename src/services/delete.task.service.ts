import { api } from "@/config/api.axios.config";
import { AxiosResponse } from "axios";

export const deleteTask = async (
  taskId: string,
  token: string
): Promise<AxiosResponse["status"]> => {
  try {
    const response = await api.delete<AxiosResponse["status"]>(
      `/user/task/${taskId}`,
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
