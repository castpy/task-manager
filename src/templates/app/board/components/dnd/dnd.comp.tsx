import React from "react";
import styles from "./dnd.module.css";
import DroppableArea from "../droppable/droppable.comp";
import { Box } from "@radix-ui/themes";
import { DndProps } from "./types/dnd";

const Dnd = () => {
  const areas: DndProps["droppableArea"][] = [
    { title: "To-Do" },
    { title: "In Progress" },
    { title: "Completed" },
  ];

  return (
    <Box className={styles.main}>
      {areas.map((item, index) => (
        <DroppableArea title={item.title} key={index} />
      ))}
    </Box>
  );
};

export default Dnd;
