'use client';

import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
    totalVisitorsToday: number;
    totalVisitorsThisMonth: number;
    totalVisitorsThisYear: number;
    visitorsMonthly: { month: string; count: number }[];
    recentVisitors: any[];
}

export default function Dashboard({
    totalVisitorsToday,
    totalVisitorsThisMonth,
    totalVisitorsThisYear,
    visitorsMonthly,
    recentVisitors,
}: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex flex-col gap-6 p-4">
                {/* -----------------------------
                   Top Stats Cards
                ----------------------------- */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <div className="flex flex-col justify-between rounded-xl border border-sidebar-border/70 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="text-sm font-medium text-muted-foreground">
                            Visitors Today
                        </div>
                        <div className="mt-2 text-2xl font-bold">
                            {totalVisitorsToday}
                        </div>
                    </div>

                    <div className="flex flex-col justify-between rounded-xl border border-sidebar-border/70 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="text-sm font-medium text-muted-foreground">
                            Visitors This Month
                        </div>
                        <div className="mt-2 text-2xl font-bold">
                            {totalVisitorsThisMonth}
                        </div>
                    </div>

                    <div className="flex flex-col justify-between rounded-xl border border-sidebar-border/70 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="text-sm font-medium text-muted-foreground">
                            Visitors This Year
                        </div>
                        <div className="mt-2 text-2xl font-bold">
                            {totalVisitorsThisYear}
                        </div>
                    </div>
                </div>

                {/* -----------------------------
                   Recent Visitors Table
                ----------------------------- */}
                <div className="rounded-xl border border-sidebar-border/70 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <h2 className="mb-4 text-lg font-semibold">
                        Recent Visitors
                    </h2>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No.</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Purpose</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {recentVisitors.length ? (
                                recentVisitors.map((visitor, index) => (
                                    <TableRow key={visitor.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{visitor.name}</TableCell>
                                        <TableCell>{visitor.email}</TableCell>
                                        <TableCell>{visitor.phone}</TableCell>
                                        <TableCell>{visitor.purpose}</TableCell>
                                        <TableCell>
                                            {new Date(
                                                visitor.created_at,
                                            ).toLocaleString(undefined, {
                                                year: 'numeric',
                                                month: 'short',
                                                day: '2-digit',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true,
                                            })}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="text-center"
                                    >
                                        No visitors found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* -----------------------------
                    Monthly Visitors Chart - Modern Look
                ----------------------------- */}
                <div className="rounded-xl border border-sidebar-border/70 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <h2 className="mb-4 text-lg font-semibold">
                        Monthly Visitors ({new Date().getFullYear()})
                    </h2>
                    {visitorsMonthly.length ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={visitorsMonthly}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 0,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid
                                    stroke="#e5e7eb"
                                    strokeDasharray="4 4"
                                    vertical={false}
                                />
                                <XAxis
                                    dataKey="month"
                                    tick={{ fill: '#6b7280', fontSize: 12 }}
                                    axisLine={{ stroke: '#d1d5db' }}
                                />
                                <YAxis
                                    tick={{ fill: '#6b7280', fontSize: 12 }}
                                    axisLine={{ stroke: '#d1d5db' }}
                                    tickCount={6}
                                />

                                <Tooltip
                                    cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} 
                                    contentStyle={{
                                        backgroundColor: '#ffffff',
                                        borderRadius: 8,
                                        border: '1px solid #e5e7eb',
                                        padding: '8px 12px',
                                        fontSize: 12,
                                    }}
                                    labelStyle={{ fontWeight: 500 }}
                                    itemStyle={{
                                        color: '#111827',
                                        fontWeight: 500,
                                    }}
                                />

                                <Legend
                                    wrapperStyle={{
                                        fontSize: 12,
                                        color: '#6b7280',
                                    }}
                                    verticalAlign="top"
                                />

                                {/* Bars with subtle white hover via cursor fill */}
                                <Bar
                                    dataKey="count"
                                    name="Visitors"
                                    radius={[6, 6, 0, 0]}
                                    fill="url(#colorCount)"
                                    animationDuration={800}
                                />

                                <defs>
                                    <linearGradient
                                        id="colorCount"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="0%"
                                            stopColor="#3b82f6"
                                            stopOpacity={0.9}
                                        />
                                        <stop
                                            offset="100%"
                                            stopColor="#60a5fa"
                                            stopOpacity={0.6}
                                        />
                                    </linearGradient>
                                </defs>
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex h-64 items-center justify-center text-muted-foreground">
                            No data available
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
