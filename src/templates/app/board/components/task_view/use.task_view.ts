import { AxiosErrorWithResponse } from "@/@types/api.axios.error";
import { Task } from "@/@types/task";
import { useTaskContext } from "@/context/task.context";
import { deleteTask } from "@/services/delete.task.service";
import { getCookie } from "@/utils/cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { TaskViewProps } from "./types/task_view";

export const useTaskView = ({ taskId, close }: TaskViewProps) => {
  const token = getCookie();
  const router = useRouter();
  const { tasks } = useTaskContext();
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState<Task | null>(null);
  const { setLoadingTaskContext, removeTask } = useTaskContext();

  const handleClose = () => {
    router.push("/board");
    close();
  };

  const handleClickEdit = () => {
    router.push(`/board?task=${taskId}&edit=true`);
  };

  const handleDeleteTask = async () => {
    try {
      if (token) {
        setLoading(true);
        const response = await deleteTask(taskId, token);
        if (response === 200) {
          removeTask(taskId);
          toast.success("Tarefa deletada com sucesso");
          setLoadingTaskContext(true);
          handleClose();
        }
      }
    } catch (error) {
      const e = error as AxiosErrorWithResponse;
      toast.error(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tasks) {
      const taskFound = tasks.find((task) => task.id === taskId);
      if (taskFound) {
        setTask(taskFound);
      }
    }
  }, [taskId, tasks]);

  return { task, loading, handleClickEdit, handleDeleteTask, handleClose };
};
