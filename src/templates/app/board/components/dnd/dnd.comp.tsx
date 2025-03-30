"use client";

import React from "react";
import { useDnd } from "./use.dnd";
import styles from "./dnd.module.css";
import { Box } from "@radix-ui/themes";
import Areas from "../areas/areas.comp";
import DraggableCard from "../draggable/draggable.comp";
import { closestCenter, DndContext, DragOverlay } from "@dnd-kit/core";

const Dnd = () => {
  const {
    areas,
    sensors,
    activeTask,
    handleDragEnd,
    handleDragStart,
    handleDragCancel,
  } = useDnd();

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      collisionDetection={closestCenter}
    >
      <Box className={styles.main}>
        {areas.map((item) => (
          <Areas
            title={item.title}
            key={item.defaultValue}
            defaultValue={item.defaultValue}
          />
        ))}
      </Box>

      <DragOverlay>
        {activeTask ? <DraggableCard task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Dnd;
