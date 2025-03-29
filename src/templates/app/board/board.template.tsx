import React from "react";
import styles from "./board.module.css";
import { Box } from "@radix-ui/themes";
import HeaderComp from "./components/header/header.comp";

export const BoardTemplate = () => {
  return (
    <Box className={styles.main}>
      <HeaderComp />
    </Box>
  );
};
