"use client";
import React from "react";
import { RadixThemeProps } from "./types/radix_theme";
import { Theme } from "@radix-ui/themes";
import { useTheme } from "@/context/theme.context";

export const RadixTheme = ({ children }: RadixThemeProps) => {
  const { isDarkMode } = useTheme();

  return (
    <Theme
      appearance={isDarkMode ? "dark" : "light"}
      accentColor="green"
      grayColor="slate"
      scaling="110%"
      radius="full"
    >
      {children}
    </Theme>
  );
};
