import { SidebarHeader, SidebarMenu, SidebarMenuButton } from "@/ui/primitives/sidebar";
import Logo from "@/ui/shared/logo";

/**
 * Cabeçalho do sidebar.
 */
export default function AppSidebarHeader() {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuButton size="lg" className="items-center">
          {/* Logo */}
          <Logo variation="icon" className="size-9" />
          {/* Texto */}
          <Logo variation="typemark" className="h-8" />
        </SidebarMenuButton>
      </SidebarMenu>
    </SidebarHeader>
  );
}
