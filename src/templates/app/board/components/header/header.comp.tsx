"use client";

import React from "react";
import styles from "./header.module.css";
import { Box, Button, Skeleton } from "@radix-ui/themes";
import { AboutPage } from "@/components/about_page/about_page.comp";
import { useUserContext } from "@/context/user.context";
import { Plus } from "@phosphor-icons/react";
import { useHeader } from "./use.header";
import NewTask from "@/components/new_task/new_task.comp";

const HeaderComp = () => {
  const { user } = useUserContext();
  const { openModal, handleManageModal } = useHeader();

  return (
    <Box className={styles.main}>
      {user ? (
        <AboutPage
          position="start"
          title={`Olá, ${user?.infos[0].name}!`}
          subtitle="Este é o quadro de tarefas da sua equipe!"
        />
      ) : (
        <Skeleton className={styles.skeletonAboutPage} />
      )}

      <Button size="3" className={styles.button} onClick={handleManageModal}>
        <Plus size={32} />
        Nova tarefa
      </Button>

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
