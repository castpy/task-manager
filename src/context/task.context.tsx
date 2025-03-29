"use client";
import { Task } from "@/@types/task";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

interface TaskContextProps {
  tasks: Task[] | null | undefined;
  setTasks: (Task: Task[] | null) => void;
  loadingTaskContext: boolean;
  setLoadingTaskContext: (loading: boolean) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [loadingTaskContext, setLoadingTaskContext] = useState(true);
  const [tasks, setTasks] = useState<Task[] | null | undefined>(undefined);

  useEffect(() => {
    const localTask = localStorage.getItem("Task");
    if (localTask) {
      setTasks(JSON.parse(localTask));
    }
    setLoadingTaskContext(false);
  }, []);

  useEffect(() => {
    if (tasks) {
      localStorage.setItem("Task", JSON.stringify(tasks));
    } else if (tasks === null) {
      localStorage.removeItem("Task");
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
