import { ModeToggle } from "@/components/shared/buttons/mode-toggle"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

/**
 * Cabeçalho do aplicativo, exibido em todas as páginas.
 */
export default function AppHeader() {
  return (
    <header className="bg-background/75 backdrop-blur sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex w-full items-center gap-2 px-4 h-16">
        {/* Botão de exibir/ocultar sidebar */}
        <SidebarTrigger size="icon" variant="ghost" />

        <Separator orientation="vertical" className="mx-2" />

        {/* Breadcrumb */}
        <div className="w-full">{/* TODO: Header Breadcrumb */}</div>

        {/* Botão de tema */}
        <ModeToggle />
      </div>
    </header>
  )
}
