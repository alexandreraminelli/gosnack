"use client"

import EmptyState from "@/components/shared/feedback/empty-state"
import { USERS_TEXTS } from "@/constants/texts/entities/users.texts"
import { userColumns } from "@/features/user-management/components/table/users-columns"
import { DataTable } from "@/components/ui/data-table/data-table"
import { useUsers } from "@/features/user-management/hooks/queries/user.queries"

/**
 * Tabela de usuários do sistema.
 */
export default function UsersTable() {
  const { data: users = [], isLoading, isError } = useUsers()

  // Skeleton durante carregamento
  if (isLoading) {
    // TODO: Criar skeleton personalizado para tabela de usuários
    return <div>Carregando usuários...</div>
  }

  // Mensagem de erro
  if (isError) {
    return <EmptyState title={USERS_TEXTS.error.getAll.title} description={[USERS_TEXTS.error.getAll.description]} />
  }

  return (
    <DataTable
      columns={userColumns}
      data={users}
      // Mensagem de estado vazio:
      emptyComponent={<EmptyState title={USERS_TEXTS.empty.title} description={[USERS_TEXTS.empty.description]} />}
    />
  )
}
