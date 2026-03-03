/**
 * Chaves de consulta para unidades no React Query.
 */
export const unitKeys = {
  /**
   * Chave raiz para unidades.
   */
  all: ["units"] as const,

  /**
   * Chave para listas de unidades.
   */
  list: () => [...unitKeys.all, "list"] as const,

  /**
   * Chave para detalhes de uma unidade específica.
   */
  detail: (id?: string) => [...unitKeys.all, "detail", id] as const,

  /**
   * Chave para verificar duplicidade de nome de unidade.
   */
  checkDuplicateName: (name: string, excludeId?: string) => [...unitKeys.all, "check-duplicate-name", { name, excludeId }] as const,
}
