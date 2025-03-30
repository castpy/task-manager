import { useEffect, useState } from "react";
import { useTaskContext } from "@/context/task.context";
import { Task } from "@/@types/task";
import { AreasProps } from "./types/areas";
import { useDroppable } from "@dnd-kit/core";

export const useAreas = ({ defaultValue }: AreasProps) => {
  const { tasks } = useTaskContext();
  const [areasTasks, setAreasTasks] = useState<Task[]>([]);
  const { setNodeRef } = useDroppable({ id: defaultValue });
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [areasTasksIds, setAreasTasksIds] = useState<string[]>([]);

  const handleManageModal = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    if (tasks) {
      const areaTasks = tasks.filter((task) => task.status === defaultValue);
      setAreasTasks(areaTasks);
      setAreasTasksIds(areaTasks.map((task) => task.id));
    }
  }, [tasks, defaultValue]);

  return {
    handleManageModal,
    openModal,
    areasTasksIds,
    areasTasks,
    setNodeRef,
  };
};
