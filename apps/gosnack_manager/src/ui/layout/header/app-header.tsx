import { SidebarTrigger } from "@/ui/primitives/sidebar";
import { ModeToggle } from "@/ui/shared/buttons/mode-toggle";

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
          {/* TODO(Breadcrumb): Adicionar Breadcrumb */}
          {/* <HeaderBreadcrumb /> */}
        </div>

        {/* Botão de tema */}
        <ModeToggle size="icon-lg" />
      </div>
    </header>
  );
}
