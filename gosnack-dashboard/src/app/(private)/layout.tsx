import AppHeader from "@/components/layout/app-header"
import AppSidebar from "@/components/layout/sidebar/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

/**
 * Layout das páginas privadas do dashboard.
 */
export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SidebarProvider className="flex flex-col">
        <div className="flex flex-1">
          {/* Sidebar */}
          <AppSidebar />

          <div className="flex flex-col flex-1">
            {/* Cabeçalho */}
            <AppHeader />

            {/* Conteúdo das páginas */}
            {children}
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}
