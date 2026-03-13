"server-only"

import env from "@/lib/env"
import { createClient } from "@supabase/supabase-js"

/**
 * Cliente do Supabase para acessar a API de administração, utilizando a chave de função de serviço (service role key) para autenticação.
 *
 * @see https://supabase.com/docs/reference/javascript/admin-api
 */
const adminClient = createClient(env.supabase.url, env.supabase.serviceRoleKey, {
  auth: {
    autoRefreshToken: false, // Desativa o auto refresh de tokens, pois a chave de função de serviço não expira.
    persistSession: false, // Não persiste a sessão, já que a autenticação é feita via chave de função de serviço.
  },
})

/**
 * Cliente Supabase com permissão de service role.
 * Use apenas em Server Actions.
 */
export const adminSupabase = adminClient

/**
 * Cliente de autenticação para operações administrativas
 * (criar, deletar, listar usuários).
 */
export const adminAuthClient = adminClient.auth.admin
