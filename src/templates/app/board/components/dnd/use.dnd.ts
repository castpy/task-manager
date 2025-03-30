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
    // Garante que tasks está definido
    if (!tasks) return;

    const { active, over } = event;
    if (!over) return;

    // Procura a task ativa
    const activeTask = tasks.find((task) => task.id === active.id);
    if (!activeTask) return;

    // Tenta encontrar uma task com o id do elemento sobre o qual foi drop
    const overTask = tasks.find((task) => task.id === over.id);

    if (overTask) {
      // Se a task for drop em uma task (dentro da mesma área ou não)
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
    } else {
      // Caso o drop seja em um container vazio,
      // over.id deverá ser o id do contêiner (status)
      if (activeTask.status !== over.id) {
        updateTaskStatus(activeTask.id, over.id as string);
      }
    }
  };

  return {
    areas,
    sensors,
    handleDragEnd,
  };
};
