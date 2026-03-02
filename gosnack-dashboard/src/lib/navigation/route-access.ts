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
 * Normaliza o caminho da rota para garantir consistência na comparação, removendo barras finais, exceto para a raiz ("/").
 */
function normalizePath(path: string) {
  if (!path) return "/"
  return path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path
}

/**
 * Verifica se o caminho atual corresponde a uma rota específica, considerando sub-rotas.
 * Por exemplo, "/dashboard" corresponderá a "/dashboard" e "/dashboard/settings", mas não a "/dashboards".
 */
function matchesRoute(pathname: string, route: string) {
  const path = normalizePath(pathname)
  const base = normalizePath(route)
  return path === base || path.startsWith(`${base}/`)
}

/**
 * Verifica se a rota atual é pública (não requer autenticação).
 */
export function isPublicRoute(pathname: string) {
  return [...PUBLIC_ROUTES].some((route) => matchesRoute(pathname, route))
}

/**
 * Verifica se a rota atual é de autenticação (apenas para usuários não autenticados).
 */
export function isAuthRoute(pathname: string) {
  return [...AUTH_ROUTES].some((route) => matchesRoute(pathname, route))
}

/**
 * Verifica se a rota atual é privada (requer autenticação).
 */
export function isPrivateRoute(pathname: string) {
  return !isPublicRoute(pathname) && !isAuthRoute(pathname)
}
