import { type NextRequest } from "next/server";

import { updateSession } from "@/core/lib/supabase/middleware";

/**
 * Proxy que atualiza a sessão do usuário com base no request recebido.
 *
 * Se o usuário não estiver autenticado e tentar acessar uma rota protegida, ele será redirecionado para a página de login.
 */
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

/**
 * Configuração do proxy para Next.js.
 */
export const config = {
  /**
   * Matcher que define quais rotas o proxy deve ser aplicado.
   */
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
