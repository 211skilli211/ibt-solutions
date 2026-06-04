'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-ocean-900 text-white p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                <p className="text-ink-400 mb-8">Welcome to IBT Solutions</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-surface-1 p-6 rounded-xl border border-surface-2">
                        <h3 className="text-lg font-semibold mb-4">My APIs</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center py-2 border-b border-surface-2">
                                <span className="text-ink-400">POI API</span>
                                <span className="text-emerald-400">Active</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-surface-2">
                                <span className="text-ink-400">Marine API</span>
                                <span className="text-emerald-400">Active</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-surface-2">
                                <span className="text-ink-400">Weather API</span>
                                <span className="text-emerald-400">Active</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-ink-400">Currency API</span>
                                <span className="text-emerald-400">Active</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-surface-1 p-6 rounded-xl border border-surface-2">
                        <h3 className="text-lg font-semibold mb-4">Usage This Month</h3>
                        <div className="text-4xl font-bold text-cyan-400 mb-2">12,450</div>
                        <div className="text-ink-400">API calls</div>
                        <div className="mt-4 text-sm text-ink-500">Limit: 50,000</div>
                    </div>

                    <div className="bg-surface-1 p-6 rounded-xl border border-surface-2">
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <div className="space-y-3">
                            <a href="/api-services" className="block p-3 bg-surface-2 rounded-lg hover:bg-ink-700 transition-colors">
                                📚 API Documentation
                            </a>
                            <a href="/tools" className="block p-3 bg-surface-2 rounded-lg hover:bg-ink-700 transition-colors">
                                🛠 Developer Tools
                            </a>
                            <a href="/geospatial" className="block p-3 bg-surface-2 rounded-lg hover:bg-ink-700 transition-colors">
                                🗺️ Geospatial Map
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}