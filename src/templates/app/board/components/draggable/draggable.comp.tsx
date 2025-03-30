// src/templates/app/board/components/draggable/draggable.comp.tsx
"use client";

import React from "react";
import { Card } from "@radix-ui/themes";
import { CSS } from "@dnd-kit/utilities";
import styles from "./draggable.module.css";
import { useSortable } from "@dnd-kit/sortable";
import { DraggableProps } from "./types/draggable";

const Draggable = ({ task }: DraggableProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      style={style}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      className={styles.main}
    >
      {task.title}
    </Card>
  );
};

export default Draggable;
