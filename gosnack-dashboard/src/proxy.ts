import { NextRequest } from "next/server"
import { updateSession } from "@/lib/supabase/proxy"

/**
 * Proxy executado antes de cada requisição.
 *
 * @param request A requisição recebida pelo servidor.
 */
export async function proxy(request: NextRequest) {
  return await updateSession(request)
}

/**
 * Configurações do proxy.
 */
export const config = {
  /**
   * Caminhos para os quais o proxy deve ser aplicado.
   *
   * Corresponde todas as rotas, exceto:
   * - _next/static (arquivos estáticos)
   * - _next/image (arquivos de otimização de imagem)
   * - favicon.ico (arquivo de favicon)
   * - .svg, .png, .jpg, .jpeg, .gif, .webp (arquivos de imagens)
   */
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
