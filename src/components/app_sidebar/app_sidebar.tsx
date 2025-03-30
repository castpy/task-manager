"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  // useSidebar,
} from "@/shadcn/components/ui/sidebar";
import { Box, Separator, Text } from "@radix-ui/themes";
import styles from "./app_sidebar.module.css";
import { AppSidebarProps } from "./types/app_sidebar";
import { Fragment } from "react";

export function AppSidebar({ items }: AppSidebarProps) {
  // const { setOpen } = useSidebar();

  const handleItemClick = (onClick: () => void) => {
    onClick();
    // setOpen(false);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => (
                <Fragment key={index}>
                  <SidebarMenuItem
                    key={item.title}
                    onClick={() => handleItemClick(item.onClick)}
                  >
                    <SidebarMenuButton color={item.color}>
                      <Box className={styles.menuItemLine}>
                        {item.icon}
                        <Text>{item.title}</Text>
                      </Box>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <Separator orientation="horizontal" size="4" />
                </Fragment>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
