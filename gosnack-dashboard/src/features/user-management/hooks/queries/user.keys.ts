/**
 * Chaves de consulta para usuários no TanStack Query.
 */
export const userKeys = {
  /**
   * Chave raiz para usuários.
   */
  all: ["users"] as const,

  /**
   * Chave para lista de usuários.
   */
  list: () => [...userKeys.all, "list"] as const,
}
