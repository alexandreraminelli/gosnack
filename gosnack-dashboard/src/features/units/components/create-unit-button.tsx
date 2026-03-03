import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ICONS } from "@/constants/icons"
import { UNITS_TEXTS } from "@/constants/texts/entities/units.texts"
import { UI_TEXTS } from "@/constants/texts/ui.texts"
import { HugeiconsIcon } from "@hugeicons/react"

/**
 * Botão de adicionar unidade.
 *
 * Abre um sheet com o formulário de criar unidade.
 */
export default function CreateUnitButton() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* Botão de adicionar unidade */}
        <Button>
          <HugeiconsIcon icon={ICONS.actions.create} />
          {UNITS_TEXTS.actions.add}
        </Button>
      </SheetTrigger>

      {/* Sheet */}
      <SheetContent>
        {/* Header */}
        <SheetHeader>
          <SheetTitle>{UNITS_TEXTS.actions.add}</SheetTitle>
        </SheetHeader>

        {/* Form */}
        <div className="px-4"></div>

        <SheetFooter>
          {/* Botão de salvar */}
          <Button type="submit">{UI_TEXTS.actions.save}</Button>

          {/* Botão de cancelar */}
          <SheetClose asChild>
            <Button variant="secondary">{UI_TEXTS.actions.cancel}</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
