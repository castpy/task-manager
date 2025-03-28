"use client";
import React from "react";
import { useDevice } from "@/hooks/use.device";
import { Toaster } from "@/shadcn/components/ui/sonner";

const Toast = () => {
  const { device } = useDevice();
  return (
    <Toaster
      richColors
      duration={5000}
      visibleToasts={3}
      position={device !== "phone" ? "bottom-right" : "top-right"}
    />
  );
};

export default Toast;
