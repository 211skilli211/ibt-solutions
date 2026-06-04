'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
    const router = useRouter();
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeAPIs: 0,
        apiCalls: 0,
        errors: 0
    });

    useEffect(() => {
        setStats({
            totalUsers: 156,
            activeAPIs: 12,
            apiCalls: 12450,
            errors: 23
        });
    }, []);

    return (
        <div className="min-h-screen bg-ocean-900 text-white p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
                <p className="text-ink-400 mb-8">IBT Solutions Administration</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-surface-1 p-6 rounded-xl border border-surface-2">
                        <div className="text-ink-400 text-sm mb-2">Total Users</div>
                        <div className="text-3xl font-bold text-cyan-400">{stats.totalUsers}</div>
                    </div>
                    <div className="bg-surface-1 p-6 rounded-xl border border-surface-2">
                        <div className="text-ink-400 text-sm mb-2">Active APIs</div>
                        <div className="text-3xl font-bold text-emerald-400">{stats.activeAPIs}</div>
                    </div>
                    <div className="bg-surface-1 p-6 rounded-xl border border-surface-2">
                        <div className="text-ink-400 text-sm mb-2">API Calls (30d)</div>
                        <div className="text-3xl font-bold text-orange-400">{stats.apiCalls.toLocaleString()}</div>
                    </div>
                    <div className="bg-surface-1 p-6 rounded-xl border border-surface-2">
                        <div className="text-ink-400 text-sm mb-2">Errors</div>
                        <div className="text-3xl font-bold text-red-400">{stats.errors}</div>
                    </div>
                </div>

                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link href="/admin/api-keys" className="bg-surface-1 p-4 rounded-xl border border-surface-2 hover:border-cyan-500 transition-colors">
                        <div className="text-2xl mb-2">🔑</div>
                        <div className="font-semibold">API Keys</div>
                    </Link>
                    <Link href="/admin/usage" className="bg-surface-1 p-4 rounded-xl border border-surface-2 hover:border-cyan-500 transition-colors">
                        <div className="text-2xl mb-2">📊</div>
                        <div className="font-semibold">Usage Stats</div>
                    </Link>
                    <Link href="/admin/partners" className="bg-surface-1 p-4 rounded-xl border border-surface-2 hover:border-cyan-500 transition-colors">
                        <div className="text-2xl mb-2">🤝</div>
                        <div className="font-semibold">Partners</div>
                    </Link>
                    <Link href="/admin/settings" className="bg-surface-1 p-4 rounded-xl border border-surface-2 hover:border-cyan-500 transition-colors">
                        <div className="text-2xl mb-2">⚙️</div>
                        <div className="font-semibold">Settings</div>
                    </Link>
                </div>
            </div>
        </div>
    );
}