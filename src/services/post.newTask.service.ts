import { api } from "@/config/api.axios.config";
import { NewTaskForm } from "@/components/new_task/types/use.new_task";
import { AxiosResponse } from "axios";

export const postNewTask = async (
  token: string,
  form: NewTaskForm
): Promise<AxiosResponse["status"]> => {
  try {
    const response = await api.post<AxiosResponse["status"]>(
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
