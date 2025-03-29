"use client";
import { AxiosErrorWithResponse } from "@/@types/api.axios.error";
import { Task } from "@/@types/task";
import { getTasks } from "@/services/get.tasks.service";
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
  setTasks: (Task: Task[] | null) => void;
  loadingTaskContext: boolean;
  setLoadingTaskContext: (loading: boolean) => void;
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
        setTasks(response);
      }
    } catch (error) {
      const e = error as AxiosErrorWithResponse;
      toast.error(e.response.data.message);
    } finally {
      setLoadingTaskContext(false);
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

  return (
    <TaskContext.Provider
      value={{ tasks, setTasks, loadingTaskContext, setLoadingTaskContext }}
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
