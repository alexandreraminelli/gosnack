"use client"

import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { SIDEBAR_MENU } from "@/constants/navigation/sidebar-menu"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo } from "react"

/**
 * Menu de navegação do sidebar.
 */
export default function NavSidebar() {
  // Hooks
  const pathname = usePathname()

  // TODO: Obter role do usuário
  const userRole = "admin"

  // Filtrar grupos e itens para o role do usuário
  const menu = useMemo(
    () =>
      SIDEBAR_MENU
        // filtrar grupos:
        .filter((group) => group.roles.includes(userRole))
        // filtrar itens de cada grupo:
        .map((group) => ({
          ...group,
          items: group.items.filter((item) => item.roles.includes(userRole)),
        }))
        // filtrar grupos sem itens:
        .filter((group) => group.items.length > 0),
    [userRole], // recalcular se role mudar
  )

  // TODO: Skeleton durante carregamento

  return (
    <>
      {menu.map((group) => (
        <SidebarGroup key={group.label}>
          {/* Nome do grupo */}
          <SidebarGroupLabel>{group.label}</SidebarGroupLabel>

          {/* Menu de navegação do grupo */}
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item) => (
                // Item do menu
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.label} // Tooltip para sidebar colapsado
                    isActive={pathname === item.href} // Destacar rota ativa
                  >
                    <Link href={item.href}>
                      {item.icon && <HugeiconsIcon icon={item.icon} />}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  )
}
