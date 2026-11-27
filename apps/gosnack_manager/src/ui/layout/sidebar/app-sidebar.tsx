import AppSidebarHeader from "@/ui/layout/sidebar/app-sidebar-header";
import { Sidebar } from "@/ui/primitives/sidebar";

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
  );
}
