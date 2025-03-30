import { NewTaskForm } from "@/components/new_task/types/use.new_task";
import { api } from "@/config/api.axios.config";
import { AxiosResponse } from "axios";

export const putTask = async (
  token: string,
  taskId: string,
  form: NewTaskForm
): Promise<AxiosResponse["status"]> => {
  try {
    const response = await api.put<AxiosResponse["status"]>(
      `/user/task/${taskId}`,
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
