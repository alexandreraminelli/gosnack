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
  email: string
  first_name: string
  last_name: string
  role: UserRole
  avatar_url: string | null
  is_active: boolean
  updated_at: string
}

/**
 * Perfil do usuário autenticado, obtido da tabela `users`.
 */
export interface UserProfile {
  /** UID (User ID). */
  id: UserRow["id"]
  /** E-mail do usuário. */
  email: UserRow["email"]
  /** Primeiro nome do usuário. */
  firstName: UserRow["first_name"]
  /** Sobrenome do usuário. */
  lastName: UserRow["last_name"]
  /** Papel do usuário. */
  role: UserRow["role"]
  /** URL do avatar do usuário. */
  avatarUrl: UserRow["avatar_url"]
  /** Se o usuário está ativo. */
  isActive: UserRow["is_active"]
  /** Data de atualização dos dados do usuário. */
  updatedAt: UserRow["updated_at"]
}

/**
 * Dados para criar usuário.
 */
export type UserInsert = Omit<UserProfile, "id" | "updatedAt" | "avatarUrl" | "isActive">
