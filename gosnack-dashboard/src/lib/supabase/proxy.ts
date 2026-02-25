/*
 * Proxy para atualizar tokens Auth expirados e armazená-los.
 */

import { ROUTES } from "@/constants/navigation/routes"
import env from "@/lib/env"
import { isAuthRequired } from "@/lib/navigation/route-access"
import { createServerClient } from "@supabase/ssr"
import { NextRequest, NextResponse } from "next/server"

/**
 * Proxy para atualizar tokens de autenticação expirados do Supabase e
 * armazená-los nos cookies da requisição e resposta.
 * @param request
 */
export async function updateSession(request: NextRequest): Promise<NextResponse> {
  //
  let supabaseResponse = NextResponse.next({
    request,
  })

  // Cria um cliente do Supabase para lidar com a autenticação e atualização de tokens.
  const supabase = createServerClient(env.supabase.url, env.supabase.publishableKey, {
    cookies: {
      getAll() {
        // Obtém os cookies da requisição para autenticação do Supabase.
        return request.cookies.getAll()
      },

      setAll(cookiesToSet) {
        // Atualiza os cookies da requisição e da resposta com os novos tokens do Supabase.
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        // Cria uma nova resposta para garantir que os cookies atualizados sejam enviados ao cliente.
        supabaseResponse = NextResponse.next({ request })
        // Define os cookies na resposta para que sejam enviados ao cliente.
        cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
      },
    },
  })

  /*
   ! Não execute código entre createServerClient e getClaims()
   !
   ! Isso pode causar problemas de sincronização de sessão, pois o cliente 
   ! do Supabase pode tentar atualizar a sessão antes de obter os dados de 
   ! autenticação, resultando em um loop infinito de atualizações de sessão. 
   ! Certifique-se de que o código relacionado à obtenção de dados de 
   ! autenticação seja executado após a criação do cliente do Supabase para 
   ! evitar esse problema.
   */

  // Verifica se o token de acesso do Supabase expirou e, se necessário, atualiza a sessão.
  const { data } = await supabase.auth.getClaims()

  // Se os dados de autenticação estiverem disponíveis, armazena as informações do usuário.
  const user = data?.claims

  if (!user && isAuthRequired(request.nextUrl.pathname)) {
    // Se o usuário não estiver autenticado e a rota exigir autenticação
    const url = request.nextUrl.clone()
    url.pathname = ROUTES.login
    return NextResponse.redirect(url)
  }
  // Retorna a resposta com os cookies atualizados, se necessário.
  return supabaseResponse
}
