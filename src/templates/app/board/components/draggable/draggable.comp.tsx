"use client";

import React from "react";
import { CSS } from "@dnd-kit/utilities";
import styles from "./draggable.module.css";
import { useSortable } from "@dnd-kit/sortable";
import { DraggableProps } from "./types/draggable";
import { Badge, Box, Card, Separator, Text } from "@radix-ui/themes";
import { convertDate } from "@/utils/formatDate";
import { useRouter } from "next/navigation";

const Draggable = ({ task }: DraggableProps) => {
  const router = useRouter();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 300ms ease",
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      style={style}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      className={styles.main}
      onClick={() => router.push(`/board?task=${task.id}`)}
    >
      <Box className={styles.header}>
        <Badge variant="solid">
          <Text size="1">
            {convertDate(task.date_from.split("T")[0])} -{" "}
            {convertDate(task.date_to.split("T")[0])}
          </Text>
        </Badge>
      </Box>

      <Separator decorative orientation="horizontal" size="4" />

      <Box className={styles.content}>
        <Text className={styles.title}>{task.title}</Text>
      </Box>
    </Card>
  );
};

export default Draggable;
