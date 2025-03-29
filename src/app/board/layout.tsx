import { Box } from "@radix-ui/themes";
import React from "react";

const DashLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <Box>{children}</Box>;
};

export default DashLayout;
