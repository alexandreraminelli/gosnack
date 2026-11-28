"use client";

import { ICONS } from "@/core/constants/icons";
import { getFullName, getInitials } from "@/core/lib/user.utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/primitives/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/ui/primitives/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/ui/primitives/sidebar";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslations } from "next-intl";

/**
 * Dados do usuário pro componente.
 */
interface UserData {
  firstName: string;
  lastName: string;
  email?: string;
  avatarUrl?: string;
}

/**
 * Menu de navegação de opções do usuário no sidebar.
 */
export default function NavUser() {
  const { isMobile } = useSidebar();
  const texts = useTranslations("core");

  // TODO: Obter dados do usuário
  const userData: UserData = {
    firstName: "Alexandre",
    lastName: "Raminelli",
    email: "alexandre.raminelli05@gmail.com",
  };

  // TODO: Criar utilitário para obter nome completo do usuário
  const tooltipText = `${getFullName(userData.firstName, userData.lastName)} ${userData.email && `(${userData.email})`}`;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          {/* Trigger ------------------------------------------------------ */}
          <DropdownMenuTrigger render={<SidebarMenuButton tooltip={tooltipText} />}>
            {/* User Tile */}
            <UserTile userData={userData} />

            {/* Arrow */}
            <HugeiconsIcon icon={isMobile ? ICONS.arrow.up : ICONS.arrow.right} className="ms-auto" />
          </DropdownMenuTrigger>

          {/* Content ------------------------------------------------------ */}
          <DropdownMenuContent
            side={isMobile ? "top" : "right"} // lado de abertura
            align="end" // alinhamento do conteúdo
            sideOffset={4} // distância do trigger
            className="w-fit"
          >
            <DropdownMenuGroup>
              {/* User Info -------------------------------------------------- */}
              <DropdownMenuLabel>
                <div className="flex items-center gap-2 px-1 py-1.5 text-start text-sm">
                  <UserTile userData={userData} />
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* Options -------------------------------------------------- */}

              {/* TODO: Botão de minha conta */}
              <DropdownMenuItem>
                <HugeiconsIcon icon={ICONS.profile.user} />
                <span>{texts("profile.myAccount.label")}</span>
              </DropdownMenuItem>

              {/* TODO: Botão de logout */}
              <DropdownMenuItem variant="destructive">
                <HugeiconsIcon icon={ICONS.auth.logout} />
                <span>{texts("auth.logout.label")}</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

/**
 * Tile com avatar, nome do usuário e e-mail.
 */
function UserTile({ userData }: { userData: UserData }) {
  return (
    <>
      {/* Avatar ----------------------------------------------------------- */}
      <Avatar>
        <AvatarImage src={userData.avatarUrl} />
        <AvatarFallback className="bg-accent-foreground text-accent">{getInitials(userData.firstName, userData.lastName) || <HugeiconsIcon icon={ICONS.profile.user} />}</AvatarFallback>
      </Avatar>

      {/* Info ------------------------------------------------------------- */}
      <div className="grid flex-1 text-start text-sm leading-tight text-foreground">
        {/* Nome */}
        <span className="truncate font-medium">{getFullName(userData.firstName, userData.lastName)}</span>

        {/* E-mail */}
        <span className="truncate text-xs">{userData.email}</span>
      </div>
    </>
  );
}
