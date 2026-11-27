"use client";

/* eslint-disable no-restricted-imports */
import { UserRole } from "@/domains/auth/types/user-role";
import { getSidebarMenu } from "@/features/navigation";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/ui/primitives/sidebar";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Menu de navegação do sidebar.
 */
export default function NavSidebar() {
  const texts = useTranslations("core");
  // TODO: Obter papel do usuário da sessão
  const role: UserRole = "admin";
  const menu = getSidebarMenu(role, (key) => texts(key as never));

  const pathname = usePathname(); // Obtém a rota atual para destacar o item ativo

  return (
    <>
      {menu.map((group) => (
        <SidebarGroup key={group.label}>
          {/* Nome do grupo */}
          <SidebarGroupLabel>{group.label}</SidebarGroupLabel>

          {/* Conteúdo do grupo */}
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Item do Menu */}
              {group.items.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    render={<Link href={item.href} />} // renderizar Link do Next
                    tooltip={item.label} // label para sidebar colapsado
                    // Destacar item ativo:
                    isActive={
                      item.href === "/"
                        ? pathname === "/" // Destacar rota root apenas se for exatamente "/"
                        : pathname.startsWith(item.href) // Destacar rotas até para sub-rotas
                    }
                  >
                    {/* Ícone */}
                    <HugeiconsIcon icon={item.icon} />
                    {/* Label */}
                    {item.label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}
