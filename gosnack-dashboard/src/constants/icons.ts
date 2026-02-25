import {
  // Ícones do HugeIcons:
  ComputerIcon,
  Moon02Icon,
  Sun03Icon,
} from "@hugeicons/core-free-icons"

/**
 * Mapeamento dos ícones do HugeIcons para cada contexto de uso no site.
 */
export const ICONS = {
  theme: {
    light: Sun03Icon,
    dark: Moon02Icon,
    system: ComputerIcon,
  },
} as const
