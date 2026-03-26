import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PAGINATION_TEXTS } from "@/constants/texts/pagination.texts"
import { type Table } from "@tanstack/react-table"

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
    <footer className="flex items-center justify-between px-2">
      {/* Quantidade de rows selecionadas */}
      <SelectedRowCount table={table} />

      <div className="flex items-center space-x-6 lg:space-x-8">
        {/* Configurar quantidade de linhas por página */}
        <PageSizeSelect table={table} />
      </div>
    </footer>
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

  return <div className="flex-1 text-sm text-muted-foreground">{PAGINATION_TEXTS.selectedRowCount(selectedRowCount, totalRowCount)}</div>
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
      <p className="text-sm font-medium">{PAGINATION_TEXTS.rowsPerPage.label}</p>

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
