"use client";

import React from "react";
import { SideBar } from "./components/sidebar/sidebar.comp";
import { SidebarProvider } from "@/shadcn/components/ui/sidebar";

const DashLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <SideBar />
      {children}
    </SidebarProvider>
  );
};

export default DashLayout;
