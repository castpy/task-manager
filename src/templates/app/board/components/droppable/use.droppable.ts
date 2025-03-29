import { v4 as uuidv4 } from "uuid";
import { useDroppable } from "@dnd-kit/core";
import { useState } from "react";

export const useDroppableArea = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { setNodeRef } = useDroppable({
    id: uuidv4(),
  });
  const handleManageModal = () => {
    setOpenModal(!openModal);
  };

  return {
    setNodeRef,
    openModal,
    handleManageModal,
  };
};
