import AppSidebarHeader from "@/ui/layout/sidebar/app-sidebar-header";
import NavSidebar from "@/ui/layout/sidebar/nav-sidebar";
import NavUser from "@/ui/layout/sidebar/nav-user";
import { Sidebar, SidebarContent, SidebarSeparator, SidebarFooter } from "@/ui/primitives/sidebar";

/**
 * Sidebar do dashboard.
 */
export default function AppSidebar() {
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      {/* Header */}
      <AppSidebarHeader />

      {/* Nav Menu */}
      <SidebarContent>
        <NavSidebar />
      </SidebarContent>

      {/* Footer */}
      <SidebarSeparator className="mx-0" />
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
