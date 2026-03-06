"use client"

import NavSidebarSkeleton from "@/components/layout/sidebar/nav-menu/nav-sidebar-skeleton"
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { SIDEBAR_MENU } from "@/constants/navigation/sidebar-menu"
import { UserRole } from "@/features/authentication/shared/types/user.types"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo } from "react"

/**
 * Props de `NavSidebarClient`.
 */
interface Props {
  role: UserRole | null
}

/**
 * Menu de navegação do sidebar.
 */
export default function NavSidebarClient({ role }: Props) {
  // Hooks
  const pathname = usePathname()

  // Filtrar grupos e itens para o role do usuário
  const menu = useMemo(
    () => {
      // Se não houver role, retorna menu vazio
      if (!role) return []

      return (
        SIDEBAR_MENU
          // filtrar grupos:
          .filter((group) => group.roles.includes(role))
          // filtrar itens de cada grupo:
          .map((group) => ({
            ...group,
            items: group.items.filter((item) => item.roles.includes(role)),
          }))
          // filtrar grupos sem itens:
          .filter((group) => group.items.length > 0)
      )
    },
    [role], // recalcular se role mudar
  )

  // Skeleton durante carregamento
  if (!role) return <NavSidebarSkeleton />

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
                    // Destacar rota ativa:
                    isActive={
                      item.href === "/"
                        ? pathname === "/" // Destacar rota root (home) apenas se for exatamente "/"
                        : pathname.startsWith(item.href) // Destacar rotas até para sub-rotas
                    }
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
