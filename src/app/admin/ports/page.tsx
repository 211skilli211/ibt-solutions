"use client";

import { useState, useEffect, useCallback } from "react";
import MapLibreMap, { MapMarker } from "@/components/MapLibreMap";

interface Port {
  id: string;
  name: string;
  type: string;
  lat: number;
  lng: number;
  harbor_depth: number | null;
  max_vessel_size: string | null;
  description: string | null;
  created_at: string;
}

export default function AdminPorts() {
  const [ports, setPorts] = useState<Port[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [portType, setPortType] = useState("marina");
  const [harborDepth, setHarborDepth] = useState("");
  const [maxVesselSize, setMaxVesselSize] = useState("");
  const [description, setDescription] = useState("");
  const [clickedCoords, setClickedCoords] = useState<{ lat: number; lng: number } | null>(null);

  // Map click capture state
  const [mapClickEnabled, setMapClickEnabled] = useState(true);

  // Fetch ports
  const fetchPorts = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/ports");
      const data = await res.json();
      if (data.ports) {
        setPorts(data.ports);
      }
    } catch (err) {
      console.error("Failed to fetch ports:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPorts();
  }, [fetchPorts]);

  // Handle port creation
  const handleSave = async () => {
    if (!name || !clickedCoords) {
      setMessage({ type: "error", text: "Please enter port name and click the map to set coordinates" });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/ports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          type: portType,
          lat: clickedCoords.lat,
          lng: clickedCoords.lng,
          harbor_depth: harborDepth ? parseFloat(harborDepth) : null,
          max_vessel_size: maxVesselSize || null,
          description: description || null,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: `Port "${name}" created successfully` });
        // Reset form
        setName("");
        setPortType("marina");
        setHarborDepth("");
        setMaxVesselSize("");
        setDescription("");
        setClickedCoords(null);
        fetchPorts();
      } else {
        setMessage({ type: "error", text: data.error || "Failed to create port" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Failed to create port" });
    } finally {
      setSaving(false);
    }
  };

  // Handle port deletion
  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch("/api/admin/ports", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setPorts((prev) => prev.filter((p) => p.id !== id));
        setMessage({ type: "success", text: "Port deleted" });
      } else {
        setMessage({ type: "error", text: "Failed to delete port" });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to delete port" });
    } finally {
      setDeletingId(null);
    }
  };

  // Build map markers from existing ports
  const markers: MapMarker[] = ports.map((port) => ({
    id: port.id,
    name: port.name,
    lat: parseFloat(String(port.lat)),
    lng: parseFloat(String(port.lng)),
    category: port.type === "marina" ? "Marina" : port.type === "harbor" ? "Port" : "Default",
    description: port.description || undefined,
    color: port.type === "marina" ? "oklch(0.65 0.15 200)" : "oklch(0.55 0.10 250)",
  }));

  // Add clicked location marker
  if (clickedCoords) {
    markers.push({
      id: "clicked",
      name: "New Port Location",
      lat: clickedCoords.lat,
      lng: clickedCoords.lng,
      category: "Default",
      color: "oklch(0.72 0.18 20)",
      icon: "📍",
    });
  }


  return (
    <div className="min-h-screen bg-oklch(0.15 0.02 230) text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Port Editor</h1>
        <p className="text-oklch(0.65 0.02 230) mb-8">Manage IBT port locations</p>

        {message && (
          <div
            className={`mb-6 px-4 py-3 rounded-xl border ${
              message.type === "success"
                ? "bg-oklch(0.40 0.12 145) border-oklch(0.50 0.14 145) text-oklch(0.90 0.05 145)"
                : "bg-oklch(0.30 0.15 20) border-oklch(0.40 0.16 20) text-oklch(0.90 0.05 20)"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Map + Coordinates */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Map Picker</h2>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={mapClickEnabled}
                  onChange={(e) => setMapClickEnabled(e.target.checked)}
                  className="accent-oklch(0.65 0.15 230)"
                />
                <span className="text-oklch(0.70 0.02 230)">Click to place</span>
              </label>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-oklch(0.30 0.03 230)">
              <MapLibreMap
                center={[-62.78, 17.36]}
                zoom={10}
                markers={markers}
                showSearch={true}
                showLayerPanel={false}
                height="500px"
              />
              {/* Click overlay for capturing coordinates */}
              {mapClickEnabled && (
                <div
                  className="absolute inset-0 z-10 cursor-crosshair"
                  onClick={(e) => {
                    // Get the map container position and calculate approximate lat/lng
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width;
                    const y = (e.clientY - rect.top) / rect.height;

                    // MapLibre default view: center [-62.78, 17.36], zoom 10
                    // Approximate span at zoom 10: ~0.1 degrees visible
                    const mapCenterLng = -62.78;
                    const mapCenterLat = 17.36;
                    const lngSpan = 0.14; // approximate visible longitude span
                    const latSpan = 0.08; // approximate visible latitude span

                    const lng = mapCenterLng + (x - 0.5) * lngSpan;
                    const lat = mapCenterLat - (y - 0.5) * latSpan;

                    setClickedCoords({ lat: parseFloat(lat.toFixed(6)), lng: parseFloat(lng.toFixed(6)) });
                  }}
                />
              )}
            </div>

            {/* Coordinate Input Fields */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-oklch(0.70 0.02 230) mb-1">Latitude</label>
                <input
                  type="number"
                  step="0.000001"
                  value={clickedCoords?.lat !== undefined ? clickedCoords.lat : ""}
                  onChange={(e) =>
                    setClickedCoords((prev) => ({
                      lat: parseFloat(e.target.value) || 0,
                      lng: prev?.lng || 0,
                    }))
                  }
                  placeholder="Click map or enter manually"
                  className="w-full px-3 py-2 bg-oklch(0.22 0.02 230) border border-oklch(0.30 0.03 230) rounded-lg text-white placeholder:text-oklch(0.50 0.02 230) focus:outline-none focus:border-oklch(0.65 0.15 230)"
                />
              </div>
              <div>
                <label className="block text-sm text-oklch(0.70 0.02 230) mb-1">Longitude</label>
                <input
                  type="number"
                  step="0.000001"
                  value={clickedCoords?.lng !== undefined ? clickedCoords.lng : ""}
                  onChange={(e) =>
                    setClickedCoords((prev) => ({
                      lat: prev?.lat || 0,
                      lng: parseFloat(e.target.value) || 0,
                    }))
                  }
                  placeholder="Click map or enter manually"
                  className="w-full px-3 py-2 bg-oklch(0.22 0.02 230) border border-oklch(0.30 0.03 230) rounded-lg text-white placeholder:text-oklch(0.50 0.02 230) focus:outline-none focus:border-oklch(0.65 0.15 230)"
                />
              </div>
            </div>

            {clickedCoords && (
              <p className="mt-2 text-xs text-oklch(0.60 0.10 80)">
                📍 Selected: {clickedCoords.lat.toFixed(6)}, {clickedCoords.lng.toFixed(6)}
              </p>
            )}
          </div>

          {/* Right Column: Form */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Port Details</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-oklch(0.70 0.02 230) mb-1">
                  Port Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Rodney Bay Marina"
                  className="w-full px-3 py-2 bg-oklch(0.22 0.02 230) border border-oklch(0.30 0.03 230) rounded-lg text-white placeholder:text-oklch(0.50 0.02 230) focus:outline-none focus:border-oklch(0.65 0.15 230)"
                />
              </div>

              <div>
                <label className="block text-sm text-oklch(0.70 0.02 230) mb-1">
                  Port Type *
                </label>
                <select
                  value={portType}
                  onChange={(e) => setPortType(e.target.value)}
                  className="w-full px-3 py-2 bg-oklch(0.22 0.02 230) border border-oklch(0.30 0.03 230) rounded-lg text-white focus:outline-none focus:border-oklch(0.65 0.15 230)"
                >
                  <option value="marina">Marina</option>
                  <option value="harbor">Harbor</option>
                  <option value="fishing">Fishing</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-oklch(0.70 0.02 230) mb-1">
                  Harbor Depth (m)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={harborDepth}
                  onChange={(e) => setHarborDepth(e.target.value)}
                  placeholder="e.g., 5.5"
                  className="w-full px-3 py-2 bg-oklch(0.22 0.02 230) border border-oklch(0.30 0.03 230) rounded-lg text-white placeholder:text-oklch(0.50 0.02 230) focus:outline-none focus:border-oklch(0.65 0.15 230)"
                />
              </div>

              <div>
                <label className="block text-sm text-oklch(0.70 0.02 230) mb-1">
                  Max Vessel Size
                </label>
                <input
                  type="text"
                  value={maxVesselSize}
                  onChange={(e) => setMaxVesselSize(e.target.value)}
                  placeholder="e.g., 50m yacht"
                  className="w-full px-3 py-2 bg-oklch(0.22 0.02 230) border border-oklch(0.30 0.03 230) rounded-lg text-white placeholder:text-oklch(0.50 0.02 230) focus:outline-none focus:border-oklch(0.65 0.15 230)"
                />
              </div>

              <div>
                <label className="block text-sm text-oklch(0.70 0.02 230) mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of the port..."
                  rows={3}
                  className="w-full px-3 py-2 bg-oklch(0.22 0.02 230) border border-oklch(0.30 0.03 230) rounded-lg text-white placeholder:text-oklch(0.50 0.02 230) focus:outline-none focus:border-oklch(0.65 0.15 230) resize-none"
                />
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full py-3 bg-oklch(0.55 0.14 200) hover:bg-oklch(0.60 0.15 200) disabled:bg-oklch(0.30 0.03 230) disabled:text-oklch(0.50 0.02 230) text-white font-semibold rounded-xl transition-colors border border-oklch(0.45 0.12 200)"
              >
                {saving ? "Saving..." : "Save Port"}
              </button>
            </div>
          </div>
        </div>

        {/* Existing Ports List */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Existing Ports ({ports.length})</h2>

          {loading ? (
            <p className="text-oklch(0.65 0.02 230)">Loading ports...</p>
          ) : ports.length === 0 ? (
            <p className="text-oklch(0.65 0.02 230)">No ports yet. Add your first port above.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ports.map((port) => (
                <div
                  key={port.id}
                  className="bg-oklch(0.22 0.02 230) border border-oklch(0.30 0.03 230) rounded-xl p-4 hover:border-oklch(0.45 0.05 230) transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-white">{port.name}</h3>
                      <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-oklch(0.40 0.05 230) text-oklch(0.80 0.05 230)">
                        {port.type}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDelete(port.id)}
                      disabled={deletingId === port.id}
                      className="text-oklch(0.70 0.12 20) hover:text-oklch(0.80 0.15 20) disabled:opacity-50 transition-colors"
                      title="Delete port"
                    >
                      {deletingId === port.id ? "..." : "✕"}
                    </button>
                  </div>
                  <div className="text-sm text-oklch(0.65 0.02 230) space-y-1">
                    <p>
                      📍 {parseFloat(String(port.lat)).toFixed(4)}, {parseFloat(String(port.lng)).toFixed(4)}
                    </p>
                    {port.harbor_depth && <p>🌊 Depth: {port.harbor_depth}m</p>}
                    {port.max_vessel_size && <p>⛵ {port.max_vessel_size}</p>}
                    {port.description && (
                      <p className="text-oklch(0.55 0.02 230) mt-2">{port.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
