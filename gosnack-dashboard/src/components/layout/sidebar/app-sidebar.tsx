import Logo from "@/components/shared/logos/logo"
import { Sidebar, SidebarHeader, SidebarMenu, SidebarMenuButton } from "@/components/ui/sidebar"
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

      {/* Footer */}
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
