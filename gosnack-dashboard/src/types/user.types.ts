/**
 * Papel do usuário no sistema.
 */
export type UserRole = "client" | "employee" | "manager" | "admin"

/**
 * Perfil do usuário autenticado, obtido da tabela `users`.
 */
export interface UserProfile {
  /** UID (User ID). */
  id: string
  /** Primeiro nome do usuário. */
  firstName: string
  /** Sobrenome do usuário. */
  lastName: string
  /** Papel do usuário. */
  role: UserRole
  /** Se o usuário está ativo. */
  isActive: boolean
  /** Data de atualização dos dados do usuário. */
  updatedAt: string
}
