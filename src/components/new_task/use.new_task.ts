import { toast } from "sonner";
import { useState } from "react";
import { NewTaskForm } from "./types/use.new_task";
import { AxiosErrorWithResponse } from "@/@types/api.axios.error";
import { postNewTask } from "@/services/post.newTask.service";
import { getCookie } from "@/utils/cookie";
import { NewTaskProps } from "./types/new_task";
import { useTaskContext } from "@/context/task.context";

export const useNewTask = ({ onClose, defaultStatus }: NewTaskProps) => {
  const token = getCookie();
  const { setLoadingTaskContext } = useTaskContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<NewTaskForm>({
    title: "",
    status: defaultStatus,
    description: "",
    date: {
      from: "",
      to: "",
    },
  });

  function isValidNewTaskForm(form: NewTaskForm): boolean {
    return Object.values(form).every(
      (value) => value !== undefined && value !== ""
    );
  }

  const handlePostTask = async () => {
    try {
      if (!isValidNewTaskForm(form)) {
        toast.info("Preencha todos os campos!");
      }

      if (token && isValidNewTaskForm(form)) {
        setLoading(true);
        const response = await postNewTask(token, form);
        if (response === 201) {
          toast.success("Task criada!");
          onClose();
          setLoadingTaskContext(true);
        }
      }
    } catch (error) {
      const e = error as AxiosErrorWithResponse;
      toast.error(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return { form, setForm, loading, handlePostTask };
};
