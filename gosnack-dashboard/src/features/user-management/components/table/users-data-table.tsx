"use client"

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { USERS_TEXTS } from "@/constants/texts/entities/users.texts"
import EmptyState from "@/components/shared/feedback/empty-state"

/**
 * Props de `UsersDataTable`.
 */
interface Props<TData, TValue> {
  /**
   * Definição das colunas da tabela, incluindo renderização personalizada para campos específicos.
   */
  columns: ColumnDef<TData, TValue>[]
  /**
   * Dados a serem exibidos na tabela, representando os usuários do sistema. Cada item deve corresponder à estrutura definida nas colunas.
   */
  data: TData[]
}

/**
 * Tabela de dados para exibir os usuários do sistema, utilizando a biblioteca TanStack Table para renderização e gerenciamento de estado.
 *
 * @see https://ui.shadcn.com/docs/components/radix/data-table
 */
export function UsersDataTable<TData, TValue>({ columns, data }: Props<TData, TValue>) {
  /**
   * Instância do TanStack Table para a tabela de usuários, configurada com os dados e colunas fornecidos, e utilizando o modelo de linha principal para renderização.
   */
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <Table>
        {/* Header */}
        <TableHeader>
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
                <EmptyState title={USERS_TEXTS.empty.title} description={[USERS_TEXTS.empty.description]} />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
