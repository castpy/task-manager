import React from "react";
import styles from "./about_page.module.css";
import { Box, Text } from "@radix-ui/themes";
import { AboutPageProps } from "./types/about_page";

export const AboutPage = ({ title, subtitle, position }: AboutPageProps) => {
  return (
    <Box className={styles.main} style={{ alignItems: position }}>
      <Text size="6" className={styles.title}>
        {title}
      </Text>
      {subtitle && (
        <Text size="3" className={styles.subtitle}>
          {subtitle}
        </Text>
      )}
    </Box>
  );
};
