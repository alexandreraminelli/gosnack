const BACKGROUNDS_PATH = "/images/backgrounds"
const ILLUSTRATIONS_PATH = "/images/illustrations"
const LOGOS_PATH = "/logos"

/**
 * Paths de imagens estáticas em `public/` e textos alternativos.
 */
export const IMAGES = {
  backgrounds: {
    login: `${BACKGROUNDS_PATH}/login-bg.jpg`,
  },

  illustrations: {
    accessDenied: `${ILLUSTRATIONS_PATH}/access-denied.svg`,
    addUser: `${ILLUSTRATIONS_PATH}/add-user.svg`,
    cafeteria: `${ILLUSTRATIONS_PATH}/cafeteria.svg`,
    empty: `${ILLUSTRATIONS_PATH}/empty.svg`,
    notFound: `${ILLUSTRATIONS_PATH}/not-found.svg`,
    schoolUnit: `${ILLUSTRATIONS_PATH}/school-unit.svg`,
  },

  logos: {
    favicon: `${LOGOS_PATH}/favicon.svg`,
    full: {
      white: `${LOGOS_PATH}/logo-white.svg`,
      black: `${LOGOS_PATH}/logo-black.svg`,
    },
    branding: {
      white: `${LOGOS_PATH}/branding-white.svg`,
      black: `${LOGOS_PATH}/branding-black.svg`,
    },
  },
} as const
