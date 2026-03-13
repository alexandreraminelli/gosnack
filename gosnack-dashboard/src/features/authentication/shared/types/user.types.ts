/**
 * Papéis do usuário no sistema.
 */
export const USER_ROLES = ["customer", "employee", "manager", "admin"] as const

/**
 * Papel do usuário no sistema.
 */
export type UserRole = (typeof USER_ROLES)[number]

/**
 * Linha da tabela `users` no banco de dados (snake_case).
 */
export type UserRow = {
  id: string
  first_name: string
  last_name: string
  role: UserRole
  is_active: boolean
  updated_at: string
}

/**
 * Perfil do usuário autenticado, obtido da tabela `users`.
 */
export interface UserProfile {
  /** UID (User ID). */
  id: UserRow["id"]
  /** Primeiro nome do usuário. */
  firstName: UserRow["first_name"]
  /** Sobrenome do usuário. */
  lastName: UserRow["last_name"]
  /** Papel do usuário. */
  role: UserRow["role"]
  /** Se o usuário está ativo. */
  isActive: UserRow["is_active"]
  /** Data de atualização dos dados do usuário. */
  updatedAt: UserRow["updated_at"]
}
