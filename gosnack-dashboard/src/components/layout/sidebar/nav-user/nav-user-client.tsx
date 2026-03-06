"use client"

import LogoutButton from "@/features/authentication/shared/components/logout-button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { ICONS } from "@/constants/icons"
import { ACCOUNT_TEXTS } from "@/constants/texts/account.texts"
import { getFullName, getInitials } from "@/utils/formatters/user.formatter"
import { HugeiconsIcon } from "@hugeicons/react"

/**
 * Dados do usuário pro componente.
 */
interface UserData {
  firstName: string
  lastName: string
  email?: string
  avatarUrl?: string
}

/**
 * Dropdown do sidebar para exibir informações do usuário logado (avatar, nome
 * e email) e opções de perfil, configurações e logout.
 */
export default function NavUserClient({ user }: { user: UserData }) {
  // Media Query
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          {/* Botão visível */}
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              // Nome e email do usuário
              tooltip={`${getFullName(user.firstName, user.lastName)} (${user.email})`}
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {/* User Tile */}
              <UserTile {...user} />

              {/* Arrow */}
              <HugeiconsIcon icon={isMobile ? ICONS.arrow.up : ICONS.arrow.right} className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          {/* Menu de opções */}
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "top" : "right"} // lado de abertura
            align="end"
            sideOffset={4}
          >
            {/* Informações do usuário */}
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <UserTile {...user} />
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* Opções */}
            <LogoutButton />
            {/* TODO: Botão de minha conta */}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

/**
 * Tile com avatar, nome do usuário e e-mail.
 */
function UserTile(user: UserData) {
  return (
    <>
      <Avatar>
        <AvatarImage src={user.avatarUrl} alt={ACCOUNT_TEXTS.avatar.alt(user.firstName)} />
        {/* Fallback: iniciais */}
        <AvatarFallback
          className="bg-accent-foreground text-accent" // contraste com o fundo
        >
          {getInitials(user.firstName, user.lastName)}
        </AvatarFallback>
      </Avatar>

      {/* Texto */}
      <div className="grid flex-1 text-left text-sm leading-tight text-foreground">
        {/* Nome do usuário */}
        <span className="truncate font-medium">{getFullName(user.firstName, user.lastName)}</span>
        {/* E-mail do usuário */}
        <span className="truncate text-xs">{user.email}</span>
      </div>
    </>
  )
}
