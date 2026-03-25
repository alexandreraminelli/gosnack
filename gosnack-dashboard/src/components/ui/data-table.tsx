"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { USERS_TEXTS } from "@/constants/texts/entities/users.texts"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"

/**
 * Props de `DataTable`.
 */
interface DataTableProps<TData, TValue> {
  /**
   * Definição das colunas da tabela, incluindo renderização personalizada para campos específicos.
   */
  columns: ColumnDef<TData, TValue>[]
  /**
   * Dados a serem exibidos na tabela, tipados de acordo com a definição das colunas. A tabela renderizará uma linha para cada item neste array, utilizando as definições de coluna para determinar o conteúdo de cada célula.
   */
  data: TData[]

  /**
   * Componente opcional a ser exibido quando não houver dados para mostrar na tabela, permitindo personalização do estado vazio. Se não for fornecido, será exibido um estado vazio padrão.
   */
  emptyComponent?: React.ReactNode
}

/**
 * Componente genérico de tabela de dados, utilizando o TanStack Table para renderizar uma tabela flexível e personalizável. Suporta renderização personalizada de células e exibição de estado vazio quando não há dados.
 *
 * @see https://ui.shadcn.com/docs/components/radix/data-table
 */
export function DataTable<TData, TValue>({ columns, data, emptyComponent }: DataTableProps<TData, TValue>) {
  /**
   * Configuração da tabela usando o hook `useReactTable` do TanStack Table, passando os dados e as colunas, e definindo o modelo de linha principal. A tabela é renderizada com base nessa configuração, permitindo flexibilidade na definição das colunas e no conteúdo das células.
   */
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        {/* Header */}
        <TableHeader className="bg-sidebar">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null // Renderiza apenas se não for um placeholder
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>

        {/* Body */}
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"} // Estado de linha selecionada
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {
                      // Renderiza o conteúdo da célula usando a função de renderização definida na coluna
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    }
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            // Sem resultados
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {/* Mensagem  */}
                {emptyComponent || USERS_TEXTS.empty.title}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
