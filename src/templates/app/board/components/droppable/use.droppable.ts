import { v4 as uuidv4 } from "uuid";
import { useDroppable } from "@dnd-kit/core";

export const useDroppableArea = () => {
  const { setNodeRef } = useDroppable({
    id: uuidv4(),
  });

  return {
    setNodeRef,
  };
};
