'use client';

import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function GlobalFlash() {
    const { flash } = usePage().props as any;
    const [showSuccess, setShowSuccess] = useState<boolean>(!!flash?.success);
    const [showError, setShowError] = useState<boolean>(!!flash?.error);

    useEffect(() => {
        if (flash?.success) {
            setShowSuccess(true);
            const timer = setTimeout(() => setShowSuccess(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash?.success]);

    useEffect(() => {
        if (flash?.error) {
            setShowError(true);
            const timer = setTimeout(() => setShowError(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [flash?.error]);

    if (!showSuccess && !showError) return null;

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            {showSuccess && (
                <div className="animate-slide-in rounded border border-green-400 bg-green-50 px-4 py-2 text-green-800 shadow-md">
                    {flash.success}
                </div>
            )}
            {showError && (
                <div className="animate-slide-in rounded border border-red-400 bg-red-50 px-4 py-2 text-red-800 shadow-md">
                    {flash.error}
                </div>
            )}
        </div>
    );
}
