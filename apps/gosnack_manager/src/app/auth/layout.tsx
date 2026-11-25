import { IMAGES } from "@/constants/images";
import { ModeToggle } from "@/core/components/shared/buttons/mode-toggle";
import Logo from "@/core/components/shared/logo";
import { Card } from "@/core/components/ui/card";
import Image from "next/image";

/**
 * Layout das páginas de autenticação.
 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-muted min-h-svh flex flex-col items-center justify-center p-6 md:p-10 gap-4">
      {/* Header ----------------------------------------------------------- */}
      <header className="flex flex-row items-center gap-8">
        <Logo variation="inline" />
        <ModeToggle />
      </header>

      {/* Card Central ----------------------------------------------------- */}
      <div className="w-full max-w-sm md:max-w-4xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0 md:grid-cols-2 h-full">
            <div className="grid p-0 md:grid-cols-2 h-full">
              {/* Página --------------------------------------------------- */}
              <div className="p-6 md:p-8">{children}</div>

              {/* Imagem --------------------------------------------------- */}
              <aside className="bg-muted relative max-md:hidden min-h-96">
                <Image src={IMAGES.backgrounds.auth} alt="" fill className="object-cover" />
              </aside>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
