"use client"

import EmptyState from "@/components/shared/feedback/empty-state"
import { DataTable } from "@/components/ui/data-table/data-table"
import { USERS_TEXTS } from "@/constants/texts/entities/users.texts"
import UserSearchBox, { UserFilterType } from "@/features/user-management/components/table/user-filter-field"
import { userColumns } from "@/features/user-management/components/table/users-columns"
import { useUsers } from "@/features/user-management/hooks/queries/user.queries"
import { useState } from "react"

/**
 * Tabela de usuários do sistema.
 */
export default function UsersTable() {
  /** Lista de usuários. */
  const { data: users = [], isLoading, isError } = useUsers()

  /** State de tipo de filtro selecionado. */
  const [filterType, setFilterType] = useState<UserFilterType>("name")
  /** State do filtro de usuário. */
  const [filterValue, setFilterValue] = useState("")

  // Skeleton durante carregamento
  if (isLoading) {
    // TODO: Criar skeleton personalizado para tabela de usuários
    return <div>Carregando usuários...</div>
  }

  // Mensagem de erro
  if (isError) {
    return <EmptyState title={USERS_TEXTS.error.getAll.title} description={[USERS_TEXTS.error.getAll.description]} />
  }

  /**
   * Filtrar usuários com base no tipo de filtro selecionado e seu valor.
   */
  const filteredUsers = users.filter((user) => {
    const value = filterValue.toLowerCase()
    if (filterType === "email") {
      // Filtragem por e-mail
      return user.email.toLowerCase().includes(value)
    } else {
      // Filtragem por nome
      return `${user.firstName} ${user.lastName}`.toLowerCase().includes(value)
    }
  })

  return (
    <div className="space-y-4">
      {/* Filtro de e-mail */}
      <UserSearchBox
        // Tipo de filtro
        filterType={filterType}
        onFilterTypeChange={setFilterType}
        // Valor do filtro
        filterValue={filterValue}
        onFilterValueChange={setFilterValue}
      />

      {/* Tabela de usuários */}
      <DataTable
        columns={userColumns}
        data={filteredUsers}
        // Mensagem de estado vazio:
        emptyComponent={<EmptyState title={USERS_TEXTS.empty.title} description={[USERS_TEXTS.empty.description]} />}
      />
    </div>
  )
}
