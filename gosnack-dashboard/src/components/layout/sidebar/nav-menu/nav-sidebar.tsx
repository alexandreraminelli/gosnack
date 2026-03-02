import NavSidebarClient from "@/components/layout/sidebar/nav-menu/nav-sidebar-client"
import { createClient } from "@/lib/supabase/server"
import { getUserRole } from "@/services/users"

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

  const role = user ? await getUserRole(user.id) : null

  return <NavSidebarClient role={role} />
}
