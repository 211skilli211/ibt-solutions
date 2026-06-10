#!/usr/bin/env python3
"""
skyfall_pipeline.py — Full Skyfall-GS → SPZ → Cesium Ion 3D Tiles pipeline.

Pipeline:
  1. Download PLY from Skyfall-GS (HuggingFace Hub)
  2. Convert PLY → SPZ (Niantic/Khronos compression)
  3. Upload SPZ → Cesium Ion (3D Tiles generation)
  4. Configure IBT geospatial settings with Ion asset ID

Usage:
  python3 skyfall_pipeline.py jax_004 --ion-token YOUR_CESIUM_ION_TOKEN
  python3 skyfall_pipeline.py jax_004 --ion-token TOKEN --keep-ply --output-dir ./scenes
  python3 skyfall_pipeline.py --list-scenes

Skyfall-GS scenes (11 urban):
  Jacksonville: jax_004, jax_068, jax_214, jax_260, jax_164, jax_168, jax_175, jax_264
  NYC:           nyc_004, nyc_010, nyc_219, nyc_336

References:
  Skyfall-GS:    https://huggingface.co/jayinnn/Skyfall-GS-ply
  SPZ format:    https://github.com/nianticlabs/spz
  Cesium Ion:    https://cesium.com/learn/ion/ion-upload/
  TAK 4.4:       https://developer.mil/tak-server
"""

import argparse
import sys
import os
import json
import subprocess
from pathlib import Path

# ─── Scene Registry ───────────────────────────────────────────────────────────

SKYFALL_SCENES = {
    # Jacksonville
    "jax_004": {"city": "Jacksonville", "desc": "Residential area", "size_mb": 45},
    "jax_068": {"city": "Jacksonville", "desc": "H Building downtown", "size_mb": 62},
    "jax_214": {"city": "Jacksonville", "desc": "Office building", "size_mb": 38},
    "jax_260": {"city": "Jacksonville", "desc": "Lake side", "size_mb": 55},
    "jax_164": {"city": "Jacksonville", "desc": "City Hall", "size_mb": 41},
    "jax_168": {"city": "Jacksonville", "desc": "Villa residential", "size_mb": 33},
    "jax_175": {"city": "Jacksonville", "desc": "Stadium", "size_mb": 78},
    "jax_264": {"city": "Jacksonville", "desc": "Factory industrial", "size_mb": 48},
    # NYC
    "nyc_004": {"city": "NYC", "desc": "World Financial Center", "size_mb": 89},
    "nyc_010": {"city": "NYC", "desc": "Union Square", "size_mb": 72},
    "nyc_219": {"city": "NYC", "desc": "E 12th St", "size_mb": 56},
    "nyc_336": {"city": "NYC", "desc": "Albany St", "size_mb": 61},
}

# ─── Pipeline Steps ───────────────────────────────────────────────────────────

def download_skyfall(scene_id: str, output_dir: str) -> str:
    """Step 1: Download PLY from Skyfall-GS HuggingFace Hub."""
    import urllib.request
    import ssl

    hf_url = f"https://huggingface.co/jayinnn/Skyfall-GS-ply/resolve/main/{scene_id}.ply"
    out_path = str(Path(output_dir) / f"{scene_id}.ply")

    print(f"\n[1/4] Downloading Skyfall-GS: {scene_id}")
    print(f"  Source: {hf_url}")
    print(f"  Output: {out_path}")
    print(f"  Expected size: ~{SKYFALL_SCENES.get(scene_id, {}).get('size_mb', '?')} MB")

    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    req = urllib.request.Request(hf_url, headers={"User-Agent": "SkyfallPipeline/1.0"})

    with urllib.request.urlopen(req, context=ctx, timeout=300) as resp:
        if resp.status != 200:
            raise RuntimeError(f"HTTP {resp.status}: {resp.reason}")
        total = resp.headers.get("Content-Length")
        downloaded = 0
        with open(out_path, "wb") as f:
            while True:
                chunk = resp.read(65536)
                if not chunk:
                    break
                f.write(chunk)
                downloaded += len(chunk)
                if total:
                    pct = downloaded / int(total) * 100
                    print(f"\r  Progress: {pct:.1f}% ({downloaded // 1024}KB)", end="", flush=True)

    size_mb = Path(out_path).stat().st_size / (1024 * 1024)
    print(f"\n  Downloaded: {size_mb:.1f} MB")
    return out_path


