"use client";

import React from "react";
import { CSS } from "@dnd-kit/utilities";
import styles from "./draggable.module.css";
import { useSortable } from "@dnd-kit/sortable";
import { DraggableProps } from "./types/draggable";
import { DotsThreeOutline } from "@phosphor-icons/react";
import {
  Badge,
  Box,
  Card,
  DropdownMenu,
  IconButton,
  Separator,
  Text,
} from "@radix-ui/themes";
import { convertDate } from "@/utils/formatDate";

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
      <Box className={styles.header}>
        <Badge variant="solid">
          <Text size="1">
            {convertDate(task.date_from.split("T")[0])} -{" "}
            {convertDate(task.date_to.split("T")[0])}
          </Text>
        </Badge>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <IconButton variant="soft" className={styles.button}>
              <DotsThreeOutline size={22} />
            </IconButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>Editar</DropdownMenu.Item>
            <DropdownMenu.Item>Compartilhar</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item color="red">Deletar</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Box>

      <Separator decorative orientation="horizontal" size="4" />

      <Box className={styles.content}>
        <Text className={styles.title}>{task.title}</Text>
      </Box>
    </Card>
  );
};

export default Draggable;
