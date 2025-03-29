"use client";

import React from "react";
import styles from "./header.module.css";
import { Box, Button, Skeleton } from "@radix-ui/themes";
import { AboutPage } from "@/components/about_page/about_page.comp";
import { useUserContext } from "@/context/user.context";
import { Plus } from "@phosphor-icons/react";

const HeaderComp = () => {
  const { user } = useUserContext();

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

      <Button size="3" className={styles.button}>
        <Plus size={32} />
        Nova tarefa
      </Button>
    </Box>
  );
};

export default HeaderComp;
