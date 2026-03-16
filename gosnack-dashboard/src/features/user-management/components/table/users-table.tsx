"use client"

import EmptyState from "@/components/shared/feedback/empty-state"
import { USERS_TEXTS } from "@/constants/texts/entities/users.texts"
import { userColumns } from "@/features/user-management/components/table/users-columns"
import { UsersDataTable } from "@/features/user-management/components/table/users-data-table"
import { useUsers } from "@/features/user-management/hooks/queries/user.queries"

/**
 * Tabela de usuários do sistema.
 */
export default function UsersTable() {
  const { data: users = [], isError } = useUsers()

  if (isError) {
    return <EmptyState title={USERS_TEXTS.error.getAll.title} description={[USERS_TEXTS.error.getAll.description]} />
  }

  return <UsersDataTable columns={userColumns} data={users} />
}
