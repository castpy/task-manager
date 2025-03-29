"use client";

import React from "react";
import styles from "./droppable.module.css";
import { Plus } from "@phosphor-icons/react";
import { useDroppableArea } from "./use.droppable";
import { Box, Card, IconButton, Separator, Text } from "@radix-ui/themes";
import { DroppableAreaTypes } from "./types/droppable";
import NewTask from "@/components/new_task/new_task.comp";

const DroppableArea = ({ title, defaultValue }: DroppableAreaTypes) => {
  const { setNodeRef, openModal, handleManageModal } = useDroppableArea();

  return (
    <Card className={styles.main}>
      <Box className={styles.header}>
        <Text size="4" className={styles.title}>
          {title}
        </Text>
        <IconButton size="1" variant="surface" onClick={handleManageModal}>
          <Plus size={22} />
        </IconButton>
      </Box>

      <Separator size="4" m="3" />

      {openModal && (
        <NewTask
          open={openModal}
          onClose={handleManageModal}
          defaultStatus={defaultValue}
        />
      )}

      <Box ref={setNodeRef} className={styles.taskList} />
    </Card>
  );
};

export default DroppableArea;
