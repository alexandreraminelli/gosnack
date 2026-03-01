"use client"

import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { SIDEBAR_MENU } from "@/constants/navigation/sidebar-menu"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

/**
 * Menu de navegação do sidebar.
 */
export default function NavSidebar() {
  // Hooks
  const pathname = usePathname()

  // TODO: Obter role do usuário
  const userRole = "admin"

  // TODO: Skeleton durante carregamento

  return (
    <>
      {SIDEBAR_MENU.map((group, index) => {
        // TODO: Verificar se o grupo é pro role do usuário
        if (!group.roles.includes(userRole)) return null

        return (
          <SidebarGroup key={index}>
            {/* Nome do grupo */}
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>

            {/* Menu de navegação do grupo */}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item, itemIndex) => {
                  // TODO: Verificar se o item é pro role do usuário
                  if (!item.roles.includes(userRole)) return null

                  return (
                    <SidebarMenuItem key={itemIndex}>
                      <SidebarMenuButton
                        asChild
                        tooltip={item.label} // Tooltip para quando sidebar estiver colapsado
                        isActive={pathname === item.href} // Destaque para rota ativa
                      >
                        <Link href={item.href}>
                          {item.icon && <HugeiconsIcon icon={item.icon} />}
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )
      })}
    </>
  )
}
