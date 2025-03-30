import React from "react";
import { TaskViewProps } from "./types/task_view";
import { Button, Dialog, Flex } from "@radix-ui/themes";

const TaskView = ({ open }: TaskViewProps) => {
  return (
    <Dialog.Root open={open}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Edit profile</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Make changes to your profile.
        </Dialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default TaskView;
