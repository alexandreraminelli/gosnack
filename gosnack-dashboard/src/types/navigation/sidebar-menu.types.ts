import { UserRole } from "@/features/authentication/shared/types/user.types"
import { IconSvgElement } from "@hugeicons/react"

/**
 * Tipagem de grupos do menu de navegação.
 */
export interface MenuGroup {
  /** Nome do grupo. */
  label: string
  /** Items do grupo. */
  items: MenuItem[]
  /** Para quais roles o grupo será exibido. */
  roles: UserRole[]
}

/**
 * Tipagem de itens do menu de navegação.
 */
export interface MenuItem {
  /** Nome do item. */
  label: string
  /** Rota do item. */
  href: string
  /** Ícone do item. */
  icon?: IconSvgElement
  /** Para quais roles o grupo será exibido. */
  roles: UserRole[]

  /** Sub-itens aninhados (dropdown menus). */
  items?: Pick<MenuItem, "label" | "href">[]
}
