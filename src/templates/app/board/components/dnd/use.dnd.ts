import { DndProps } from "./types/dnd";
import { arrayMove } from "@dnd-kit/sortable";
import { useTaskContext } from "@/context/task.context";
import {
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";

export const useDnd = () => {
  const areas: DndProps["droppableArea"][] = [
    { title: "To-Do", defaultValue: "to-do" },
    { title: "In Progress", defaultValue: "in-progress" },
    { title: "Completed", defaultValue: "completed" },
  ];

  const sensors = useSensors(useSensor(PointerSensor));
  const { tasks, updateTaskStatus, reorderTasks } = useTaskContext();

  const handleDragEnd = (event: DragEndEvent) => {
    if (!tasks) return;

    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find((task) => task.id === active.id);
    const overTask = tasks.find((task) => task.id === over.id);

    if (!activeTask || !overTask) return;

    if (activeTask.status === overTask.status) {
      const areaTasks = tasks.filter(
        (task) => task.status === activeTask.status
      );
      const oldIndex = areaTasks.findIndex((task) => task.id === active.id);
      const newIndex = areaTasks.findIndex((task) => task.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        const newAreaTasks = arrayMove(areaTasks, oldIndex, newIndex);
        reorderTasks(activeTask.status, newAreaTasks);
      }
    } else {
      updateTaskStatus(activeTask.id, overTask.status);
    }
  };

  return {
    areas,
    sensors,
    handleDragEnd,
  };
};
