import { ICONS } from "@/constants/icons"
import { ROUTES } from "@/constants/navigation/routes"
import { ENTITIES_TEXTS } from "@/constants/texts/entities.texts"
import { NAV_TEXTS } from "@/constants/texts/nav.texts"
import { MenuGroup } from "@/types/navigation/sidebar-menu.types"

/**
 * Menu de navegação principal do sidebar.
 */
export const SIDEBAR_MENU: MenuGroup[] = [
  // Visão Geral
  {
    label: NAV_TEXTS.groups.overview,
    roles: ["admin", "manager", "employee"],
    items: [
      // Início
      { label: NAV_TEXTS.mainPages.home, href: ROUTES.home, icon: ICONS.pages.home, roles: ["admin", "manager", "employee"] },
    ],
  },

  // Unidades e lanchonetes
  {
    label: NAV_TEXTS.groups.unitsAndCafeterias,
    roles: ["admin"],
    items: [
      // Unidades
      { label: ENTITIES_TEXTS.unit.plural, href: ROUTES.units, icon: ICONS.entities.unit, roles: ["admin"] },
      // Lanchonetes
      { label: ENTITIES_TEXTS.cafeteria.plural, href: ROUTES.cafeterias, icon: ICONS.entities.cafeteria, roles: ["admin"] },
    ],
  },
]
