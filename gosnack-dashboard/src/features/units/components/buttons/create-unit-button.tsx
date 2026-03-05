"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ICONS } from "@/constants/icons"
import { UNITS_TEXTS } from "@/constants/texts/entities/units.texts"
import CreateUnitForm from "@/features/units/forms/create-unit-form"
import { HugeiconsIcon } from "@hugeicons/react"
import { useState } from "react"

/**
 * Botão de adicionar unidade.
 *
 * Abre um sheet com o formulário de criar unidade.
 */
export default function CreateUnitButton() {
  // Status do sheet
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
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
        <CreateUnitForm onSuccess={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}
