import { sql } from '@/lib/db';

export default async function DashboardPage() {
    let apiCalls = 0;
    let activeAPIs = 0;

    try {
        apiCalls = Number((await sql`SELECT COUNT(*) as count FROM api_logs WHERE created_at > NOW() - INTERVAL '30 days'`)[0]?.count || 0);
        activeAPIs = Number((await sql`SELECT COUNT(*) as count FROM api_keys WHERE status = 'active'`)[0]?.count || 0);
    } catch {
        // DB not yet connected — show zeros
    }

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
                                <span className="text-ink-400">Active Keys</span>
                                <span className="text-emerald-400">{activeAPIs}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-surface-2">
                                <span className="text-ink-400">30d Calls</span>
                                <span className="text-cyan-400">{apiCalls.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-surface-1 p-6 rounded-xl border border-surface-2">
                        <h3 className="text-lg font-semibold mb-4">Usage This Month</h3>
                        <div className="text-4xl font-bold text-cyan-400 mb-2">{apiCalls.toLocaleString()}</div>
                        <div className="text-ink-400">API calls (30 days)</div>
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