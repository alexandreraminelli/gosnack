import AppHeader from "@/components/layout/header/app-header"
import AppSidebar from "@/components/layout/sidebar/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

/**
 * Layout das páginas privadas do dashboard.
 */
export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SidebarProvider className="flex flex-col">
        <div className="flex flex-1 min-w-0">
          {/* Sidebar */}
          <AppSidebar />

          <div className="flex flex-col flex-1 min-w-0">
            {/* Cabeçalho */}
            <AppHeader />

            {/* Conteúdo das páginas */}
            <div className="px-4 pt-3.5 pb-10">{children}</div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}
