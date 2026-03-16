"use client"

import { Badge } from "@/components/ui/badge"
import { ENTITIES_TEXTS } from "@/constants/texts/entities/entities.texts"
import { USERS_TEXTS } from "@/constants/texts/entities/users.texts"
import { UserProfile, UserRole } from "@/types/user.types"
import { ColumnDef } from "@tanstack/react-table"

/**
 * Definição das colunas para a tabela de usuários, incluindo renderização
 * personalizada para campos.
 */
export const userColumns: ColumnDef<UserProfile>[] = [
  // Nome completo
  {
    id: "fullName",
    header: USERS_TEXTS.fields.name,
    cell: ({ row }) => {
      const { firstName, lastName } = row.original
      return `${firstName.trim()} ${lastName.trim()}`
    },
  },

  // E-mail
  {
    accessorKey: "email",
    header: USERS_TEXTS.fields.email,
  },

  // Papel do usuário
  {
    accessorKey: "role",
    header: USERS_TEXTS.fields.role,
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
]
