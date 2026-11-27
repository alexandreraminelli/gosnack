import AppSidebarHeader from "@/ui/layout/sidebar/app-sidebar-header";
import NavSidebar from "@/ui/layout/sidebar/nav-sidebar";
import NavSidebarSkeleton from "@/ui/layout/sidebar/nav-sidebar-skeleton";
import NavUser from "@/ui/layout/sidebar/nav-user";
import { Sidebar, SidebarContent, SidebarSeparator, SidebarFooter } from "@/ui/primitives/sidebar";
import { Suspense } from "react";

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
        <Suspense fallback={<NavSidebarSkeleton />}>
          <NavSidebar />
        </Suspense>
      </SidebarContent>

      {/* Footer */}
      <SidebarSeparator className="mx-0" />
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
