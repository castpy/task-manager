import React from "react";
import styles from "./loading.module.css";
import { Box, Spinner } from "@radix-ui/themes";

const Loading = () => {
  return (
    <Box className={styles.loading}>
      <Spinner size="3" />
    </Box>
  );
};

export default Loading;
