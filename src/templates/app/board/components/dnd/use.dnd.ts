import { DndProps } from "./types/dnd";
import { arrayMove } from "@dnd-kit/sortable";
import { useTaskContext } from "@/context/task.context";
import {
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { useState } from "react";
import { Task } from "@/@types/task";

export const useDnd = () => {
  const areas: DndProps["droppableArea"][] = [
    { title: "To-Do", defaultValue: "to-do" },
    { title: "In Progress", defaultValue: "in-progress" },
    { title: "Completed", defaultValue: "completed" },
  ];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );
  const { tasks, updateTaskStatus, reorderTasks } = useTaskContext();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks?.find((t) => t.id === active.id) || null;
    if (task) setActiveTask(task);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (!tasks) return;

    const { active, over } = event;
    if (!over) {
      setActiveTask(null);
      return;
    }

    const activeTaskItem = tasks.find((task) => task.id === active.id);
    if (!activeTaskItem) return;

    const overTask = tasks.find((task) => task.id === over.id);

    if (overTask) {
      if (activeTaskItem.status === overTask.status) {
        const areaTasks = tasks.filter(
          (task) => task.status === activeTaskItem.status
        );
        const oldIndex = areaTasks.findIndex((task) => task.id === active.id);
        const newIndex = areaTasks.findIndex((task) => task.id === over.id);

        if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
          const newAreaTasks = arrayMove(areaTasks, oldIndex, newIndex);
          reorderTasks(activeTaskItem.status, newAreaTasks);
        }
      } else {
        updateTaskStatus(activeTaskItem.id, overTask.status);
      }
    } else {
      // Quando o drop ocorrer em um container vazio, usamos o id do container (over.id)
      if (activeTaskItem.status !== over.id) {
        updateTaskStatus(activeTaskItem.id, over.id as Task["status"]);
      }
    }

    setActiveTask(null);
  };

  const handleDragCancel = () => {
    setActiveTask(null);
  };

  return {
    areas,
    sensors,
    activeTask,
    handleDragEnd,
    handleDragStart,
    handleDragCancel,
  };
};
