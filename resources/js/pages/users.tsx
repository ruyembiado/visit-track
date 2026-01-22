'use client';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';

// Breadcrumbs for layout
const breadcrumbs: BreadcrumbItem[] = [{ title: 'Users', href: '/users' }];

// Column definitions
const columns: ColumnDef<any>[] = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'role', header: 'Role' },
];

export default function Users() {
    const { users } = usePage().props as any; // Inertia users

    // Table state
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    // React Table instance
    const table = useReactTable({
        data: users,
        columns,
        state: {
            sorting,
            globalFilter,
            pagination: { pageIndex, pageSize },
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: (updater) => {
            const newPagination =
                typeof updater === 'function'
                    ? updater({ pageIndex, pageSize })
                    : updater;
            setPageIndex(newPagination.pageIndex);
            setPageSize(newPagination.pageSize);
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />

            <div className="flex flex-1 flex-col gap-4 p-4">
                {/* Search input */}
                <div className="mb-0">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={globalFilter ?? ''}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="w-full max-w-sm rounded border px-2 py-1"
                    />
                </div>

                <div className="relative overflow-hidden rounded border border-sidebar-border/70 dark:border-sidebar-border">
                    <Table className="min-w-full rounded-lg text-sm">
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            className="cursor-pointer text-sm select-none"
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                            {{
                                                asc: ' 🔼',
                                                desc: ' 🔽',
                                            }[
                                                header.column.getIsSorted() as string
                                            ] ?? null}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>

                        {/* Table Body */}
                        <TableBody>
                            {table.getRowModel().rows.length ? (
                                table
                                    .getRowModel()
                                    .rows.map((row, rowIndex) => (
                                        <TableRow
                                            key={row.id}
                                            className="text-sm"
                                        >
                                            {row
                                                .getVisibleCells()
                                                .map((cell, cellIndex) => (
                                                    <TableCell
                                                        key={cell.id}
                                                        className="text-sm"
                                                    >
                                                        {/* If first column, show loop index instead of DB id */}
                                                        {cellIndex === 0
                                                            ? pageIndex *
                                                                  pageSize +
                                                              rowIndex +
                                                              1
                                                            : flexRender(
                                                                  cell.column
                                                                      .columnDef
                                                                      .cell,
                                                                  cell.getContext(),
                                                              )}
                                                    </TableCell>
                                                ))}
                                        </TableRow>
                                    ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="text-center text-sm"
                                    >
                                        No users found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    {/* Pagination controls */}
                    <div className="mt-2 flex items-center justify-between px-2 py-2 text-sm">
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="rounded border px-2 py-1 disabled:opacity-50"
                        >
                            Previous
                        </button>

                        <span className="mx-2">
                            Page {table.getState().pagination.pageIndex + 1} of{' '}
                            {table.getPageCount()}
                        </span>

                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="rounded border px-2 py-1 disabled:opacity-50"
                        >
                            Next
                        </button>

                        <select
                            value={table.getState().pagination.pageSize}
                            onChange={(e) =>
                                table.setPageSize(Number(e.target.value))
                            }
                            className="ml-2 rounded border px-2 py-1"
                        >
                            {[5, 10, 20, 50].map((size) => (
                                <option key={size} value={size}>
                                    Show {size}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}