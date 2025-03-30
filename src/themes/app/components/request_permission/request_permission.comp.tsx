"use client";

import React from "react";
import { useRequestPermission } from "./use.request_permission";
import { Dialog } from "@radix-ui/themes";

const RequestPermission = () => {
  const { permission } = useRequestPermission();

  return (
    <Dialog.Root open={permission === "default"}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Conceder permissão</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Perminta que o aplicativo envie notificações para você.
        </Dialog.Description>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default RequestPermission;
