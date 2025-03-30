// src/context/task.context.tsx
"use client";
import { AxiosErrorWithResponse } from "@/@types/api.axios.error";
import { Task } from "@/@types/task";
import { getTasks } from "@/services/get.tasks.service";
import { putStatusTask } from "@/services/put.status_task.service";
import { getCookie } from "@/utils/cookie";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { toast } from "sonner";

interface TaskContextProps {
  tasks: Task[] | null | undefined;
  setTasks: (tasks: Task[] | null) => void;
  loadingTaskContext: boolean;
  removeTask: (taskId: string) => void;
  setLoadingTaskContext: (loading: boolean) => void;
  updateTaskStatus: (taskId: string, newStatus: Task["status"]) => void;
  reorderTasks: (status: Task["status"], newAreaTasks: Task[]) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

const TaskProvider = ({ children }: { children: ReactNode }) => {
  const token = getCookie();
  const [loadingTaskContext, setLoadingTaskContext] = useState(true);
  const [tasks, setTasks] = useState<Task[] | null | undefined>(undefined);

  const handleGetTasks = async () => {
    try {
      if (token) {
        const response = await getTasks(token);

        const localTask = localStorage.getItem("tasks");
        if (localTask) {
          const storedTasks: Task[] = JSON.parse(localTask);

          const reorderedTasks = storedTasks
            .map(
              (storedTask) =>
                response.find((task: Task) => task.id === storedTask.id) ||
                storedTask
            )
            .filter((task) =>
              response.some((resTask: Task) => resTask.id === task.id)
            );

          const newTasks = response.filter(
            (task: Task) =>
              !storedTasks.some((storedTask) => storedTask.id === task.id)
          );

          setTasks([...reorderedTasks, ...newTasks]);
        } else {
          setTasks(response);
        }
      }
    } catch (error) {
      const e = error as AxiosErrorWithResponse;
      toast.error(e.response.data.message);
    } finally {
      setLoadingTaskContext(false);
    }
  };

  const handlePutTask = async (data: { id: string; status: string }) => {
    try {
      if (token) {
        await putStatusTask(token, data);
      }
    } catch (error) {
      const e = error as AxiosErrorWithResponse;
      toast.error(e.response.data.message);
    }
  };

  useEffect(() => {
    if (loadingTaskContext) handleGetTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, loadingTaskContext]);

  useEffect(() => {
    const localTask = localStorage.getItem("tasks");
    if (localTask) {
      setTasks(JSON.parse(localTask));
    }
    setLoadingTaskContext(false);
  }, []);

  useEffect(() => {
    if (tasks) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else if (tasks === null) {
      localStorage.removeItem("tasks");
    }
    setLoadingTaskContext(false);
  }, [tasks]);

  // Função para remover a task do estado
  const removeTask = (taskId: string) => {
    setTasks((prevTasks) => {
      if (!prevTasks) return prevTasks;
      // Filtra as tasks que NÃO pertencem à task removida
      const newTasks = prevTasks.filter((task) => task.id !== taskId);
      return newTasks;
    });
  };

  // Função para atualizar o status da tarefa (movendo entre áreas)
  const updateTaskStatus = async (
    taskId: string,
    newStatus: Task["status"]
  ) => {
    // Atualiza o status da task no servidor
    setTasks((prevTasks) => {
      if (!prevTasks) return prevTasks;
      // Atualiza o status da task no estado
      return prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );
    });
    await handlePutTask({ id: taskId, status: newStatus });
  };

  // Função para reordenar as tasks dentro de uma mesma área
  const reorderTasks = (status: Task["status"], newAreaTasks: Task[]) => {
    setTasks((prevTasks) => {
      if (!prevTasks) return prevTasks;
      // Filtra as tasks que NÃO pertencem à área
      const otherTasks = prevTasks.filter((task) => task.status !== status);
      // Retorna as tasks que não foram alteradas e as reordenadas da área atual
      return [...otherTasks, ...newAreaTasks];
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        loadingTaskContext,
        setLoadingTaskContext,
        updateTaskStatus,
        reorderTasks,
        removeTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

export { TaskContext, TaskProvider, useTaskContext };
