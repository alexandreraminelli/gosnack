import { DYNAMIC_ROUTE_PATTERNS, STATIC_ROUTE_PATTERNS } from "@/constants/navigation/route-patterns"
import { ROUTES } from "@/constants/navigation/routes"
import { ENTITIES_TEXTS } from "@/constants/texts/entities.texts"
import { CAFETERIA_TEXTS } from "@/constants/texts/entities/cafeterias.texts"
import { NAV_TEXTS } from "@/constants/texts/nav.texts"
import { BreadcrumbConfig } from "@/types/navigation/breadcrumb.types"

/**
 * Segmento para a home.
 * Presente em todas as rotas, exceto na própria home.
 */
const HOME_SEGMENT = {
  label: NAV_TEXTS.mainPages.home,
  href: ROUTES.home,
}

/**
 * Segmentos frequentemente utilizados.
 */
const COMMON_SEGMENTS = {
  // Unidades
  units: [HOME_SEGMENT, { label: ENTITIES_TEXTS.unit.plural, href: ROUTES.units }],
  // Lanchonetes
  cafeterias: [HOME_SEGMENT, { label: ENTITIES_TEXTS.cafeteria.plural, href: ROUTES.cafeterias }],
}

/**
 * Lista de breadcrumbs para as rotas do aplicativo.
 */
export const BREADCRUMBS: BreadcrumbConfig[] = [
  // -- Home ---------------------------------------------------------------- //

  // / (root)
  { pattern: STATIC_ROUTE_PATTERNS.home, segments: [{ label: NAV_TEXTS.mainPages.home }] },

  // -- Unidades ------------------------------------------------------------ //

  // /unidades
  { pattern: STATIC_ROUTE_PATTERNS.units, segments: [HOME_SEGMENT, { label: ENTITIES_TEXTS.unit.plural }] },

  // -- Lanchonetes --------------------------------------------------------- //

  // /lanchonetes
  { pattern: STATIC_ROUTE_PATTERNS.cafeterias.main, segments: [HOME_SEGMENT, { label: ENTITIES_TEXTS.cafeteria.plural }] },

  // /lanchonetes/adicionar

  { pattern: STATIC_ROUTE_PATTERNS.cafeterias.add, segments: [...COMMON_SEGMENTS.cafeterias, { label: CAFETERIA_TEXTS.actions.add }] },

  // /lanchonetes/[id]
  {
    pattern: DYNAMIC_ROUTE_PATTERNS.cafeterias.details,
    segments: [
      ...COMMON_SEGMENTS.cafeterias,
      {
        label: "__CAFETERIA_NAME__", // Placeholder para nome da lanchonete
      },
    ],
  },

  // -- Usuários ------------------------------------------------------------ //
]
