import { Task } from "@/@types/task";
import { useTaskContext } from "@/context/task.context";
import { useEffect, useState } from "react";

export const useTaskView = (taskId: string) => {
  const { tasks } = useTaskContext();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (tasks) {
      const taskFound = tasks.find((task) => task.id === taskId);
      if (taskFound) {
        setTask(taskFound);
      }
    }
  }, [taskId, tasks]);

  return { task };
};
