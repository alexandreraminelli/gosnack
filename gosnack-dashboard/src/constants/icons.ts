import {
  // Ícones do HugeIcons:
  Add01Icon,
  Alert02Icon,
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowLeftDoubleIcon,
  ArrowRight01Icon,
  ArrowRightDoubleIcon,
  ArrowTurnBackwardIcon,
  ArrowUp01Icon,
  Calendar03Icon,
  Cancel01Icon,
  ChefIcon,
  Clock01Icon,
  ComputerIcon,
  Delete02Icon,
  Edit04Icon,
  EditUser02Icon,
  HashtagIcon,
  Home09Icon,
  InformationCircleIcon,
  Loading03Icon,
  Location01Icon,
  LockPasswordIcon,
  LoginSquare01Icon,
  LogoutSquare01Icon,
  MailSearch01Icon,
  ManagerIcon,
  MenuRestaurantIcon,
  Moon02Icon,
  MoreHorizontalIcon,
  MoreVerticalIcon,
  Restaurant02Icon,
  SchoolIcon,
  Search02Icon,
  Settings01Icon,
  Share04Icon,
  SortByDown02Icon,
  SortByUp02Icon,
  Sun03Icon,
  TextIcon,
  Tick01Icon,
  Tick02Icon,
  UnavailableIcon,
  UserAdd02Icon,
  UserBlock02Icon,
  UserCheck02Icon,
  UserGroup03Icon,
  UserSearch02Icon,
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

    cancel: Cancel01Icon,
    loading: Loading03Icon,

    more: {
      horizontal: MoreHorizontalIcon,
      vertical: MoreVerticalIcon,
    },

    moreDetails: InformationCircleIcon,
    openPage: Share04Icon,
    settings: Settings01Icon,
  },

  arrow: {
    up: ArrowUp01Icon,
    down: ArrowDown01Icon,
    left: ArrowLeft01Icon,
    right: ArrowRight01Icon,

    doubleLeft: ArrowLeftDoubleIcon,
    doubleRight: ArrowRightDoubleIcon,

    back: ArrowTurnBackwardIcon,
  },

  attributes: {
    location: Location01Icon,
    name: TextIcon,
  },

  auth: {
    login: LoginSquare01Icon,
    logout: LogoutSquare01Icon,

    password: {
      icon: LockPasswordIcon,

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

  search: {
    icon: Search02Icon,
    user: UserSearch02Icon,
    email: MailSearch01Icon,
  },

  sorting: {
    asc: SortByUp02Icon,
    desc: SortByDown02Icon,
  },

  status: {
    enable: Tick01Icon,
    disable: UnavailableIcon,
  },

  users: {
    all: UserGroup03Icon,

    actions: {
      create: UserAdd02Icon,
      edit: EditUser02Icon,

      disable: UserBlock02Icon,
      enable: UserCheck02Icon,
    },

    roles: {
      manager: ManagerIcon,
      employee: ChefIcon,
    },
  },
} as const
