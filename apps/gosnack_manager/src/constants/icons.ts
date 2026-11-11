import {
  // Ícones do HugeIcons:
  Add01Icon,
  Alert02Icon,
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowTurnBackwardIcon,
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
  Location01Icon,
  LoginSquare01Icon,
  LogoutSquare01Icon,
  ManagerIcon,
  MenuRestaurantIcon,
  Moon02Icon,
  Restaurant02Icon,
  SchoolIcon,
  Settings01Icon,
  Share04Icon,
  Sun03Icon,
  TextIcon,
  Tick01Icon,
  Tick02Icon,
  UnavailableIcon,
  UserGroup03Icon,
  ViewIcon,
  ViewOffSlashIcon,
} from "@hugeicons/core-free-icons";

/**
 * Mapeamento dos ícones do HugeIcons para cada contexto de uso no site.
 */
export const ICONS = {
  /* Actions ---------------------------------------------------------------- */
  actions: {
    create: Add01Icon,
    delete: Delete02Icon,
    edit: Edit04Icon,

    moreDetails: InformationCircleIcon,
    openPage: Share04Icon,
    settings: Settings01Icon,
  },

  /* Attributes ------------------------------------------------------------- */
  attributes: {
    id: HashtagIcon,
    location: Location01Icon,
    name: TextIcon,
  },

  /* Arrows ----------------------------------------------------------------- */
  arrow: {
    up: ArrowUp01Icon,
    down: ArrowDown01Icon,
    left: ArrowLeft01Icon,
    right: ArrowRight01Icon,

    back: ArrowTurnBackwardIcon,
  },

  /* Auth ------------------------------------------------------------------- */
  auth: {
    login: LoginSquare01Icon,
    logout: LogoutSquare01Icon,

    password: {
      show: ViewIcon,
      hide: ViewOffSlashIcon,
    },
  },

  /* Entities --------------------------------------------------------------- */
  entities: {
    cafeteria: Restaurant02Icon,
    menu: MenuRestaurantIcon,
    unit: SchoolIcon,
  },

  /* Feedback --------------------------------------------------------------- */
  feedback: {
    loading: Loading03Icon,
    success: Tick02Icon,
    error: Cancel01Icon,
    warning: Alert02Icon,
  },

  /* Pages ------------------------------------------------------------------ */
  pages: {
    home: Home09Icon,
  },

  /* Theme ------------------------------------------------------------------ */
  theme: {
    light: Sun03Icon,
    dark: Moon02Icon,
    system: ComputerIcon,
  },

  /* Time ------------------------------------------------------------------- */
  time: {
    calendar: Calendar03Icon,
    clock: Clock01Icon,
  },

  /* Status ----------------------------------------------------------------- */
  status: {
    enable: Tick01Icon,
    disable: UnavailableIcon,
  },

  /* Users ------------------------------------------------------------------ */
  users: {
    all: UserGroup03Icon,

    roles: {
      manager: ManagerIcon,
      employee: ChefIcon,
    },
  },
} as const;
