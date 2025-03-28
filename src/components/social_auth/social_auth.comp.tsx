"use client";
import React from "react";
import styles from "./social_auth.module.css";
import { SocialAuthProps } from "./types/social_auth";
import { Button, Text } from "@radix-ui/themes";
import Image from "next/image";
import { useSocialAuth } from "./use.social_auth";

export const SocialAuth = ({ social, loading }: SocialAuthProps) => {
  const { handleSignIn, loadingHook } = useSocialAuth();

  if (social === "google") {
    return (
      <Button
        disabled={loading || loadingHook}
        loading={loadingHook}
        onClick={handleSignIn}
        className={styles.main}
        variant="outline"
        size="4"
      >
        <Image
          src="/static/icon/google_icon.png"
          className={styles.icon}
          alt="Google Icon"
          height={45}
          width={45}
        />
        <Text className={styles.title} size="3">
          Entrar com Google
        </Text>
      </Button>
    );
  }

  return null;
};
