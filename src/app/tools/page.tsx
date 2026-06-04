'use client';

import { useState } from 'react';

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState('business-apis');

  const categories = [
    {
      id: 'business-apis',
      name: 'Business APIs',
      icon: '⚡',
      description: 'APIs for data, accounting & inventory',
      tools: [
        { id: 'conversion', name: 'Data → Spreadsheet', description: 'Convert JSON/CSV to spreadsheet' },
        { id: 'accounting', name: 'Accounting', description: 'Invoicing & financial tools' },
        { id: 'inventory', name: 'Inventory', description: 'Stock management & alerts' },
      ],
    },
    {
      id: 'ai',
      name: 'AI Solutions',
      icon: '🎯',
      description: 'AI-powered tools & automation',
      tools: [
        { id: 'influencer', name: 'AI Digital Influencer', description: 'Create AI influencers with voice cloning', href: '/influencer' },
      ],
    },
    {
      id: 'connectivity',
      name: 'Connectivity',
      icon: '🔗',
      description: 'B2B integration & partnerships',
      tools: [
        { id: 'b2b', name: 'B2B API', description: 'Enterprise connectivity', comingSoon: true },
        { id: 'regional', name: 'Regional Intel', description: 'Location intelligence', href: '/geospatial' },
      ],
    },
  ];

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Data conversion state
  const [jsonInput, setJsonInput] = useState('');

  // Invoice state  
  const [invoiceData, setInvoiceData] = useState({
    customer: '',
    items: [{ description: '', quantity: 1, price: 0 }]
  });

  // Inventory state
  const [inventoryItem, setInventoryItem] = useState({
    name: '', category: '', quantity: 0, minStock: 10, price: 0, cost: 0
  });

  const handleConversion = async () => {
    setLoading(true);
    try {
      const data = JSON.parse(jsonInput);
      const res = await fetch('/api/services/conversion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, format: 'csv' })
      });
      setResult(await res.json());
    } catch (e) {
      setResult({ error: 'Invalid JSON data' });
    }
    setLoading(false);
  };

  const handleInvoiceCreate = async () => {
    setLoading(true);
    const res = await fetch('/api/services/accounting', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'create', invoice: invoiceData })
    });
    setResult(await res.json());
    setLoading(false);
  };

  const handleInventoryAdd = async () => {
    setLoading(true);
    const res = await fetch('/api/services/inventory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'add', item: inventoryItem })
    });
    setResult(await res.json());
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-ocean-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Business APIs</h1>
          <p className="text-ink-400">Powerful APIs for automation and enterprise integration</p>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setResult(null); }}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all whitespace-nowrap ${
                activeCategory === cat.id 
                  ? 'bg-cyan-500/20 border border-cyan-500 text-cyan-400' 
                  : 'bg-surface-1 border border-surface-2 text-ink-400 hover:border-ink-700'
              }`}
            >
              <span className="text-2xl">{cat.icon}</span>
              <div>
                <p className="font-medium">{cat.name}</p>
                <p className="text-xs text-ink-500">{cat.tools.length} tools</p>
              </div>
            </button>
          ))}
        </div>

        {/* Business APIs Section */}
        {activeCategory === 'business-apis' && (
          <div className="space-y-8">
            {/* Data Conversion */}
            <div className="bg-surface-1 rounded-xl p-6 border border-surface-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">📊</span>
                <h3 className="text-xl font-semibold text-white">Data → Spreadsheet</h3>
              </div>
              <p className="text-ink-400 text-sm mb-4">
                Convert JSON, CSV, or any data to spreadsheet format (CSV)
              </p>
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='[{"name": "Product", "price": 100}, {"name": "Product 2", "price": 150}]'
                className="w-full h-32 bg-surface-2 border border-ink-700 rounded-lg p-4 text-white font-mono text-sm mb-4"
              />
              <button
                onClick={handleConversion}
                disabled={loading || !jsonInput}
                className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 disabled:bg-ink-700 text-surface-1 font-medium rounded-lg"
              >
                {loading ? 'Converting...' : 'Convert'}
              </button>
            </div>

            {/* Accounting */}
            <div className="bg-surface-1 rounded-xl p-6 border border-surface-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">💳</span>
                <h3 className="text-xl font-semibold text-white">Accounting API</h3>
              </div>
              <p className="text-ink-400 text-sm mb-4">
                Create invoices, calculate totals, manage billing
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Customer name"
                  value={invoiceData.customer}
                  onChange={(e) => setInvoiceData({...invoiceData, customer: e.target.value})}
                  className="bg-surface-2 border border-ink-700 rounded-lg p-3 text-white"
                />
                <input
                  type="number"
                  placeholder="Item price"
                  value={invoiceData.items[0].price}
                  onChange={(e) => setInvoiceData({
                    ...invoiceData, 
                    items: [{...invoiceData.items[0], price: parseFloat(e.target.value) || 0}]
                  })}
                  className="bg-surface-2 border border-ink-700 rounded-lg p-3 text-white"
                />
              </div>
              <button
                onClick={handleInvoiceCreate}
                disabled={loading || !invoiceData.customer}
                className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 disabled:bg-ink-700 text-surface-1 font-medium rounded-lg"
              >
                {loading ? 'Creating...' : 'Create Invoice'}
              </button>
            </div>

            {/* Inventory */}
            <div className="bg-surface-1 rounded-xl p-6 border border-surface-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">📦</span>
                <h3 className="text-xl font-semibold text-white">Inventory API</h3>
              </div>
              <p className="text-ink-400 text-sm mb-4">
                Track stock levels, get low stock alerts
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Item name"
                  value={inventoryItem.name}
                  onChange={(e) => setInventoryItem({...inventoryItem, name: e.target.value})}
                  className="bg-surface-2 border border-ink-700 rounded-lg p-3 text-white"
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={inventoryItem.quantity}
                  onChange={(e) => setInventoryItem({...inventoryItem, quantity: parseInt(e.target.value) || 0})}
                  className="bg-surface-2 border border-ink-700 rounded-lg p-3 text-white"
                />
                <input
                  type="number"
                  placeholder="Min stock level"
                  value={inventoryItem.minStock}
                  onChange={(e) => setInventoryItem({...inventoryItem, minStock: parseInt(e.target.value) || 0})}
                  className="bg-surface-2 border border-ink-700 rounded-lg p-3 text-white"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={inventoryItem.price}
                  onChange={(e) => setInventoryItem({...inventoryItem, price: parseFloat(e.target.value) || 0})}
                  className="bg-surface-2 border border-ink-700 rounded-lg p-3 text-white"
                />
              </div>
              <button
                onClick={handleInventoryAdd}
                disabled={loading || !inventoryItem.name}
                className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 disabled:bg-ink-700 text-surface-1 font-medium rounded-lg"
              >
                {loading ? 'Adding...' : 'Add Item'}
              </button>
            </div>

            {/* Result Display */}
            {result && (
              <div className="bg-surface-1 rounded-xl p-6 border border-surface-2">
                <h3 className="text-lg font-semibold text-white mb-4">Result</h3>
                <pre className="text-sm text-ink-300 overflow-auto max-h-64">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* AI Solutions Section */}
        {activeCategory === 'ai' && (
          <a href="/influencer" className="block bg-surface-1 rounded-xl p-8 border border-surface-2 hover:border-cyan-500 transition-colors">
            <span className="text-6xl mb-4 block">🎯</span>
            <h3 className="text-2xl font-bold text-white mb-2">AI Digital Influencer</h3>
            <p className="text-ink-400 mb-6">
              Create AI-powered influencers with authentic Caribbean accents. 
              Full setup including voice cloning for marketing and social media.
            </p>
            <span className="inline-block px-4 py-2 bg-cyan-500 text-surface-1 font-medium rounded-full text-sm">
              Launch Tool →
            </span>
          </a>
        )}

        {/* Connectivity Section */}
        {activeCategory === 'connectivity' && (
          <div className="space-y-6">
            <div className="bg-surface-1 rounded-xl p-8 border border-surface-2 text-center">
              <span className="text-6xl mb-4 block">🔗</span>
              <h3 className="text-2xl font-bold text-white mb-2">B2B API Connectivity</h3>
              <p className="text-ink-400 mb-6">
                Enterprise connectivity and telecom partnerships for regional businesses.
              </p>
              <span className="inline-block px-4 py-2 bg-amber-500/20 text-amber-400 rounded-full text-sm">
                Coming Soon
              </span>
            </div>
            <a href="/geospatial" className="block bg-surface-1 rounded-xl p-6 border border-surface-2 hover:border-cyan-500 transition-colors">
              <div className="flex items-center gap-4">
                <span className="text-3xl">🌎</span>
                <div>
                  <h4 className="text-lg font-semibold text-white">Regional Intel</h4>
                  <p className="text-ink-400 text-sm">Location intelligence & mapping</p>
                </div>
              </div>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}