"use client";
import { AppSidebarProps } from "@/components/app_sidebar/types/app_sidebar";
import { PresentationChart, SignOut, Users } from "@phosphor-icons/react";
import { AppSidebar } from "@/components/app_sidebar/app_sidebar";
import { useApp } from "@/hooks/use.app";
import React from "react";
import { useRouter } from "next/navigation";

export const SideBar = () => {
  const router = useRouter();
  const { logOut } = useApp();
  const itens: AppSidebarProps["items"] = [
    {
      title: "Tarefas",
      icon: <PresentationChart size={22} />,
      onClick: () => router.push("/"),
    },
    {
      title: "Usuários",
      icon: <Users size={22} />,
      onClick: () => router.push("/users"),
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
