"use client";

import React from "react";
import { useApp } from "@/hooks/use.app";
import { useRouter } from "next/navigation";
import { SignOut, Speedometer } from "@phosphor-icons/react";
import { AppSidebar } from "@/components/app_sidebar/app_sidebar";
import { AppSidebarProps } from "@/components/app_sidebar/types/app_sidebar";

export const SideBar = () => {
  const router = useRouter();
  const { logOut } = useApp();
  const itens: AppSidebarProps["items"] = [
    {
      title: "Dashboard",
      icon: <Speedometer size={22} />,
      onClick: () => router.push("/dash"),
    },
    {
      title: "Sair",
      color: "red",
      onClick: () => logOut(),
      icon: <SignOut size={22} />,
    },
  ];

  return <AppSidebar items={itens} />;
};
