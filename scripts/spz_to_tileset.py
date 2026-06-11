#!/usr/bin/env python3
"""
spz_to_tileset.py — Convert SPZ files to 3D Tiles tileset for CesiumJS rendering.

CesiumJS 1.139+ supports KHR_gaussian_splatting_spz_2 inside glTF payloads
within 3D Tiles tilesets. This script wraps an SPZ file in a minimal tileset.json
that references a glTF with the SPZ extension.

Usage:
    python spz_to_tileset.py input.spz --output-dir ./tileset/
    python spz_to_tileset.py input.spz --output-dir ./tileset/ --georef-lat 17.3026 --georef-lng -62.7248

Requirements:
    - Python 3.10+
    - No external dependencies (uses stdlib only)
    - For SPZ loading: pip install spz (optional, for metadata extraction)

Output:
    tileset.json — 3D Tiles tileset referencing the SPZ-wrapped glTF
    content.glb   — glTF binary with KHR_gaussian_splatting_spz_2 extension
"""

import json
import os
import sys
import struct
import math
import argparse
import hashlib
import base64
from pathlib import Path
from urllib.parse import urlparse


def parse_spz_header(filepath: str) -> dict:
    """Parse SPZ file header to extract metadata."""
    try:
        with open(filepath, "rb") as f:
            # Read first 32 bytes (SPZ header)
            header = f.read(32)
            if len(header) < 32:
                return {}

            # SPZ magic: NGSP (0x4E475350)
            magic = header[0:4]
            if magic != b"NGSP":
                # Try legacy SPZ format (gzip-based)
                return {"format": "legacy_spz", "magic": magic.hex()}

            # Parse SPZ 4.x header
            version = struct.unpack("<I", header[4:8])[0]
            num_points = struct.unpack("<I", header[8:12])[0]
            sh_degree = struct.unpack("<I", header[12:16])[0]
            flags = struct.unpack("<I", header[16:20])[0]

            return {
                "format": "spz4",
                "version": version,
                "num_points": num_points,
                "sh_degree": sh_degree,
                "flags": flags,
            }
    except Exception as e:
        return {"format": "unknown", "error": str(e)}


def compute_bounding_box_georeferenced(
    lat: float, lng: float, radius_meters: float = 200.0
) -> dict:
    """Compute a georeferenced bounding box around a lat/lng point."""
    # Approximate degrees from meters
    lat_offset = radius_meters / 111_320.0
    lng_offset = radius_meters / (111_320.0 * math.cos(math.radians(lat)))

    west = lng - lng_offset
    south = lat - lat_offset
    east = lng + lng_offset
    north = lat + lat_offset

    # Height range (estimate based on typical urban scene)
    height_min = -10.0
    height_max = 100.0

    return {
        "west": west,
        "south": south,
        "east": east,
        "north": north,
        "height_min": height_min,
        "height_max": height_max,
        "center": [
            (west + east) / 2,
            (south + north) / 2,
            (height_min + height_max) / 2,
        ],
        "radius": radius_meters,
    }


def create_gltf_with_spz(
    spz_filepath: str,
    output_path: str,
    lat: float = 0.0,
    lng: float = 0.0,
    spz_url: str = "",
) -> dict:
    """
    Create a glTF 2.0 binary (GLB) that references an SPZ file via
    the KHR_gaussian_splatting_spz_2 extension.

    The glTF contains a single mesh with one primitive that uses
    the gaussian splatting extension. The SPZ data is embedded
    or referenced externally.
    """
    spz_path = Path(spz_filepath)
    spz_size = spz_path.stat().st_size

    # Read SPZ file
    with open(spz_filepath, "rb") as f:
        spz_data = f.read()

    # Build glTF JSON structure
    gltf = {
        "asset": {"version": "2.0", "generator": "spz_to_tileset.py"},
        "scene": 0,
        "scenes": [{"nodes": [0]}],
        "nodes": [
            {
                "name": "GaussianSplat",
                "mesh": 0,
                "translation": [0.0, 0.0, 0.0],
            }
        ],
        "meshes": [
            {
                "primitives": [
                    {
                        "attributes": {"POSITION": 0},
                        "material": 0,
                        "mode": 0,  # POINTS
                        "extensions": {
                            "KHR_gaussian_splatting": {
                                "source": 0
                            }
                        },
                    }
                ]
            }
        ],
        "materials": [
            {
                "name": "SplatMaterial",
                "pbrMetallicRoughness": {
                    "metallicFactor": 0.0,
                    "roughnessFactor": 1.0,
                },
                "doubleSided": True,
                "alphaMode": "BLEND",
            }
        ],
        "accessors": [
            {
                "bufferView": 0,
                "componentType": 5126,  # FLOAT
                "count": 0,  # Will be updated
                "type": "VEC3",
            }
        ],
        "bufferViews": [
            {
                "buffer": 0,
                "byteOffset": 0,
                "byteLength": len(spz_data),
            }
        ],
        "buffers": [{"uri": spz_url or spz_path.name, "byteLength": len(spz_data)}],
        "extensionsUsed": [
            "KHR_gaussian_splatting",
            "KHR_gaussian_splatting_spz_2",
        ],
        "extensions": {
            "KHR_gaussian_splatting_spz_2": {
                "spzData": {"bufferView": 0}
            }
        },
    }

    # Convert glTF JSON to bytes
    json_str = json.dumps(gltf, separators=(",", ":"))
    json_bytes = json_str.encode("utf-8")

    # Pad to 4-byte alignment
    while len(json_bytes) % 4 != 0:
        json_bytes += b" "

    # Pad binary chunk to 4-byte alignment
    bin_bytes = spz_data
    while len(bin_bytes) % 4 != 0:
        bin_bytes += b"\x00"

    # Build GLB header
    # Magic: glTF (0x46546C67)
    # Version: 2
    # Total length
    total_length = 12 + 8 + len(json_bytes) + 8 + len(bin_bytes)

    glb_header = struct.pack("<III", 0x46546C67, 2, total_length)
    json_chunk_header = struct.pack("<II", len(json_bytes), 0x4E4F534A)  # JSON
    bin_chunk_header = struct.pack("<II", len(bin_bytes), 0x004E4942)  # BIN

    # Write GLB
    with open(output_path, "wb") as f:
        f.write(glb_header)
        f.write(json_chunk_header)
        f.write(json_bytes)
        f.write(bin_chunk_header)
        f.write(bin_bytes)

    return {
        "glb_size": total_length,
        "spz_size": spz_size,
        "num_points_estimate": len(spz_data) // 32,  # Rough estimate
    }


