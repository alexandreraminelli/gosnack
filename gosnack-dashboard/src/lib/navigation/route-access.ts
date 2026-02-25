import { ROUTES } from "@/constants/navigation/routes"

/**
 * Rotas públicas que não exigem autenticação.
 */
export const PUBLIC_ROUTES = new Set<string>([
  // Rotas de autenticação:
  ROUTES.login,
  ROUTES.forgotPassword,
])

/**
 * Verifica se a rota atual é pública (não requer autenticação).
 */
export function isPublicRoute(pathname: string) {
  for (const route of PUBLIC_ROUTES) {
    if (pathname.startsWith(route)) {
      return true
    }
  }
  return false
}

/**
 * Verifica se a rota atual é privada (requer autenticação).
 */
export function isAuthRequired(pathname: string) {
  return !isPublicRoute(pathname)
}
