/**
 * Textos para paginação.
 */
export const PAGINATION_TEXTS = {
  // Página atual
  currentPage: (current: number, total: number) => `Página ${current} de ${total}`,

  // Contagem de linhas selecionadas
  selectedRowCount: (selectedCount: number, totalCount: number) => `${selectedCount} de ${totalCount} linhas selecionadas`,

  // Configurar quantidade de linhas por página
  rowsPerPage: {
    label: "Linhas por página",
  },
} as const
