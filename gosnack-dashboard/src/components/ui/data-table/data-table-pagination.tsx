import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ICONS } from "@/constants/icons"
import { PAGINATION_TEXTS } from "@/constants/texts/pagination.texts"
import { UI_TEXTS } from "@/constants/texts/ui.texts"
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react"
import { type Table } from "@tanstack/react-table"
import { MouseEventHandler } from "react"

/**
 * Props de `DataTablePagination`.
 */
interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

/**
 * Controle de paginação para a Data Table.
 */
export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  return (
    <footer className="flex *:flex-1 flex-col md:flex-row flex-wrap gap-3.5 items-center">
      {/* Quantidade de rows selecionadas */}
      <SelectedRowCount table={table} />

      {/* Controladores */}
      <div className="flex flex-row max-sm:flex-wrap gap-3.5 items-center justify-center">
        {/* Configurar quantidade de linhas por página */}
        <PageSizeSelect table={table} />

        {/* Controlador de paginação */}
        <PaginationControls table={table} />
      </div>
    </footer>
  )
}

/**
 * Controlador de paginação com a página atual e o botão de avançar/voltar.
 */
function PaginationControls<TData>({ table }: DataTablePaginationProps<TData>) {
  const currentPage = table.getState().pagination.pageIndex + 1
  const totalPageCount = table.getPageCount()

  return (
    <ButtonGroup orientation="horizontal">
      {/* Botão de ir pra primeira página */}
      <PaginationButton table={table} direction="first" />

      {/* Botão de voltar */}
      <PaginationButton table={table} direction="previous" />

      {/* Índice da página atual */}
      <span className="bg-background dark:border-input dark:bg-input/30 flex items-center border px-3 text-sm font-medium truncate">{PAGINATION_TEXTS.currentPage(currentPage, totalPageCount)}</span>

      {/* Botão de avançar */}
      <PaginationButton table={table} direction="next" />

      {/* Botão de ir pra última página */}
      <PaginationButton table={table} direction="last" />
    </ButtonGroup>
  )
}

/**
 * Botões para avançar e voltar páginas.
 */
function PaginationButton<TData>({ table, direction }: DataTablePaginationProps<TData> & { direction: "previous" | "next" | "first" | "last" }) {
  const currentPage = table.getState().pagination.pageIndex + 1

  type DirectionConfig = {
    icon: IconSvgElement
    label: string
    canNavigate: boolean
    onClick: MouseEventHandler<HTMLButtonElement>
  }

  // Objeto com mapeamento das opções dos botões
  const directionConfig: Record<typeof direction, DirectionConfig> = {
    // Anterior
    previous: {
      icon: ICONS.arrow.left,
      label: UI_TEXTS.navigation.previous,
      canNavigate: table.getCanPreviousPage(),
      onClick: () => table.previousPage(),
    },
    // Próximo
    next: {
      icon: ICONS.arrow.right,
      label: UI_TEXTS.navigation.next,
      canNavigate: table.getCanNextPage(),
      onClick: () => table.nextPage(),
    },
    // Primeira página
    first: {
      icon: ICONS.arrow.doubleLeft,
      label: UI_TEXTS.navigation.first,
      canNavigate: !(currentPage === 1),
      onClick: () => table.firstPage(),
    },
    // Última página
    last: {
      icon: ICONS.arrow.doubleRight,
      label: UI_TEXTS.navigation.last,
      canNavigate: !(currentPage === table.getPageCount()),
      onClick: () => table.lastPage(),
    },
  }

  const config = directionConfig[direction]

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon-sm"
          onClick={config.onClick} // Chamar função do TanStack Table
          disabled={!config.canNavigate} // Desabilitar se não puder executar navegação
        >
          <HugeiconsIcon icon={config.icon} /> {/* Seta */}
        </Button>
      </TooltipTrigger>
      {/* Label */}
      <TooltipContent>{config.label}</TooltipContent>
    </Tooltip>
  )
}

/**
 * Quantidade de linhas selecionadas.
 */
function SelectedRowCount<TData>({ table }: DataTablePaginationProps<TData>) {
  /** Quantidade de linhas selecionadas. */
  const selectedRowCount = table.getFilteredSelectedRowModel().rows.length
  /** Quantidades de linhas no total. */
  const totalRowCount = table.getFilteredRowModel().rows.length

  return <div className="w-fit min-w-40 truncate text-sm text-muted-foreground text-center sm:text-start">{PAGINATION_TEXTS.selectedRowCount(selectedRowCount, totalRowCount)}</div>
}

/**
 * Configuração de quantidade de linhas por página.
 */
function PageSizeSelect<TData>({ table }: DataTablePaginationProps<TData>) {
  /** Configuração atual de quantidade de linhas. */
  const actualPageSize = table.getState().pagination.pageSize
  /** Opções de quantidade de linhas. */
  const pageSizeOptions = [10, 20, 30, 40, 50]

  return (
    <div className="flex items-center space-x-2">
      {/* Label */}
      <p className="text-sm font-medium truncate">{PAGINATION_TEXTS.rowsPerPage.label}</p>

      {/* Select de quantidades de linhas por página */}
      <Select
        value={actualPageSize.toString()} // config atual
        onValueChange={(value) => {
          table.setPageSize(Number(value)) // aplicar config
        }}
      >
        {/* Configuração atual de linhas por página */}
        <SelectTrigger>
          <SelectValue placeholder={actualPageSize} />
        </SelectTrigger>
        {/* Opções */}
        <SelectContent side="top">
          {pageSizeOptions.map((pageSize) => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
