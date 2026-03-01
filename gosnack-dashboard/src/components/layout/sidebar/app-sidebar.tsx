import NavUser from "@/components/layout/sidebar/nav-user/nav-user"
import Logo from "@/components/shared/logos/logo"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarSeparator } from "@/components/ui/sidebar"
import { APP_NAME, COLLEGE_NAME } from "@/constants/site"

/**
 * Sidebar do dashboard.
 */
export default function AppSidebar() {
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      {/* Header */}
      <AppSidebarHeader />

      {/* Nav Menu */}
      <SidebarContent></SidebarContent>

      <SidebarSeparator className="mx-0" />

      {/* Footer */}
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}

/**
 * Header do sidebar.
 */
function AppSidebarHeader() {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuButton size="lg">
          {/* Logo */}
          <Logo variation="favicon" className="size-8" />
          {/* Texto */}
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium text-sm">{APP_NAME}</span>
            <span className="truncate text-xs">{COLLEGE_NAME}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenu>
    </SidebarHeader>
  )
}
