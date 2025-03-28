import React from "react";
import { Box } from "@radix-ui/themes";
import styles from "./fallback.module.css";
import Loading from "../loading/loading.comp";

export const FallBack = () => {
  return (
    <Box className={styles.loading}>
      <Loading />
    </Box>
  );
};
