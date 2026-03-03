import HeaderBreadcrumb from "@/components/layout/header/header-breadcrumb"
import { ModeToggle } from "@/components/shared/buttons/mode-toggle"
import { SidebarTrigger } from "@/components/ui/sidebar"

/**
 * Cabeçalho do aplicativo, exibido em todas as páginas.
 */
export default function AppHeader() {
  return (
    <header className="bg-background/75 backdrop-blur sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex w-full items-center gap-2 px-4 h-16">
        {/* Botão de exibir/ocultar sidebar */}
        <SidebarTrigger size="icon-lg" variant="outline" />

        {/* Breadcrumb */}
        <div className="w-full flex items-center justify-start mx-4">
          <HeaderBreadcrumb />
        </div>

        {/* Botão de tema */}
        <ModeToggle size="icon-lg" />
      </div>
    </header>
  )
}
