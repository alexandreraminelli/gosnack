import { SidebarIcon } from "@/ui/layout/sidebar/sidebar-menu.types";
import { UserRole } from "../../domains/auth/types/user-role";

/**
 * Configuração de um item do menu lateral.
 */
export type MenuItemConfig = {
  /** Chave de tradução do nome do item. Relativa ao namespace ("core"). */
  labelKey: string;
  /** Destino do item. */
  href: string;
  /** Ícone do item. */
  icon: SidebarIcon;

  /** Papéis que enxergam o item. Se omitido, herda os do grupo. */
  roles?: ReadonlySet<UserRole>;
};

/**
 * Configuração de um grupo de itens do menu lateral.
 */
export type MenuGroupConfig = {
  /** Chave de tradução do nome do grupo. Relativa ao namespace ("core"). */
  labelKey: string;
  /** Papéis que enxergam o grupo. */
  roles: ReadonlySet<UserRole>;
  /** Itens do grupo. */
  items: MenuItemConfig[];
};
