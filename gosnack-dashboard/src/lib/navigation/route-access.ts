import { ROUTES } from "@/constants/navigation/routes"

/**
 * Rotas públicas que não exigem autenticação.
 */
export const PUBLIC_ROUTES = new Set<string>([
  // Rotas públicas:
])

/**
 * Rotas de autenticação apenas para usuários não autenticados.
 */
export const AUTH_ROUTES = new Set<string>([
  // Rotas de autenticação:
  ROUTES.login,
  ROUTES.forgotPassword,
])

/**
 * Verifica se a rota atual é pública (não requer autenticação).
 */
export function isPublicRoute(pathname: string) {
  return [...PUBLIC_ROUTES].some((route) => pathname.startsWith(route))
}

/**
 * Verifica se a rota atual é de autenticação (apenas para usuários não autenticados).
 */
export function isAuthRoute(pathname: string) {
  return [...AUTH_ROUTES].some((route) => pathname.startsWith(route))
}

/**
 * Verifica se a rota atual é privada (requer autenticação).
 */
export function isPrivateRoute(pathname: string) {
  return !isPublicRoute(pathname) && !isAuthRoute(pathname)
}
