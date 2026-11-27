import AppHeader from "@/ui/layout/header/app-header";
import AppSidebar from "@/ui/layout/sidebar/app-sidebar";
import { SidebarProvider } from "@/ui/primitives/sidebar";

/**
 * Layout das páginas privadas do sistema.
 */
export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SidebarProvider>
        <div className="flex flex-1">
          {/* Sidebar */}
          <AppSidebar />

          <div className="flex flex-col flex-1">
            {/* Header */}
            <AppHeader />

            {/* Conteúdo */}
            <div className="px-4 pt-3.5 pb-10">{children}</div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
