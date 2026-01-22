'use client';

import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Visitor',
        href: '/edit-visitor',
    },
];

export default function EditVisitor() {
    // Get visitor data from Inertia
    const { visitor } = usePage().props as any;

    // Initialize form with visitor data
    const { data, setData, put, processing, errors } = useForm({
        name: visitor?.name || '',
        email: visitor?.email || '',
        phone: visitor?.phone || '',
        address: visitor?.address || '',
        purpose: visitor?.purpose || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/update-visitor/${visitor.id}`, {
            onSuccess: () => {
                // optional: show notification or redirect
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Visitor" />

            <div className="w-full p-4">
                <div className="rounded-xl border border-sidebar-border/70 bg-background p-6">
                    <h2 className="mb-1 text-lg font-semibold">
                        Edit Visitor Information
                    </h2>
                    <p className="mb-6 text-sm text-muted-foreground">
                        Update the visitor details below and save changes.
                    </p>

                    <form
                        onSubmit={submit}
                        className="grid grid-cols-1 gap-5 md:grid-cols-2"
                    >
                        {/* Name */}
                        <div className="space-y-1">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Visitor Name"
                            />
                            {errors.name && (
                                <p className="text-sm text-destructive">{errors.name}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Visitor Email"
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive">{errors.email}</p>
                            )}
                        </div>

                        {/* Phone */}
                        <div className="space-y-1">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                placeholder="Visitor Phone"
                            />
                            {errors.phone && (
                                <p className="text-sm text-destructive">{errors.phone}</p>
                            )}
                        </div>

                        {/* Address */}
                        <div className="space-y-1">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                placeholder="Visitor Address"
                            />
                            {errors.address && (
                                <p className="text-sm text-destructive">{errors.address}</p>
                            )}
                        </div>

                        {/* Purpose */}
                        <div className="space-y-1 md:col-span-2">
                            <Label htmlFor="purpose">Purpose</Label>
                            <Textarea
                                id="purpose"
                                rows={3}
                                value={data.purpose}
                                onChange={(e) => setData('purpose', e.target.value)}
                                placeholder="Reason for visit"
                            />
                            {errors.purpose && (
                                <p className="text-sm text-destructive">{errors.purpose}</p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end md:col-span-2">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                {processing ? 'Updating...' : 'Update Visitor'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}