def convert_ply_to_spz(ply_path: str, spz_path: str) -> dict:
    """Step 2: Convert PLY → SPZ using spz_convert.py."""
    print(f"\n[2/4] Converting PLY → SPZ")
    print(f"  Input:  {ply_path}")
    print(f"  Output: {spz_path}")

    result = subprocess.run(
        [sys.executable, "scripts/spz_convert.py", "convert", ply_path, spz_path,
         "--sh-degree", "3", "--fractional-bits", "12"],
        capture_output=True, text=True
    )

    if result.returncode != 0:
        print(f"  Error: {result.stderr}")
        raise RuntimeError("SPZ conversion failed")

    # Parse output
    lines = result.stdout.strip().split("\n")
    info = {}
    for line in lines:
        if "Compression:" in line:
            info["compression"] = line.split(":")[1].strip()
        elif "Output:" in line:
            info["output_bytes"] = line.split(":")[1].strip()

    spz_size = Path(spz_path).stat().st_size / (1024 * 1024)
    ply_size = Path(ply_path).stat().st_size / (1024 * 1024)
    ratio = (1 - spz_size / ply_size) * 100 if ply_size > 0 else 0

    print(f"  PLY: {ply_size:.1f} MB → SPZ: {spz_size:.1f} MB ({ratio:.0f}% reduction)")
    return info


def upload_to_cesium_ion(spz_path: str, ion_token: str, scene_id: str) -> int:
    """Step 3: Upload SPZ to Cesium Ion for 3D Tiles generation.

    Cesium Ion API:
      POST /v1/assets
      - name: scene_id
      - type: '3DTILES'
      - source: SPZ file (as glTF with KHR_gaussian_splatting extension)

    Returns: Ion asset ID
    """
    print(f"\n[3/4] Uploading to Cesium Ion")
    print(f"  File: {spz_path}")
    print(f"  Token: {ion_token[:8]}...")

    import urllib.request
    import urllib.parse
    import base64
    import json as _json

    # Read SPZ file
    spz_data = Path(spz_path).read_bytes()
    spz_b64 = base64.b64encode(spz_data).decode()

    # Cesium Ion upload API
    # Note: For gaussian splat 3D Tiles, we need to wrap SPZ in a glTF container
    # Cesium Ion supports KHR_gaussian_splatting extension in glTF 2.0
    payload = _json.dumps({
        "name": f"Skyfall-GS {scene_id}",
        "description": f"Skyfall-GS gaussian splat: {SKYFALL_SCENES.get(scene_id, {}).get('desc', scene_id)}",
        "type": "3DTILES",
        "options": {
            "sourceType": "3D_MODEL",  # Will be processed into 3D Tiles
            "position": [0, 0, 0],
            "rotation": [0, 0, 0],
        }
    }).encode()

    # Create asset
    req = urllib.request.Request(
        "https://api.cesium.com/v1/assets",
        data=payload,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {ion_token}",
        },
        method="POST"
    )

    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            result = _json.loads(resp.read())
            upload_url = result.get("uploadLocation", {}).get("uploadLocation", "")
            asset_id = result.get("assetMetadata", {}).get("id", "")
            print(f"  Asset ID: {asset_id}")
            print(f"  Upload URL received")
    except Exception as e:
        print(f"  Warning: Ion API upload failed: {e}")
        print(f"  Manual upload required: https://cesium.com/ion/upload")
        return -1

    # Upload file to the provided URL
    if upload_url:
        upload_req = urllib.request.Request(
            upload_url,
            data=spz_data,
            headers={"Content-Type": "application/octet-stream"},
            method="PUT"
        )
        try:
            with urllib.request.urlopen(upload_req, timeout=300) as resp:
                print(f"  Upload complete: HTTP {resp.status}")
        except Exception as e:
            print(f"  Upload error: {e}")
            return -1

    return int(asset_id) if asset_id else -1


def configure_ibt_settings(ion_asset_id: int, ion_token: str) -> bool:
    """Step 4: Update IBT geospatial settings with new Ion asset ID."""
    print(f"\n[4/4] Configuring IBT geospatial settings")
    print(f"  Ion Asset ID: {ion_asset_id}")

    # This would call the IBT admin API
    # For now, print the SQL/setting that needs to be applied
    print(f"\n  Run this SQL on Neon DB:")
    print(f"  INSERT INTO site_settings (setting_key, setting_value, setting_type, description)")
    print(f"  VALUES ('geospatial_cesium_ion_asset_id', '{ion_asset_id}', 'number', 'Skyfall-GS Cesium Ion asset')")
    print(f"  ON CONFLICT (setting_key) DO UPDATE SET setting_value = '{ion_asset_id}', updated_at = NOW();")
    print(f"\n  Or use the admin API:")
    print(f"  POST /api/geospatial/settings")
    print(f"  Body: {{ \"cesium_ion_asset_id\": {ion_asset_id}, \"enable_3d_tiles\": true }}")

    return True


# ─── TAK 4.4 Integration ─────────────────────────────────────────────────────

