import { IconSvgElement } from "@hugeicons/react";

/**
 * Tipagem dos ícones do menu lateral.
 */
export type SidebarIcon = IconSvgElement;

/**
 * Tipagem de um item do menu lateral.
 */
export interface SidebarMenuItem {
  /** Nome do item. */
  label: string;
  /** Destino do item. */
  href: string;
  /** Ícone do item. */
  icon: SidebarIcon;
}

/**
 * Tipagem de um grupo de itens do menu lateral.
 */
export interface SidebarMenuGroup {
  /** Nome do grupo. */
  label: string;
  /** Itens do grupo. */
  items: SidebarMenuItem[];
}
