import { ROUTES } from "@/constants/navigation/routes"
import { ENTITIES_TEXTS } from "@/constants/texts/entities/entities.texts"
import { UNITS_TEXTS } from "@/constants/texts/entities/units.texts"
import { NAV_TEXTS } from "@/constants/texts/nav.texts"
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

  unidades: {
    type: "static",
    label: ENTITIES_TEXTS.unit.plural,
    href: ROUTES.units.list,
  },

  lanchonetes: {
    type: "static",
    label: ENTITIES_TEXTS.cafeteria.plural,
    href: ROUTES.cafeterias.list,
  },

  adicionar: {
    type: "static",
    label: "Adicionar",
  },

  // TODO: Adicionar segmentos de "unidades" quando a feature for implementada
  // TODO: Adicionar segmentos de "produtos" quando a feature for implementada

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

  // TODO: Implementar quando a feature de cafeterias for criada
  // "[cafeteriaId]": {
  //   type: "dynamic",
  //   resolveLabel: async (cafeteriaId, context) => {
  //     const cafeteria = await getCafeteriaById(context.params.unitId, cafeteriaId)
  //     return cafeteria.name
  //   },
  // },
}
