/**
 * Chaves de consulta para lanchonetes no TanStack Query.
 */
export const cafeteriaKeys = {
  /**
   * Chave raiz para lanchonetes.
   */
  all: ["cafeterias"] as const,

  /**
   * Chave para listas de lanchonetes.
   */
  list: () => [...cafeteriaKeys.all, "list"] as const,

  /**
   * Chave para detalhes de uma lanchonete específica.
   */
  detail: (id?: string) => [...cafeteriaKeys.all, "detail", id] as const,
}
