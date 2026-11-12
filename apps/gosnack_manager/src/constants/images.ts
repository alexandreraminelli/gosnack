// Paths
const BACKGROUNDS_PATH = "/images/backgrounds";
const ILLUSTRATIONS_PATH = "/illustrations";
const LOGOS_PATH = "/logos";

/**
 * Paths de imagens estáticas em `public/`.
 */
export const IMAGES = {
  /* Backgrounds ------------------------------------------------------------ */
  backgrounds: {
    auth: `${BACKGROUNDS_PATH}/auth-bg.jpg`,
  },

  /* Illustrations ---------------------------------------------------------- */
  illustrations: {
    accessDenied: `${ILLUSTRATIONS_PATH}/access-denied.svg`,
    addUser: `${ILLUSTRATIONS_PATH}/add-user.svg`,
    cafeteria: `${ILLUSTRATIONS_PATH}/cafeteria.svg`,
    empty: `${ILLUSTRATIONS_PATH}/empty.svg`,
    notFound: `${ILLUSTRATIONS_PATH}/not-found.svg`,
    schoolUnit: `${ILLUSTRATIONS_PATH}/school-unit.svg`,
  },

  /* Logos ------------------------------------------------------------------ */
  logos: {
    icon: `${LOGOS_PATH}/logo-icon.svg`,
    inline: {
      white: `${LOGOS_PATH}/logo-inline-white.svg`,
      black: `${LOGOS_PATH}/logo-inline-black.svg`,
    },
    typemark: {
      white: `${LOGOS_PATH}/typemark-white.svg`,
      black: `${LOGOS_PATH}/typemark-black.svg`,
    },
  },
} as const;
