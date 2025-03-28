"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { NextAuthProps } from "./types/next_auth";

export const NextAuthProvider = ({ children }: NextAuthProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};
