'use client';

import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
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
    useReactTable,
} from '@tanstack/react-table';

import { DownloadCloud, FileText } from 'lucide-react';

/* -------------------- Columns -------------------- */
const columns: ColumnDef<any>[] = [
    {
        header: 'No.',
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: 'name',
        header: 'Visitor Name',
    },
    {
        accessorKey: 'phone',
        header: 'Contact',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'address',
        header: 'Address',
    },
    {
        accessorKey: 'created_at',
        header: 'Visit Date & Time',
        cell: ({ row }) =>
            new Date(row.original.created_at).toLocaleString(undefined, {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            }),
    },
];

/* -------------------- Page -------------------- */
export default function Reporting() {
    const { visitors, filters } = usePage().props as any;

    const [year, setYear] = useState(filters.year);
    const [month, setMonth] = useState(filters.month);

    const table = useReactTable({
        data: visitors,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const generateReport = () => {
        router.get('/reporting', { year, month }, { preserveState: true });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Reporting', href: '/reporting' }]}>
            <Head title="Visitor Reports" />

            <div className="flex flex-col gap-4 p-4">
                {/* -------- Report Filters -------- */}
                <div className="flex flex-wrap items-end gap-4 rounded border p-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Year
                        </label>
                        <select
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="rounded border px-3 py-1"
                        >
                            {Array.from(
                                { length: new Date().getFullYear() - 2024 },
                                (_, i) => 2025 + i,
                            ).map((y) => (
                                <option key={y} value={y}>
                                    {y}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Month
                        </label>
                        <select
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            className="rounded border px-3 py-1"
                        >
                            {[
                                'January',
                                'February',
                                'March',
                                'April',
                                'May',
                                'June',
                                'July',
                                'August',
                                'September',
                                'October',
                                'November',
                                'December',
                            ].map((m, i) => (
                                <option key={i} value={i + 1}>
                                    {m}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={generateReport}
                            className="flex items-center gap-2 rounded bg-blue-600 px-5 py-1 text-white hover:bg-blue-700"
                        >
                            <FileText className="h-4 w-4" />
                            Generate Report
                        </button>

                        <a
                            href={`/reporting/download?year=${year}&month=${month}`}
                            className="flex items-center gap-2 rounded bg-red-600 px-5 py-1 text-white hover:bg-red-700"
                            target="_blank"
                        >
                            <DownloadCloud className="h-4 w-4" />
                            Download PDF
                        </a>
                    </div>
                </div>

                {/* -------- Report Table -------- */}
                <div className="overflow-x-auto rounded border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>

                        <TableBody>
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
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
                                        className="py-6 text-center"
                                    >
                                        No visitor records found for this period
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* -------- Report Summary -------- */}
                <div className="text-dark-foreground text-sm">
                    Total Visitors: <strong>{visitors.length}</strong>
                </div>
            </div>
        </AppLayout>
    );
}
