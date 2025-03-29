"use client";

import React from "react";
import { SideBar } from "./components/sidebar/sidebar.comp";
import SafeArea from "@/components/safe_area/safe_area.comp";
import { SidebarProvider } from "@/shadcn/components/ui/sidebar";

const DashLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <SideBar />
      <SafeArea>{children}</SafeArea>
    </SidebarProvider>
  );
};

export default DashLayout;
