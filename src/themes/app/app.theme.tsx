import "@/app/globals.css";
import { Suspense } from "react";
import "@radix-ui/themes/styles.css";
import styles from "./app.module.css";
import { Box } from "@radix-ui/themes";
import Toast from "../../components/toast/toast.comp";
import { UserProvider } from "@/context/user.context";
import { ThemeProvider } from "@/context/theme.context";
import { FallBack } from "../../components/fallback/fallback.comp";
import { RadixTheme } from "./components/radix_theme/radix_theme.comp";
import { NextAuthProvider } from "./components/next_auth/next_auth.comp";
import SafeArea from "@/components/safe_area/safe_area.comp";

export const AppTheme = ({ children }: { children: React.ReactNode }) => {
  return (
    <body suppressHydrationWarning>
      <ThemeProvider>
        <NextAuthProvider>
          <UserProvider>
            <RadixTheme>
              <Suspense fallback={<FallBack />}>
                <Toast />
                <Box className={styles.main}>
                  <SafeArea>{children}</SafeArea>
                </Box>
              </Suspense>
            </RadixTheme>
          </UserProvider>
        </NextAuthProvider>
      </ThemeProvider>
    </body>
  );
};
