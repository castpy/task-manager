import React from "react";
import styles from "./dnd.module.css";
import DroppableArea from "../droppable/droppable.comp";
import { Box } from "@radix-ui/themes";
import { DndProps } from "./types/dnd";

const Dnd = () => {
  const areas: DndProps["droppableArea"][] = [
    { title: "To-Do", defaultValue: "to-do" },
    { title: "In Progress", defaultValue: "in-progress" },
    { title: "Completed", defaultValue: "completed" },
  ];

  return (
    <Box className={styles.main}>
      {areas.map((item, index) => (
        <DroppableArea
          key={index}
          title={item.title}
          defaultValue={item.defaultValue}
        />
      ))}
    </Box>
  );
};

export default Dnd;
