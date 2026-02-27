import {
  // Ícones do HugeIcons:
  ComputerIcon,
  Loading03Icon,
  LoginSquare01Icon,
  LogoutSquare01Icon,
  Moon02Icon,
  Sun03Icon,
  ViewIcon,
  ViewOffSlashIcon,
} from "@hugeicons/core-free-icons"

/**
 * Mapeamento dos ícones do HugeIcons para cada contexto de uso no site.
 */
export const ICONS = {
  auth: {
    login: LoginSquare01Icon,
    logout: LogoutSquare01Icon,

    password: {
      show: ViewIcon,
      hide: ViewOffSlashIcon,
    },
  },

  loading: Loading03Icon,

  theme: {
    light: Sun03Icon,
    dark: Moon02Icon,
    system: ComputerIcon,
  },
} as const
