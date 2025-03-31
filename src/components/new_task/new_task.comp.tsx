"use client";

import React from "react";
import styles from "./new_task.module.css";
import { NewTaskProps } from "./types/new_task";
import { TextHOne } from "@phosphor-icons/react";
import {
  Box,
  Button,
  Dialog,
  Flex,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { DatePickerWithRange } from "../date_range_picker/date_range_picker.comp";
import { SelectComp } from "../select/select.comp";
import { SelectCompProps } from "../select/types/select.comp";
import { useNewTask } from "./use.new_task";

const NewTask = ({
  open,
  onClose,
  defaultStatus,
  defaultValues,
}: NewTaskProps) => {
  const { form, setForm, loading, handlePostTask } = useNewTask({
    open,
    onClose,
    defaultStatus,
    defaultValues,
  });
  const selectItens: SelectCompProps["groups"] = [
    {
      label: "Defina o status",
      key: "status",
      items: [
        {
          label: "To-Do",
          value: "to-do",
          default: defaultStatus === "to-do",
        },
        {
          label: "In Progress",
          value: "in-progress",
          default: defaultStatus === "in-progress",
        },
        {
          label: "Completed",
          value: "completed",
          default: defaultStatus === "completed",
        },
      ],
    },
  ];

  return (
    <Dialog.Root open={open}>
      <Dialog.Content maxWidth="600px">
        <Dialog.Title className={styles.title}>
          {defaultValues?.id ? "Editar tarefa" : "Nova tarefa"}
        </Dialog.Title>

        <Box className={styles.content}>
          <Box className={styles.inputContainer}>
            <Text size="4" className={styles.label}>
              Titulo
            </Text>
            <TextField.Root
              size="3"
              type="text"
              value={form.title}
              className={styles.input}
              placeholder="Defina um titulo"
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
            >
              <TextField.Slot>
                <TextHOne size={32} />
              </TextField.Slot>
            </TextField.Root>
          </Box>
          <Box className={styles.inputContainer}>
            <Text size="4" className={styles.label}>
              Descrição
            </Text>
            <TextArea
              size="3"
              resize="vertical"
              value={form.description}
              placeholder="Informe a descrição da tarefa"
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
            />
          </Box>
          <Box className={styles.inputContainer}>
            <Text size="4" className={styles.label}>
              Data de entrega
            </Text>
            <DatePickerWithRange
              className={styles.input}
              onChange={(value) => {
                setForm({
                  ...form,
                  date: {
                    from: value.from.toISOString(),
                    to: value.to.toISOString(),
                  },
                });
              }}
            />
          </Box>
          <Box className={styles.inputContainer}>
            <Text size="4" className={styles.label}>
              Status
            </Text>
            <SelectComp
              groups={selectItens}
              onSelect={(data) =>
                setForm({
                  ...form,
                  status: data,
                })
              }
            />
          </Box>
        </Box>

        <Flex gap="3" mt="4" justify="end">
          <Button
            size="3"
            color="gray"
            variant="soft"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            size="3"
            loading={loading}
            disabled={loading}
            onClick={handlePostTask}
          >
            Salvar
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default NewTask;
