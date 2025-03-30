import { toast } from "sonner";
import { useState } from "react";
import { NewTaskForm } from "./types/use.new_task";
import { AxiosErrorWithResponse } from "@/@types/api.axios.error";
import { postNewTask } from "@/services/post.newTask.service";
import { getCookie } from "@/utils/cookie";
import { NewTaskProps } from "./types/new_task";
import { useTaskContext } from "@/context/task.context";
import { putTask } from "@/services/put.task.service";
import { useRouter } from "next/navigation";

export const useNewTask = ({
  onClose,
  defaultStatus,
  defaultValues,
}: NewTaskProps) => {
  const token = getCookie();
  const router = useRouter();
  const { setLoadingTaskContext } = useTaskContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<NewTaskForm>({
    title: defaultValues?.title ?? "",
    status: defaultValues?.status ?? defaultStatus,
    description: defaultValues?.description ?? "",
    date: {
      from: defaultValues?.date.from ?? "",
      to: defaultValues?.date.to ?? "",
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
        let response;
        if (defaultValues) {
          response = await putTask(token, defaultValues.id, form);
        } else {
          response = await postNewTask(token, form);
        }

        if (response) {
          toast.success(
            defaultValues
              ? "Tarefa editada com sucesso!"
              : "Tarefa criada com sucesso!"
          );
          onClose();
          router.push("/board");
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
