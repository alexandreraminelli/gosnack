import NavUserClient from "@/components/layout/sidebar/nav-user/nav-user-client"
import NavUserSkeleton from "@/components/layout/sidebar/nav-user/nav-user-skeleton"
import { createClient } from "@/lib/supabase/server"
import { getUserDisplayName } from "@/services/users"

/**
 * Componente de navegação de opções do usuário no sidebar.
 */
export default async function NavUser() {
  const supabase = await createClient()
  // Obter usuário logado
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return <NavUserSkeleton />

  // Obter dados do perfil do usuário
  const profile = await getUserDisplayName(user.id)
  if (!profile) return <NavUserSkeleton />

  return <NavUserClient user={{ firstName: profile.firstName, lastName: profile.lastName, email: user.email, avatarUrl: user.user_metadata.avatar_url }} />
}
