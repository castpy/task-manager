"use client";

import React from "react";
import { useDnd } from "./use.dnd";
import styles from "./dnd.module.css";
import { Box } from "@radix-ui/themes";
import Areas from "../areas/areas.comp";
import { closestCenter, DndContext } from "@dnd-kit/core";

const Dnd = () => {
  const { areas, sensors, handleDragEnd } = useDnd();

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
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
    </DndContext>
  );
};

export default Dnd;
