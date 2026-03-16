import { ROUTES } from "@/constants/navigation/routes"
import { CAFETERIA_TEXTS } from "@/constants/texts/entities/cafeterias.texts"
import { ENTITIES_TEXTS } from "@/constants/texts/entities/entities.texts"
import { UNITS_TEXTS } from "@/constants/texts/entities/units.texts"
import { NAV_TEXTS } from "@/constants/texts/nav.texts"
import { UI_TEXTS } from "@/constants/texts/ui.texts"
import { cafeteriaKeys } from "@/features/cafeterias/hooks/queries/cafeteria.keys"
import { cafeteriaService } from "@/features/cafeterias/services/cafeteria.service"
import { Cafeteria } from "@/features/cafeterias/types/cafeteria.types"
import { unitKeys } from "@/features/units/hooks/queries/unit.keys"
import { unitService } from "@/features/units/services/unit.service"
import { Unit } from "@/features/units/types/unit.types"
import { ResolvedSegment, SegmentConfig } from "@/types/navigation/breadcrumb.types"

/**
 * Segmento raiz, sempre presente e representando a página inicial.
 */
export const HOME_SEGMENT: ResolvedSegment = {
  label: NAV_TEXTS.mainPages.home,
  href: ROUTES.home,
}

/**
 * Mapa de configuração de breadcrumbs por segmento de rota.
 *
 * Chaves correspondem aos segmentos literais da URL.
 * Segmentos dinâmicos (ex: `[unitId]`) são identificados pelo prefixo `"["`.
 *
 * **Ordem de correspondência:** O hook percorre os segmentos do pathname em
 * sequência e consulta este map para cada um.
 */
export const BREADCRUMB_SEGMENT_MAP: Record<string, SegmentConfig> = {
  // -- Segmentos Estáticos ------------------------------------------------- //

  adicionar: {
    type: "static",
    label: UI_TEXTS.actions.add,
  },

  configuracoes: {
    type: "static",
    label: UI_TEXTS.actions.settings,
  },

  lanchonetes: {
    type: "static",
    label: ENTITIES_TEXTS.cafeteria.plural,
    href: ROUTES.cafeterias.list,
  },

  unidades: {
    type: "static",
    label: ENTITIES_TEXTS.unit.plural,
    href: ROUTES.units.list,
  },

  usuarios: {
    type: "static",
    label: ENTITIES_TEXTS.user.plural,
    href: ROUTES.users.list,
  },

  // -- Segmentos Dinâmicos ------------------------------------------------- //

  // Unidades
  "[unidades_id]": {
    type: "dynamic",
    queryKey: (id) => unitKeys.detail(id),
    queryFn: (id) => unitService.getById(id),
    resolveLabel: (unit) => (unit as Unit).name,
    notFoundLabel: UNITS_TEXTS.error.notFound.title,
    href: (unitId) => ROUTES.units.details(unitId),
  },

  // Lanchonetes
  "[lanchonetes_id]": {
    type: "dynamic",
    queryKey: (id) => cafeteriaKeys.detail(id),
    queryFn: (id) => cafeteriaService.getById(id),
    resolveLabel: (cafeteria) => (cafeteria as Cafeteria).name,
    notFoundLabel: CAFETERIA_TEXTS.error.notFound.title,
    href: (cafeteriaId) => ROUTES.cafeterias.details(cafeteriaId),
  },
}
