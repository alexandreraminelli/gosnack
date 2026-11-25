import { ICONS } from "@/constants/icons";
import { InputGroup, InputGroupButton, InputGroupInput } from "@/core/components/ui/input-group";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslations } from "next-intl";
import { useState } from "react";

/**
 * Field de senha com funcionalidade de ocultar/exibir a senha.
 */
export default function PasswordInput({ className, ...props }: React.ComponentProps<"input">) {
  const texts = useTranslations("core.auth.fields.password");

  // Estado da visibilidade da senha
  const [isVisible, setIsVisible] = useState(false);

  /** Rótulo do botão. */
  const label = isVisible ? texts("hide") : texts("show");
  /** Ícone do botão. */
  const icon = isVisible ? ICONS.auth.password.show : ICONS.auth.password.hide;

  /**
   * Função para alternar a visibilidade da senha.
   */
  function handleToggleVisibility(event: React.MouseEvent<HTMLButtonElement>) {
    // Previne o comportamento padrão do botão
    event.preventDefault();

    // Evitar propagação do clique para elementos pai
    event.stopPropagation();

    // Alterna o estado de visibilidade
    setIsVisible(!isVisible);
  }

  return (
    <InputGroup className={className}>
      {/* Input de Texto */}
      <InputGroupInput
        type={isVisible ? "text" : "password"} // visibilidade
        {...props}
      />

      {/* Botão mostrar/ocultar senha */}
      <InputGroupButton type="button" onClick={handleToggleVisibility} aria-label={label}>
        <HugeiconsIcon icon={icon} />
        <span className="sr-only">{label}</span>
      </InputGroupButton>
    </InputGroup>
  );
}
