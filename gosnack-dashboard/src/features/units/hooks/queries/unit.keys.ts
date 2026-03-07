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
}
