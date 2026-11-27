import { ROUTES } from "@/core/constants/navigation/routes";
import { MenuGroupConfig } from "./navigation.types";
import { ICONS } from "@/core/constants/icons";

/**
 * Menu de navegação principal do sidebar.
 */
export const SIDEBAR_MENU: MenuGroupConfig[] = [
  /* Visão Geral ------------------------------------------------------------ */
  {
    labelKey: "navigation.groups.overview",
    roles: new Set(["admin", "manager", "employee"]),
    items: [
      // Início
      { labelKey: "navigation.mainPages.home", href: ROUTES.home, icon: ICONS.pages.home },
    ],
  },

  /* Unidades E Lanchonetes ------------------------------------------------- */
  {
    labelKey: "navigation.groups.unitsAndCafeterias",
    roles: new Set(["admin"]),
    items: [
      // Unidades
      { labelKey: "entities.unit.plural", href: ROUTES.units.list, icon: ICONS.entities.unit },
      // Lanchonetes
      { labelKey: "entities.cafeteria.plural", href: ROUTES.cafeterias.list, icon: ICONS.entities.cafeteria },
    ],
  },

  /* Lanchonete (gerentes) -------------------------------------------------- */
  {
    labelKey: "entities.cafeteria.singular",
    roles: new Set(["manager"]),
    items: [
      // TODO: Gerenciar Lanchonete
      // TODO: Gerenciar Funcionários
    ],
  },

  /* Pedidos ---------------------------------------------------------------- */
  {
    labelKey: "entities.order.singular",
    roles: new Set(["admin", "manager", "employee"]),
    items: [
      // TODO: Pedidos Ativos
      // TODO: Histórico de Pedidos
      // TODO: Fila de Preparo
    ],
  },

  /* Cardápio --------------------------------------------------------------- */
  {
    labelKey: "entities.menu",
    roles: new Set(["admin", "manager"]),
    items: [
      // TODO: Produtos
      // TODO: Categorias
      // TODO: Estoque
    ],
  },

  /* Usuários --------------------------------------------------------------- */
  {
    labelKey: "navigation.groups.usersAndAccess",
    roles: new Set(["admin"]),
    items: [
      // TODO: Usuários
      // TODO: Permissões
    ],
  },
];
