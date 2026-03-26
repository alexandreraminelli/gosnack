"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import SortableHeader from "@/components/ui/data-table/sortable-header"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ICONS } from "@/constants/icons"
import { ENTITIES_TEXTS } from "@/constants/texts/entities/entities.texts"
import { USERS_TEXTS } from "@/constants/texts/entities/users.texts"
import { UI_TEXTS } from "@/constants/texts/ui.texts"
import { UserProfile, UserRole } from "@/types/user.types"
import { getFullName, getInitials } from "@/utils/formatters/user.formatter"
import { HugeiconsIcon } from "@hugeicons/react"
import { ColumnDef } from "@tanstack/react-table"

/**
 * Definição das colunas para a tabela de usuários, incluindo renderização
 * personalizada para campos.
 */
export const userColumns: ColumnDef<UserProfile>[] = [
  // Nome completo
  {
    id: "fullName",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: ({ column }) => <SortableHeader label={USERS_TEXTS.fields.name} column={column} />,
    cell: ({ row }) => {
      // Obter nome
      const { firstName, lastName, avatarUrl } = row.original
      const fullName = `${firstName.trim()} ${lastName.trim()}`
      const initials = getInitials(firstName, lastName)

      return (
        <div className="flex items-center gap-2">
          {/* Avatar */}
          <Avatar size="sm">
            <AvatarImage src={avatarUrl ?? undefined} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          {/* Name */}
          <span>{fullName}</span>
        </div>
      )
    },
  },

  // E-mail
  {
    accessorKey: "email",
    header: ({ column }) => <SortableHeader label={USERS_TEXTS.fields.email} column={column} />,
  },

  // Papel do usuário
  {
    accessorKey: "role",
    header: USERS_TEXTS.fields.role.label,
    cell: ({ row }) => {
      const role = row.original.role as UserRole
      return ENTITIES_TEXTS.roles[role].singular
    },
  },

  // Status (ativo, desativado)
  {
    accessorKey: "isActive",
    header: USERS_TEXTS.fields.status,
    cell: ({ row }) => {
      const isActive = row.original.isActive
      return <Badge variant={isActive ? "secondary" : "destructive"}>{isActive ? ENTITIES_TEXTS.commonAttributes.status.enabled : ENTITIES_TEXTS.commonAttributes.status.disabled}</Badge>
    },
  },

  // Actions
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original

      return (
        <DropdownMenu>
          {/* Trigger Button */}
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <HugeiconsIcon icon={ICONS.actions.more.vertical} />
              <span className="sr-only">{UI_TEXTS.actions.menu.open}</span>
            </Button>
          </DropdownMenuTrigger>

          {/* Dropdown Content */}
          <DropdownMenuContent align="end">
            {/* Nome */}
            <DropdownMenuLabel className="truncate">{getFullName(user.firstName, user.lastName)}</DropdownMenuLabel>

            {/* Editar */}
            <DropdownMenuItem>
              <HugeiconsIcon icon={ICONS.actions.edit} />
              <span>{UI_TEXTS.actions.edit}</span>
            </DropdownMenuItem>

            {/* Ver detalhes */}
            <DropdownMenuItem>
              <HugeiconsIcon icon={ICONS.actions.moreDetails} />
              <span>{UI_TEXTS.actions.details}</span>
            </DropdownMenuItem>

            {/* Desativar/ativar */}
            <DropdownMenuItem>
              <HugeiconsIcon icon={user.isActive ? ICONS.status.disable : ICONS.status.enable} />
              <span>{ENTITIES_TEXTS.commonAttributes.status[user.isActive ? "disable" : "enable"]}</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Excluir */}
            <DropdownMenuItem variant="destructive">
              <HugeiconsIcon icon={ICONS.actions.delete} />
              <span>{UI_TEXTS.actions.delete}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
