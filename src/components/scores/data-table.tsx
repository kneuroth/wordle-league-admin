'use client';

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState } from 'react';
import { deleteScore } from '@/lib/api';

interface DataTableProps<TData extends Record<string, any>, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends Record<string, any>, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [inputRow, setInputRow] = useState<Record<string, string>>({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Replace with your actual API endpoint
    await fetch(
      'https://s0f0zido6g.execute-api.us-east-1.amazonaws.com/score',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputRow),
      }
    );
    // Optionally clear the form or refresh data
    setInputRow({});
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  // Render column defined cell
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell>
                  <Button
                    variant={'secondary'}
                    onClick={() =>
                      setInputRow(
                        Object.fromEntries(
                          Object.entries(row.original).map(([k, v]) => [
                            k,
                            v == null ? '' : String(v),
                          ])
                        )
                      )
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    variant={'destructive'}
                    onClick={() => {
                      deleteScore(
                        row.getValue('player_id'),
                        row.getValue('chat_id'),
                        row.getValue('date')
                      );
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
          {/* End of table body */}
        </TableBody>
      </Table>
      {/*
        The input row is a second table because HTML forbids <form> in <tr>/<tbody>.
        This keeps markup valid and ensures only the input row submits the form.
        The Edit button fills the input row, so you can submit changes with the form below.
      */}
      <form onSubmit={handleSubmit} className="w-full">
        <Table className="w-full border-t">
          <TableBody>
            <TableRow>
              {columns.map((column, idx) => {
                let key: string | number = idx;
                if ('id' in column && column.id) {
                  key = column.id;
                } else if (
                  'accessorKey' in column &&
                  typeof column.accessorKey === 'string'
                ) {
                  key = column.accessorKey;
                }

                const placeholder =
                  typeof column.header === 'string' ? column.header : '';
                return (
                  <TableCell key={key}>
                    <Input
                      value={inputRow[key] || ''}
                      onChange={(e) =>
                        setInputRow({ ...inputRow, [key]: e.target.value })
                      }
                      placeholder={placeholder}
                    />
                  </TableCell>
                );
              })}
              {/* Add submit button at the end of the row */}
              <TableCell key="submit">
                <Button type="submit">Submit</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </form>
    </div>
  );
}
