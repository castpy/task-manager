"use client";

import React from "react";
import { useAreas } from "./use.areas";
import styles from "./areas.module.css";
import { AreasProps } from "./types/areas";
import { Plus } from "@phosphor-icons/react";
import Draggable from "../draggable/draggable.comp";
import NewTask from "@/components/new_task/new_task.comp";
import { Box, Card, IconButton, Separator, Text } from "@radix-ui/themes";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const Areas = ({ title, defaultValue }: AreasProps) => {
  const { handleManageModal, openModal, areasTasksIds, areasTasks } = useAreas({
    title,
    defaultValue,
  });

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

      <Separator size="4" />

      {openModal && (
        <NewTask
          open={openModal}
          onClose={handleManageModal}
          defaultStatus={defaultValue}
        />
      )}

      <SortableContext
        items={areasTasksIds}
        strategy={verticalListSortingStrategy}
      >
        {areasTasks.map((task) => (
          <Draggable key={task.id} task={task} />
        ))}
      </SortableContext>
    </Card>
  );
};

export default Areas;
