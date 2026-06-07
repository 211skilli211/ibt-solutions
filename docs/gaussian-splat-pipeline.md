# 3D Gaussian Splat Data Pipeline — IBT Geospatial

## Overview

Two-track approach:
1. **Skyfall-GS** — Satellite imagery → 3D urban scenes (research/compute pipeline)
2. **Local scanning** — Scaniverse on-device capture → process → publish (ground truth)

---

## Track 1: Skyfall-GS (Satellite → 3D)

### What it does
Converts multi-view satellite imagery into explorable 3DGS scenes using diffusion models. Covers city-block scale. Real-time free-flight navigation.

### Data source
- HuggingFace: `jayinnn/Skyfall-GS-ply` (PLY files)
- HuggingFace: `jayinnn/Skyfall-GS-datasets` (training data)
- Paper: arXiv 2510.15869

### Available scenes
| ID | Location | Type |
|----|----------|------|
| jax_004 | Jacksonville, FL | Residential |
| jax_068 | Jacksonville, FL | H Building |
| jax_214 | Jacksonville, FL | Office Building |
| jax_260 | Jacksonville, FL | Lake Side |
| jax_164 | Jacksonville, FL | City Hall |
| jax_168 | Jacksonville, FL | Villa |
| jax_175 | Jacksonville, FL | Stadium |
| jax_264 | Jacksonville, FL | Factory |
| nyc_004 | New York, NY | World Financial Center |
| nyc_010 | New York, NY | Union Square |
| nyc_219 | New York, NY | E 12th St |
| nyc_336 | New York, NY | Albany St |

### Download + convert
```bash
# Download a Skyfall scene and auto-convert to SPZ
python3 scripts/spz_convert.py skyfall jax_004 --output-dir data/splats/

# Download only (keep PLY)
python3 scripts/spz_convert.py skyfall jax_004 --output-dir data/splats/ --keep-ply

# List available scenes
python3 scripts/spz_convert.py list

# Convert a local PLY file
python3 scripts/spz_convert.py convert scene.ply scene.spz --sh-degree 3

# Show PLY info
python3 scripts/spz_convert.py info scene.ply
```

### For Caribbean coverage
Skyfall-GS pipeline can be run on any satellite imagery. To generate St. Kitts scenes:
1. Source multi-view satellite images of target area
2. Run Skyfall-GS inference (requires GPU, ~8GB VRAM)
3. Output: .PLY file → convert to .SPZ → host as 3D Tiles

**Note:** Skyfall-GS training data is US cities only. Caribbean scenes may need fine-tuning or manual post-processing.

---

## Track 2: Local Scanning (Ground Truth)

### Apps
- **Scaniverse** (Niantic) — Free, iOS LiDAR, on-device gaussian splatting
- **Polycam** — iOS/Android, LiDAR + photogrammetry
- **Luma AI** — iOS, neural radiance fields + gaussian splats
- **Kiri Engine** — Android/iOS, photogrammetry

### Recommended: Scaniverse Workflow

#### Capture
1. Download **Scaniverse** from App Store (iOS with LiDAR recommended)
2. Open app → New Scan → Gaussian Splat
3. Walk around target area (beach, building, landmark)
4. App processes on-device (~1-5 min for small scenes)
5. Export as .PLY or share link

#### Process on Termux
```bash
# Transfer .PLY from phone to Termux (via USB, cloud, or ADB)
# Then convert to SPZ:
python3 scripts/spz_convert.py convert scaniverse_export.ply st_kitts_beach.spz

# Upload to hosting (see below)
```

#### Quality tips
- Scan in good lighting (outdoor: cloudy days best)
- Move slowly, overlap views 50%+
- Avoid reflective surfaces (water, glass)
- Capture from multiple angles + heights
- For large areas: scan in patches, merge later

### Prioritized scan targets for St. Kitts & Nevis

#### Tier 1 (High value)
| Location | Type | Notes |
|----------|------|-------|
| Basseterre waterfront | Urban | Capital city center |
| Brimstone Hill Fortress | Historic | UNESCO World Heritage |
| Frigate Bay Beach | Beach | Main tourist beach |
| Strip (Frigate Bay) | Entertainment | Restaurants, nightlife |

#### Tier 2 (Medium value)
| Location | Type | Notes |
|----------|------|-------|
| Charlestown, Nevis | Town | Historic capital |
| Pinneys Beach | Beach | Nevis main bath |
| Romney Manor | Historic | Caribelle Batik |
| Fairview Historic Park | Historic | First hotel in SKN |

#### Tier 3 (As needed)
- Individual business locations (partner registrations)
- Event venues
- New construction / development sites

---

## Hosting Pipeline

### Option A: Cesium Ion (Recommended for 3D Tiles)
1. Upload .PLY/.SPZ to Cesium Ion (REST API or web)
2. Cesium processes → 3D Tiles tileset with LOD
3. Get `ionAssetId` → set in admin settings
4. Viewer auto-streams with KHR_gaussian_splatting

### Option B: Self-hosted 3D Tiles
1. Convert .PLY → tileset.json + .glb tiles (use `3d-tiles-tools` from Cesium)
2. Host on Render static or CDN
3. Set `tilesetUrl` in admin settings

### Option C: Direct .SPZ (R3F viewer)
1. Host .spz file on any static hosting
2. Set `splat_ply_url` in admin settings (point to .spz)
3. GaussianSplatViewer loads directly via R3F

---

## File Naming Convention

```
{country}_{island}_{location}_{date}_{version}.spz

Examples:
  kn_sk_basseterre_waterfront_20260607_v1.spz
  kn_nv_pinneys_beach_20260607_v1.spz
  kn_sk_brimstone_hill_20260608_v1.spz
```

---

## Integration Checklist

- [ ] Download Skyfall-GS demo scene (jax_004) for testing
- [ ] Convert to SPZ, verify in GaussianSplatViewer
- [ ] Set up Cesium Ion account, upload test tileset
- [ ] Configure admin settings (enable_3d_tiles, ion_asset_id)
- [ ] Test /geospatial page with live data
- [ ] Capture first local scan (Basseterre or Frigate Bay)
- [ ] Process local scan → SPZ → publish
- [ ] Iterate: Skyfall-GS for broad coverage, local scans for detail
