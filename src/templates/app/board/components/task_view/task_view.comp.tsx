import React from "react";
import styles from "./task_view.module.css";
import { useTaskView } from "./use.task_view";
import { convertDate } from "@/utils/formatDate";
import { TaskViewProps } from "./types/task_view";
import { Pencil, Trash } from "@phosphor-icons/react";
import {
  Badge,
  Blockquote,
  Button,
  Dialog,
  Flex,
  IconButton,
  Separator,
  Table,
} from "@radix-ui/themes";

const TaskView = ({ open, taskId, close }: TaskViewProps) => {
  const { task, loading, handleClickEdit, handleDeleteTask, handleClose } =
    useTaskView({
      open,
      taskId,
      close,
    });

  if (!task) return null;

  return (
    <Dialog.Root open={open} onOpenChange={handleClose}>
      <Dialog.Content maxWidth="800px">
        <Dialog.Title>{task?.title}</Dialog.Title>
        <Blockquote>
          <Dialog.Description size="2" mb="4">
            {task.description
              ? task.description.split("\n").map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))
              : "Descrição da task não informada."}
          </Dialog.Description>
        </Blockquote>

        <Separator size="4" mt="5" mb="5" />

        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>
                Periodo de atuação
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Ações</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Badge>{task?.status}</Badge>
              </Table.Cell>
              <Table.Cell>
                {`${convertDate(task?.date_from.split("T")[0])} - ${convertDate(
                  task?.date_to.split("T")[0]
                )}`}
              </Table.Cell>
              <Table.Cell className={styles.containerActions}>
                <IconButton
                  variant="ghost"
                  disabled={loading}
                  onClick={handleClickEdit}
                >
                  <Pencil size={22} />
                </IconButton>
                <IconButton
                  variant="ghost"
                  onClick={handleDeleteTask}
                  disabled={loading}
                >
                  <Trash size={22} />
                </IconButton>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button disabled={loading} loading={loading} onClick={handleClose}>
              Fechar
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default TaskView;
