"use client";

import React from "react";
import styles from "./droppable.module.css";
import { Plus } from "@phosphor-icons/react";
import { useDroppableArea } from "./use.droppable";
import { Box, Card, IconButton, Separator, Text } from "@radix-ui/themes";
import { DroppableAreaTypes } from "./types/droppable";

const DroppableArea = ({ title }: DroppableAreaTypes) => {
  const { setNodeRef } = useDroppableArea();

  return (
    <Card className={styles.main}>
      <Box className={styles.header}>
        <Text size="4" className={styles.title}>
          {title}
        </Text>
        <IconButton size="1" variant="surface">
          <Plus size={22} />
        </IconButton>
      </Box>

      <Separator size="4" m="3" />

      <Box ref={setNodeRef} className={styles.taskList} />
    </Card>
  );
};

export default DroppableArea;
