import { SidebarMenuGroup } from "@/ui/layout/sidebar/sidebar-menu.types";
import { UserRole } from "../../domains/auth/types/user-role";
import { SIDEBAR_MENU } from "../navigation/sidebar-menu.config";

/**
 * Monta o menu da sidebar para o papel, filtrando grupos e itens.
 *
 * Traduz os rótulos dos grupos e itens.
 *
 * @param role Papel do usuário logado.
 * @param translate Função de tradução.
 */
export function getSidebarMenu(role: UserRole, translate: (key: string) => string): SidebarMenuGroup[] {
  return (
    SIDEBAR_MENU
      // Filtrar grupos
      .filter((group) => group.roles.has(role))
      // Filtrar itens de cada grupo
      .map((group) => ({
        label: translate(group.labelKey),
        items: group.items
          // Filtrar itens por papel
          .filter((item) => !item.roles || item.roles.has(role))
          // Traduzir rótulos dos itens
          .map((item) => ({ label: translate(item.labelKey), href: item.href, icon: item.icon })),
      }))
      // Filtrar grupos vazios
      .filter((group) => group.items.length > 0)
  );
}
