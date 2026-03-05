import {
  // Ícones do HugeIcons:
  Add01Icon,
  Alert02Icon,
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowUp01Icon,
  Calendar03Icon,
  Cancel01Icon,
  ChefIcon,
  Clock01Icon,
  ComputerIcon,
  Delete02Icon,
  Edit04Icon,
  HashtagIcon,
  Home09Icon,
  InformationCircleIcon,
  Loading03Icon,
  LoginSquare01Icon,
  LogoutSquare01Icon,
  ManagerIcon,
  MenuRestaurantIcon,
  Moon02Icon,
  Restaurant02Icon,
  SchoolIcon,
  Share04Icon,
  Sun03Icon,
  Tick01Icon,
  Tick02Icon,
  UnavailableIcon,
  UserGroup03Icon,
  ViewIcon,
  ViewOffSlashIcon,
} from "@hugeicons/core-free-icons"

/**
 * Mapeamento dos ícones do HugeIcons para cada contexto de uso no site.
 */
export const ICONS = {
  actions: {
    create: Add01Icon,
    delete: Delete02Icon,
    edit: Edit04Icon,

    loading: Loading03Icon,

    moreDetails: InformationCircleIcon,
    openPage: Share04Icon,
  },

  arrow: {
    up: ArrowUp01Icon,
    down: ArrowDown01Icon,
    left: ArrowLeft01Icon,
    right: ArrowRight01Icon,
  },

  auth: {
    login: LoginSquare01Icon,
    logout: LogoutSquare01Icon,

    password: {
      show: ViewIcon,
      hide: ViewOffSlashIcon,
    },
  },

  entities: {
    cafeteria: Restaurant02Icon,
    unit: SchoolIcon,

    menu: MenuRestaurantIcon,
  },

  feedback: {
    success: Tick02Icon,
    error: Cancel01Icon,
    warning: Alert02Icon,
  },

  loading: Loading03Icon,

  id: HashtagIcon,

  pages: {
    home: Home09Icon,
  },

  theme: {
    light: Sun03Icon,
    dark: Moon02Icon,
    system: ComputerIcon,
  },

  time: {
    calendar: Calendar03Icon,
    clock: Clock01Icon,
  },

  status: {
    enable: Tick01Icon,
    disable: UnavailableIcon,
  },

  users: {
    all: UserGroup03Icon,

    roles: {
      manager: ManagerIcon,
      employee: ChefIcon,
    },
  },
} as const
