import { InputGroup, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import { ICONS } from "@/constants/icons"
import { UI_TEXTS } from "@/constants/texts/ui.texts"
import { HugeiconsIcon } from "@hugeicons/react"
import { useState } from "react"

/**
 * Props de `PasswordInput`.
 */
type Props = React.ComponentProps<"input">

/**
 * Campo de senha com botão de mostrar/ocultar senha.
 */
export default function PasswordInput({ className, ...props }: Props) {
  /**
   * Estado da visibilidade da senha.
   */
  const [isVisible, setIsVisible] = useState(false)

  /** Rótulo do botão. */
  const label = isVisible ? UI_TEXTS.password.hide : UI_TEXTS.password.show
  /** Ícone do botão. */
  const icon = isVisible ? ICONS.auth.password.show : ICONS.auth.password.hide

  /**
   * Função para alternar a visibilidade da senha.
   */
  const handleToggleVisibility = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Prevenir comportamento padrão (submissão de form)
    event.preventDefault()
    // Evitar propagação do clique para elementos pai
    event.stopPropagation()
    // Alternar o estado de visibilidade
    setIsVisible(!isVisible)
  }

  return (
    <InputGroup className={className}>
      {/* Input principal */}
      <InputGroupInput
        type={isVisible ? "text" : "password"} // visibilidade
        {...props}
      />

      {/* Botão de mostrar/ocultar */}
      <InputGroupButton type="button" size="sm" onClick={handleToggleVisibility} aria-label={label}>
        <HugeiconsIcon icon={icon} />
        <span className="sr-only">{label}</span>
      </InputGroupButton>
    </InputGroup>
  )
}
