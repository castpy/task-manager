"use client";
import { AppSidebarProps } from "@/components/app_sidebar/types/app_sidebar";
import { AppSidebar } from "@/components/app_sidebar/app_sidebar";
import {
  Buildings,
  House,
  SignOut,
  UserCircle,
  Wallet,
} from "@phosphor-icons/react";
import { useApp } from "@/hooks/use.app";
import React from "react";
import { useRouter } from "next/navigation";

export const SideBar = () => {
  const router = useRouter();
  const { logOut } = useApp();
  const itens: AppSidebarProps["items"] = [
    {
      title: "Página Inicial",
      icon: <House size={22} />,
      onClick: () => router.push("/"),
    },
    {
      title: "Meu perfil",
      icon: <UserCircle size={22} />,
      onClick: () => router.push("/profile"),
    },
    {
      title: "Minha carteira",
      icon: <Wallet size={22} />,
      onClick: () => router.push("/profile/wallet"),
    },
    {
      title: "Empresas/Anunciar Vagas",
      icon: <Buildings size={22} />,
      onClick: () => router.push("/business"),
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
