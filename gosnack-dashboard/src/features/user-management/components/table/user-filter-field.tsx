import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import { ICONS } from "@/constants/icons"
import { USERS_TEXTS } from "@/constants/texts/entities/users.texts"
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react"

/**
 * Opções de filtragem de usuários (por nome ou e-mail).
 */
export type UserFilterType = "name" | "email"

/**
 * Props de `UserSearchBox`.
 */
interface UserSearchBoxProps {
  filterType: UserFilterType
  onFilterTypeChange: (type: UserFilterType) => void
  filterValue: string
  onFilterValueChange: (value: string) => void
}

/**
 * Filtro de usuários por nome ou e-mail.
 */
export default function UserSearchBox({ filterType, onFilterTypeChange, filterValue, onFilterValueChange }: UserSearchBoxProps) {
  /** Opções de filtro. */
  const filterOptions: Record<UserFilterType, { label: string; placeholder: string; icon: IconSvgElement }> = {
    name: {
      label: USERS_TEXTS.filter.name.label,
      placeholder: USERS_TEXTS.filter.name.placeholder,
      icon: ICONS.search.user,
    },
    email: {
      label: USERS_TEXTS.filter.email.label,
      placeholder: USERS_TEXTS.filter.email.placeholder,
      icon: ICONS.search.email,
    },
  }
  /** Array com opções de filtro. */
  const filterTypes = Object.keys(filterOptions) as UserFilterType[]

  /** Filtro selecionado. */
  const selectedFilter = filterOptions[filterType]

  return (
    <InputGroup>
      {/* Select tipo de pesquisa */}
      <InputGroupAddon>
        <DropdownMenu>
          {/* Label de pesquisa */}
          <DropdownMenuTrigger asChild>
            <InputGroupButton>
              <span>{selectedFilter.label}</span>
            </InputGroupButton>
          </DropdownMenuTrigger>

          {/* Opções de filtro */}
          <DropdownMenuContent className="w-fit">
            <DropdownMenuRadioGroup value={filterType} onValueChange={(value) => onFilterTypeChange(value as UserFilterType)}>
              {filterTypes.map((option) => (
                <DropdownMenuRadioItem key={option} value={option}>
                  {/* Ícone */}
                  <HugeiconsIcon icon={filterOptions[option].icon} />
                  {/* Label */}
                  <span>{filterOptions[option].label}</span>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </InputGroupAddon>

      {/* Field */}
      <InputGroupInput
        placeholder={selectedFilter.placeholder}
        // Atualizar state do valor do filtro
        value={filterValue}
        onChange={(event) => onFilterValueChange(event.target.value)}
      />

      {/* Ícone */}
      <InputGroupAddon align="inline-end">
        <HugeiconsIcon icon={ICONS.search.icon} />
      </InputGroupAddon>
    </InputGroup>
  )
}
