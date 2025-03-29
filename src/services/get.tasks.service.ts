import { Task } from "@/@types/task";
import { api } from "@/config/api.axios.config";

export const getTasks = async (token: string): Promise<Task[]> => {
  try {
    const response = await api.get<Task[]>("/user/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
