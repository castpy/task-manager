"use client";

import { toast } from "sonner";
import { useState, useEffect } from "react";

export const useRequestPermission = () => {
  const [permission, setPermission] = useState<NotificationPermission>(
    Notification?.permission
  );

  useEffect(() => {
    if (!("Notification" in window)) {
      toast.error("Este navegador não suporta notificações.");
      return;
    }

    if (permission === "default") {
      Notification.requestPermission()
        .then((newPermission) => {
          setPermission(newPermission);
          if (newPermission === "granted") {
            toast.success("Permissão concedida para notificações.");
          } else {
            toast.error("Permissão negada para notificações.");
          }
        })
        .catch((error) => {
          console.error(
            "Erro ao solicitar permissão para notificações:",
            error
          );
        });
    }
  }, [permission]);

  return { permission };
};
