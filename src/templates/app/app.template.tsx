"use client";

import React from "react";
import styles from "./app.module.css";
import { useAppTemplate } from "./use.app.template";
import { At, Password } from "@phosphor-icons/react";
import {
  Box,
  Button,
  Card,
  Separator,
  Text,
  TextField,
} from "@radix-ui/themes";
import { AboutPage } from "@/components/about_page/about_page.comp";
import { SocialAuth } from "@/components/social_auth/social_auth.comp";

const AppTemplate = () => {
  const { form, setForm, loading, disableSubmit, handleAuthUser } =
    useAppTemplate();

  return (
    <Box className={styles.main}>
      <AboutPage
        position="start"
        title="Faça login ou cadastre-se"
        subtitle="Informe seu e-mail e senha ou utilize o google!"
      />

      <Card className={styles.card}>
        <form className={styles.form} onSubmit={handleAuthUser}>
          <Box className={styles.inputContainer}>
            <Text className={styles.label} size="3">
              E-mail
            </Text>
            <TextField.Root
              size="3"
              type="email"
              value={form.email}
              placeholder="E-mail"
              className={styles.input}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            >
              <TextField.Slot>
                <At size={32} />
              </TextField.Slot>
            </TextField.Root>
          </Box>
          <Box className={styles.inputContainer}>
            <Text className={styles.label} size="3">
              Senha
            </Text>
            <TextField.Root
              size="3"
              type="password"
              placeholder="Senha"
              value={form.password}
              className={styles.input}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            >
              <TextField.Slot>
                <Password size={32} />
              </TextField.Slot>
            </TextField.Root>
          </Box>

          <Button
            size="3"
            type="submit"
            loading={loading}
            disabled={disableSubmit}
            className={styles.button}
          >
            Entrar
          </Button>
        </form>

        <Separator size="4" />

        <SocialAuth social="google" loading={loading} />
      </Card>
    </Box>
  );
};

export default AppTemplate;