def create_tileset_json(
    content_uri: str = "content.glb",
    lat: float = 0.0,
    lng: float = 0.0,
    radius: float = 200.0,
    geometric_error: float = 500.0,
) -> dict:
    """
    Create a 3D Tiles tileset.json that references the SPZ-wrapped glTF.

    The tileset uses a single root tile with the glTF content.
    For production use with large scenes, use Cesium Ion for proper LOD tiling.
    """
    bbox = compute_bounding_box_georeferenced(lat, lng, radius)

    tileset = {
        "asset": {
            "version": "1.1",
            "tilesetVersion": "1.0.0",
            "generator": "spz_to_tileset.py",
        },
        "geometricError": geometric_error,
        "root": {
            "boundingVolume": {
                "region": [
                    math.radians(bbox["west"]),
                    math.radians(bbox["south"]),
                    math.radians(bbox["east"]),
                    math.radians(bbox["north"]),
                    bbox["height_min"],
                    bbox["height_max"],
                ]
            },
            "geometricError": geometric_error,
            "refine": "REPLACE",
            "content": {
                "uri": content_uri,
                "boundingVolume": {
                    "region": [
                        math.radians(bbox["west"]),
                        math.radians(bbox["south"]),
                        math.radians(bbox["east"]),
                        math.radians(bbox["north"]),
                        bbox["height_min"],
                        bbox["height_max"],
                    ]
                },
            },
            "transform": [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1,
            ],
        },
        "extensionsUsed": [
            "3DTILES_content_gltf",
            "KHR_gaussian_splatting",
            "KHR_gaussian_splatting_spz_2",
        ],
    }

    return tileset


def main():
    parser = argparse.ArgumentParser(
        description="Convert SPZ files to 3D Tiles tileset for CesiumJS"
    )
    parser.add_argument("input", help="Input SPZ file path")
    parser.add_argument(
        "--output-dir", "-o", default="./tileset", help="Output directory"
    )
    parser.add_argument(
        "--georef-lat", type=float, default=0.0, help="Georeference latitude"
    )
    parser.add_argument(
        "--georef-lng", type=float, default=0.0, help="Georeference longitude"
    )
    parser.add_argument(
        "--radius", type=float, default=200.0, help="Bounding box radius in meters"
    )
    parser.add_argument(
        "--geometric-error", type=float, default=500.0, help="Geometric error for LOD"
    )
    parser.add_argument(
        "--spz-url", default="", help="External URL for SPZ file (instead of local)"
    )
    args = parser.parse_args()

    input_path = Path(args.input)
    if not input_path.exists():
        print(f"Error: Input file not found: {input_path}")
        sys.exit(1)

    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    # Parse SPZ header
    print(f"Reading SPZ: {input_path}")
    spz_meta = parse_spz_header(str(input_path))
    print(f"  Format: {spz_meta.get('format', 'unknown')}")
    if "num_points" in spz_meta:
        print(f"  Points: {spz_meta['num_points']:,}")
        print(f"  SH degree: {spz_meta.get('sh_degree', 'N/A')}")

    # Create glTF wrapper
    glb_path = output_dir / "content.glb"
    print(f"\nCreating glTF wrapper: {glb_path}")
    glb_info = create_gltf_with_spz(
        str(input_path),
        str(glb_path),
        lat=args.georef_lat,
        lng=args.georef_lng,
        spz_url=args.spz_url,
    )
    print(f"  GLB size: {glb_info['glb_size']:,} bytes")
    print(f"  SPZ size: {glb_info['spz_size']:,} bytes")

    # Create tileset.json
    tileset_path = output_dir / "tileset.json"
    print(f"\nCreating tileset: {tileset_path}")
    tileset = create_tileset_json(
        content_uri="content.glb",
        lat=args.georef_lat,
        lng=args.georef_lng,
        radius=args.radius,
        geometric_error=args.geometric_error,
    )

    with open(tileset_path, "w") as f:
        json.dump(tileset, f, indent=2)

    print(f"  Bounding box: {args.georef_lat}, {args.georef_lng} (±{args.radius}m)")
    print(f"  Geometric error: {args.geometric_error}")

    # Summary
    print(f"\n✓ Tileset created in: {output_dir}")
    print(f"  tileset.json — 3D Tiles tileset")
    print(f"  content.glb  — glTF with KHR_gaussian_splatting_spz_2")
    print(f"\nUsage in CesiumJS:")
    print(f"  const tileset = await Cesium.Cesium3DTileset.fromUrl('tileset.json');")
    print(f"  viewer.scene.primitives.add(tileset);")
    print(f"\nFor production use, upload to Cesium Ion for proper LOD streaming.")


if __name__ == "__main__":
    main()
