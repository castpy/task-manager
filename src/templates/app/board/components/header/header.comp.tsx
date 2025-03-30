"use client";

import React from "react";
import styles from "./header.module.css";
import { Avatar, Box, Button, DropdownMenu } from "@radix-ui/themes";
import { AboutPage } from "@/components/about_page/about_page.comp";
import { useUserContext } from "@/context/user.context";
import { Plus } from "@phosphor-icons/react";
import { useHeader } from "./use.header";
import NewTask from "@/components/new_task/new_task.comp";
import { useApp } from "@/hooks/use.app";
import { useDevice } from "@/hooks/use.device";

const HeaderComp = () => {
  const { logOut } = useApp();
  const { device } = useDevice();
  const { user } = useUserContext();
  const { openModal, handleManageModal } = useHeader();

  return (
    <Box className={styles.main}>
      {device !== "phone" && (
        <AboutPage
          position="start"
          title={`Olá, ${user?.infos[0].name || "Usuário"}!`}
          subtitle="Este é o seu quadro de tarefas!"
        />
      )}

      {device !== "phone" && (
        <Button size="3" className={styles.button} onClick={handleManageModal}>
          <Plus size={32} />
          Nova tarefa
        </Button>
      )}

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            alt={user?.infos[0].name || "A"}
            fallback={user?.infos[0].name[0] || "A"}
            src={user?.infos[0].avatar || "/static/icon/user_icon.png"}
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item color="red" onClick={logOut}>
            Sair
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      {openModal && (
        <NewTask
          open={openModal}
          defaultStatus="to-do"
          onClose={handleManageModal}
        />
      )}
    </Box>
  );
};

export default HeaderComp;
