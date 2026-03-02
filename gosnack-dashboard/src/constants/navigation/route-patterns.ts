/**
 * Patters para rotas estáticas.
 */
export const STATIC_ROUTE_PATTERNS = {
  // Início: /
  home: /^\/$/,

  // Unidades: /unidades
  units: /^\/unidades$/,
  cafeterias: {
    // Lanchonetes: /lanchonetes
    main: /^\/lanchonetes$/,
    // Adicionar lanchonete: /lanchonetes/adicionar
    add: /^\/lanchonetes\/adicionar$/,
  },
} as const

/**
 * Patters para rotas dinâmicas.
 */
export const DYNAMIC_ROUTE_PATTERNS = {
  cafeterias: {
    // Detalhes da lanchonete: /lanchonetes/[unitId]/[cafeteriaId]
    details: /^\/lanchonetes\/([^/]+)\/([^/]+)$/,
  },
} as const
