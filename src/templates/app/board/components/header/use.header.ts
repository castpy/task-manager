import { useState } from "react";

export const useHeader = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleManageModal = () => {
    setOpenModal(!openModal);
  };

  return { openModal, handleManageModal };
};