def generate_tak_config(ion_asset_id: int, scene_id: str) -> str:
    """Generate TAK 4.4 configuration for 3D Tiles consumption.

    TAK 4.4 (Tactical Assault Kit) supports:
    - 3D Tiles via OGC 3D Tiles API
    - Cesium Ion tilesets as external 3D tile layers
    - Gaussian splat rendering via Cesium plugin

    TAK config format (XML):
    """
    config = f"""<?xml version="1.0" encoding="UTF-8"?>
<!-- TAK 4.4 3D Tiles Configuration for Skyfall-GS {scene_id} -->
<!-- Generated by skyfall_pipeline.py -->
<configuration>
  <layer name="Skyfall-GS {scene_id}" type="3dtiles">
    <source>
      <!-- Cesium Ion 3D Tiles endpoint -->
      <ion assetId="{ion_asset_id}"
           accessToken="${{CESIUM_ION_TOKEN}}"
           url="https://assets.ion.cesium.com/{ion_assetId}/tileset.json"/>
    </source>
    <position lat="17.3578" lon="-62.7830" alt="0"/>
    <display>
      <lod enabled="true" screenSpaceError="16"/>
      <clipping enabled="false"/>
      <lighting enabled="true"/>
    </display>
  </layer>
  <gaussianSplatting>
    <!-- KHR_gaussian_splatting extension support -->
    <enabled>true</enabled>
    <spzCompression>true</spzCompression>
    <maxSplats>5000000</maxSplats>
  </gaussianSplatting>
</configuration>"""
    return config


# ─── Main ────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Skyfall-GS → SPZ → Cesium Ion 3D Tiles pipeline")
    parser.add_argument("scene", nargs="?", help="Skyfall-GS scene ID (e.g., jax_004)")
    parser.add_argument("--ion-token", help="Cesium Ion access token")
    parser.add_argument("--output-dir", default="./scenes", help="Output directory")
    parser.add_argument("--keep-ply", action="store_true", help="Keep original PLY file")
    parser.add_argument("--list-scenes", action="store_true", help="List available Skyfall-GS scenes")
    parser.add_argument("--tak-config", action="store_true", help="Generate TAK 4.4 config")
    parser.add_argument("--skip-upload", action="store_true", help="Skip Cesium Ion upload (convert only)")

    args = parser.parse_args()

    if args.list_scenes:
        print("Available Skyfall-GS scenes:")
        print(f"  {'ID':<12} {'City':<15} {'Description':<30} {'Size'}")
        print(f"  {'--':<12} {'----':<15} {'-----------':<30} {'----'}")
        for sid, info in SKYFALL_SCENES.items():
            print(f"  {sid:<12} {info['city']:<15} {info['desc']:<30} ~{info['size_mb']} MB")
        print(f"\n  Source: https://huggingface.co/jayinnn/Skyfall-GS-ply")
        print(f"  Paper:  https://arxiv.org/abs/2510.15869")
        print(f"  Web:    https://skyfall-gs.jayinnn.dev")
        return

    if not args.scene:
        parser.print_help()
        sys.exit(1)

    scene_id = args.scene
    if scene_id not in SKYFALL_SCENES:
        print(f"Warning: '{scene_id}' not in known scenes list, proceeding anyway")

    output_dir = args.output_dir
    Path(output_dir).mkdir(parents=True, exist_ok=True)

    # Step 1: Download
    ply_path = download_skyfall(scene_id, output_dir)

    # Step 2: Convert
    spz_path = str(Path(output_dir) / f"{scene_id}.spz")
    convert_ply_to_spz(ply_path, spz_path)

    # Step 3: Upload to Cesium Ion
    ion_asset_id = -1
    if not args.skip_upload:
        if not args.ion_token:
            print("\n[3/4] Skipping Cesium Ion upload (no --ion-token provided)")
            print("  To upload later:")
            print(f"  python3 skyfall_pipeline.py {scene_id} --ion-token YOUR_TOKEN")
        else:
            ion_asset_id = upload_to_cesium_ion(spz_path, args.ion_token, scene_id)

    # Step 4: Configure settings
    if ion_asset_id > 0:
        configure_ibt_settings(ion_asset_id, args.ion_token or "")

    # Generate TAK config
    if args.tak_config and ion_asset_id > 0:
        tak_xml = generate_tak_config(ion_asset_id, scene_id)
        tak_path = str(Path(output_dir) / f"{scene_id}_tak_config.xml")
        Path(tak_path).write_text(tak_xml)
        print(f"\n  TAK 4.4 config saved: {tak_path}")

    # Cleanup
    if not args.keep_ply and Path(ply_path).exists():
        Path(ply_path).unlink()
        print(f"\n  Cleaned up: {ply_path}")

    print(f"\n{'='*60}")
    print(f"Pipeline complete for scene: {scene_id}")
    print(f"  SPZ: {spz_path}")
    if ion_asset_id > 0:
        print(f"  Cesium Ion Asset ID: {ion_asset_id}")
        print(f"  3D Tiles URL: https://assets.ion.cesium.com/{ion_asset_id}/tileset.json")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
