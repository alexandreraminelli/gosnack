import NavSidebarClient from "@/components/layout/sidebar/nav-menu/nav-sidebar-client"
import { profileService } from "@/features/authentication/shared/services/profile.service"
import { createClient } from "@/lib/supabase/server"

/**
 * Menu de navegação do sidebar.
 *
 * Server Component: busca o role do usuário e passa para o client.
 */
export default async function NavSidebar() {
  // Obter role do usuário
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const profile = user ? await profileService.getProfile(user.id) : null

  return <NavSidebarClient role={profile?.role ?? null} />
}
