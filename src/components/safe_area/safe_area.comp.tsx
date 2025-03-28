import React from "react";
import styles from "./safe_area.module.css";
import { Box } from "@radix-ui/themes";

const SafeArea = ({ children }: { children: React.ReactNode }) => {
  return <Box className={styles.main}>{children}</Box>;
};

export default SafeArea;
