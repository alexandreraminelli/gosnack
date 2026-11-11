import { ModeToggle } from "@/core/components/shared/buttons/mode-toggle";
import { Button } from "@/core/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-dvh w-dvw">
      <h1 className="text-3xl font-bold">GoSnack Manager</h1>

      <Button>Exemplo de botão</Button>

      <ModeToggle />
    </div>
  );
}
