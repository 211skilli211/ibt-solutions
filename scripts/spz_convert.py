#!/usr/bin/env python3
"""
spz_convert.py — Convert 3D Gaussian Splat PLY files to SPZ format.

SPZ is Niantic's open compression format for 3DGS, now a Khronos royalty-free standard.
Uses advanced quantization + gzip to achieve ~90% size reduction vs PLY.

SPZ format spec (v2.0):
  Header: magic "SPZ\0" (4 bytes) + version (4) + num_points (4) + sh_degree (4) +
          fractional_bits (4) + flags (4) + reserved (4) = 28 bytes
  Then: positions (quantized int32), scales (uint8), rotations (uint8),
        colors (uint8 RGBA), spherical harmonics (optional)

Usage:
  python3 spz_convert.py input.ply output.spz
  python3 spz_convert.py --from-skyfall jax_004
  python3 spz_convert.py input.ply output.spz --sh-degree 3
"""

import struct
import gzip
import json
import argparse
import sys
from pathlib import Path

# ─── Constants ────────────────────────────────────────────────────────────────

SPZ_MAGIC = b"SPZ\0"
SPZ_VERSION = 2
DEFAULT_FRACTIONAL_BITS = 12
MAX_SH_DEGREE = 3
DEFAULT_SCALE_FACTOR = 0.3

# SH coefficients per channel per degree:
# degree 0: 1 coeff, degree 1: 3 coeffs, degree 2: 5 coeffs, degree 3: 7 coeffs
SH_COEFFS_PER_DEGREE = {0: 1, 1: 3, 2: 5, 3: 7}


# ─── PLY Parser ──────────────────────────────────────────────────────────────

class PLYData:
    """Parsed 3DGS PLY file."""

    def __init__(self):
        self.positions: list[tuple[float, float, float]] = []
        self.scales: list[tuple[float, float, float]] = []
        self.rotations: list[tuple[float, float, float, float]] = []
        self.colors: list[tuple[float, float, float, float]] = []  # RGBA 0-1
        self.sh_dc: list[tuple[float, float, float]] = []  # DC spherical harmonics
        self.sh_rest: list[list[float]] = []  # Rest of SH coefficients
        self.count: int = 0


def parse_ply(path: str) -> PLYData:
    """Parse a binary or ASCII 3DGS PLY file."""
    data = PLYData()
    raw = Path(path).read_bytes()

    # Find header end
    header_end_marker = b"end_header\n"
    idx = raw.find(header_end_marker)
    if idx == -1:
        header_end_marker = b"end_header\r\n"
        idx = raw.find(header_end_marker)
    if idx == -1:
        raise ValueError("PLY: could not find end_header")

    header_raw = raw[:idx].decode("ascii", errors="replace")
    bin_data = raw[idx + len(header_end_marker) :]

    # Parse header
    lines = [l.strip() for l in header_raw.split("\n") if l.strip()]
    if lines[0] != "ply":
        raise ValueError(f"Not a PLY file: starts with '{lines[0]}'")

    format_type = "ascii"
    vertex_count = 0
    properties: list[tuple[str, str]] = []  # (type, name)

    for line in lines[1:]:
        parts = line.split()
        if parts[0] == "format":
            format_type = parts[1]
        elif parts[0] == "element" and parts[1] == "vertex":
            vertex_count = int(parts[2])
        elif parts[0] == "property":
            prop_type = parts[1]
            prop_name = parts[2]
            properties.append((prop_type, prop_name))

    data.count = vertex_count
    if vertex_count == 0:
        raise ValueError("PLY: no vertices found")

    # Build property index
    prop_idx: dict[str, int] = {}
    for i, (_, name) in enumerate(properties):
        prop_idx[name] = i

    # Parse vertices
    is_little_endian = format_type in ("binary_little_endian", "1.0")
    endian = "<" if is_little_endian else ">"

    if format_type == "ascii":
        _parse_ascii(data, bin_data.decode("ascii", errors="replace"), prop_idx, vertex_count)
    else:
        _parse_binary(data, bin_data, prop_idx, vertex_count, endian)

    return data


def _parse_ascii(data: PLYData, text: str, prop_idx: dict, count: int):
    """Parse ASCII PLY vertices."""
    lines = text.strip().split("\n")
    for i in range(min(count, len(lines))):
        vals = lines[i].strip().split()
        _extract_fields(data, vals, prop_idx)


def _parse_binary(data: PLYData, raw: bytes, prop_idx: dict, count: int, endian: str):
    """Parse binary PLY vertices. Assumes all float32 properties."""
    # Calculate stride: each vertex has N float32 properties
    num_props = len(prop_idx)
    stride = num_props * 4
    fmt = f"{endian}{num_props}f"

    for i in range(count):
        offset = i * stride
        if offset + stride > len(raw):
            break
        vals = struct.unpack_from(fmt, raw, offset)
        _extract_fields(data, [str(v) for v in vals], prop_idx)


def _extract_fields(data: PLYData, vals: list[str], prop_idx: dict):
    """Extract position, scale, rotation, color, SH from parsed values."""
    def get(name: str, default: float = 0.0) -> float:
        i = prop_idx.get(name)
        return float(vals[i]) if i is not None and i < len(vals) else default

    def get3(names: tuple, defaults: tuple) -> tuple[float, float, float]:
        return tuple(get(n, d) for n, d in zip(names, defaults))

    # Position
    px = get("x")
    py = get("y")
    pz = get("z")
    data.positions.append((px, py, pz))

    # Scale
    sx = get("scale_0", 0.01)
    sy = get("scale_1", 0.01)
    sz = get("scale_2", 0.01)
    data.scales.append((sx, sy, sz))

    # Rotation (quaternion)
    r0 = get("rot_0", 0.0)
    r1 = get("rot_1", 0.0)
    r2 = get("rot_2", 0.0)
    r3 = get("rot_3", 1.0)
    data.rotations.append((r0, r1, r2, r3))

    # Color — try f_dc_* first (33GS format), then red/green/blue
    f_dc_0 = prop_idx.get("f_dc_0")
    if f_dc_0 is not None and f_dc_0 < len(vals):
        # 33GS stores color as SH DC: (val + 1) / 2 * 255 → normalize to 0-1
        r = max(0.0, min(1.0, (get("f_dc_0") + 1.0) / 2.0))
        g = max(0.0, min(1.0, (get("f_dc_1") + 1.0) / 2.0))
        b = max(0.0, min(1.0, (get("f_dc_2") + 1.0) / 2.0))
    else:
        r = get("red") / 255.0 if "red" in prop_idx else 0.5
        g = get("green") / 255.0 if "green" in prop_idx else 0.5
        b = get("blue") / 255.0 if "blue" in prop_idx else 0.5

    alpha = get("alpha") / 255.0 if "alpha" in prop_idx else 1.0
    data.colors.append((r, g, b, alpha))

    # SH DC coefficients
    sh_dc = get3(
        ("f_dc_0", "f_dc_1", "f_dc_2"),
        (0.0, 0.0, 0.0)
    )
    data.sh_dc.append(sh_dc)

    # SH rest coefficients (if present)
    rest_coeffs = []
    rest_idx = 0
    while f"f_rest_{rest_idx}" in prop_idx:
        rest_coeffs.append(get(f"f_rest_{rest_idx}"))
        rest_idx += 1
    data.sh_rest.append(rest_coeffs)


# ─── SPZ Writer ──────────────────────────────────────────────────────────────

def write_spz(data: PLYData, path: str, sh_degree: int = 3, fractional_bits: int = 12,
              scale_factor: float = 0.3):
    """
    Write SPZ v2 format.
    
    Quantization:
    - Positions: int32 with fractional_bits precision
    - Scales: uint8, mapped via scale_factor
    - Rotations: uint8, normalized quaternions mapped to 0-255
    - Colors: uint8 RGBA
    - SH: int16 per coefficient
    """
    num_points = data.count

    # Compute bounding box for position quantization
    if data.positions:
        min_x = min(p[0] for p in data.positions)
        min_y = min(p[1] for p in data.positions)
        min_z = min(p[2] for p in data.positions)
        max_x = max(p[0] for p in data.positions)
        max_y = max(p[1] for p in data.positions)
        max_z = max(p[2] for p in data.positions)
    else:
        min_x = min_y = min_z = max_x = max_y = max_z = 0.0

    range_x = max(max_x - min_x, 1e-6)
    range_y = max(max_y - min_y, 1e-6)
    range_z = max(max_z - min_z, 1e-6)

    # Spherical harmonics coefficient count
    sh_coeffs = sum(SH_COEFFS_PER_DEGREE.get(d, 0) for d in range(sh_degree + 1))
    sh_total = sh_coeffs * 3  # RGB channels

    # Flags: bit 0 = has SH, bit 1 = compressed
    flags = 0x03  # has SH + compressed

    # ── Build uncompressed payload ─────────────────────────────────────────
    payload = bytearray()

    # Positions: quantized to int32 (little-endian)
    scale_pos = (2**fractional_bits - 1)
    for px, py, pz in data.positions:
        qx = int((px - min_x) / range_x * scale_pos)
        qy = int((py - min_y) / range_y * scale_pos)
        qz = int((pz - min_z) / range_z * scale_pos)
        qx = max(0, min(scale_pos, qx))
        qy = max(0, min(scale_pos, qy))
        qz = max(0, min(scale_pos, qz))
        payload.extend(struct.pack("<iii", qx, qy, qz))

    # Scales: uint8, mapped via log scale
    for sx, sy, sz in data.scales:
        # Convert scale to opacity-like uint8
        lsx = int(max(0, min(255, (abs(sx) / scale_factor) * 127)))
        lsy = int(max(0, min(255, (abs(sy) / scale_factor) * 127)))
        lsz = int(max(0, min(255, (abs(sz) / scale_factor) * 127)))
        payload.extend(struct.pack("BBB", lsx, lsy, lsz))

    # Rotations: uint8 quaternion (normalized, mapped from [-1,1] to [0,255])
    for r0, r1, r2, r3 in data.rotations:
        # Normalize
        mag = (r0**2 + r1**2 + r2**2 + r3**2) ** 0.5
        if mag < 1e-8:
            r0, r1, r2, r3 = 0.0, 0.0, 0.0, 1.0
        else:
            r0, r1, r2, r3 = r0 / mag, r1 / mag, r2 / mag, r3 / mag
        qr0 = int(max(0, min(255, (r0 + 1.0) / 2.0 * 255)))
        qr1 = int(max(0, min(255, (r1 + 1.0) / 2.0 * 255)))
        qr2 = int(max(0, min(255, (r2 + 1.0) / 2.0 * 255)))
        qr3 = int(max(0, min(255, (r3 + 1.0) / 2.0 * 255)))
        payload.extend(struct.pack("BBBB", qr0, qr1, qr2, qr3))

    # Colors: uint8 RGBA
    for r, g, b, a in data.colors:
        cr = int(max(0, min(255, r * 255)))
        cg = int(max(0, min(255, g * 255)))
        cb = int(max(0, min(255, b * 255)))
        ca = int(max(0, min(255, a * 255)))
        payload.extend(struct.pack("BBBB", cr, cg, cb, ca))

    # Spherical harmonics: int16 per coefficient
    for dc in data.sh_dc:
        for c in dc:
            cs = int(max(-32768, min(32767, c * 1000)))  # Scale up for precision
            payload.extend(struct.pack("<h", cs))

    for rest in data.sh_rest:
        for c in rest[: max(0, sh_total - 3)]:  # -3 for DC already written
            cs = int(max(-32768, min(32767, c * 1000)))
            payload.extend(struct.pack("<h", cs))

    # ── Compress with gzip ─────────────────────────────────────────────────
    compressed = gzip.compress(bytes(payload), compresslevel=9)

    # ── Write file ─────────────────────────────────────────────────────────
    with open(path, "wb") as f:
        # Header (28 bytes)
        f.write(SPZ_MAGIC)
        f.write(struct.pack("<IIIIIIi",
            SPZ_VERSION,
            num_points,
            sh_degree,
            fractional_bits,
            flags,
            0,  # reserved
            -1,  # no explicit length (use EOF)
        ))
        # Bounding box (6 floats)
        f.write(struct.pack("<ffffff", min_x, min_y, min_z, max_x, max_y, max_z))
        # Compressed payload
        f.write(compressed)

    input_size = sum([
        len(data.positions) * 12,
        len(data.scales) * 12,
        len(data.rotations) * 16,
        len(data.colors) * 4,
    ])
    output_size = Path(path).stat().st_size
    ratio = (1 - output_size / max(input_size, 1)) * 100 if input_size > 0 else 0

    return {
        "points": num_points,
        "input_bytes": input_size,
        "output_bytes": output_size,
        "compression_ratio": ratio,
        "sh_degree": sh_degree,
    }


# ─── Skyfall-GS Downloader ───────────────────────────────────────────────────

def download_skyfall_ply(scene_id: str, output_dir: str = ".") -> str:
    """
    Download a PLY file from Skyfall-GS HuggingFace Hub.
    
    Skyfall-GS hosts .PLY files at:
    https://huggingface.co/jayinnn/Skyfall-GS-ply/resolve/main/{scene_id}.ply
    
    Scene IDs: jax_004, jax_068, jax_214, jax_260, jax_164, jax_168, jax_175, jax_264,
               nyc_004, nyc_010, nyc_219, nyc_336
    """
    import urllib.request
    import ssl

    hf_url = f"https://huggingface.co/jayinnn/Skyfall-GS-ply/resolve/main/{scene_id}.ply"
    out_path = Path(output_dir) / f"{scene_id}.ply"

    print(f"Downloading Skyfall-GS scene: {scene_id}")
    print(f"  Source: {hf_url}")
    print(f"  Output: {out_path}")

    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    req = urllib.request.Request(hf_url, headers={"User-Agent": "SPZ-Convert/1.0"})

    with urllib.request.urlopen(req, context=ctx, timeout=120) as resp:
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

    size_mb = out_path.stat().st_size / (1024 * 1024)
    print(f"\n  Downloaded: {size_mb:.1f} MB")
    return str(out_path)


# ─── CLI ─────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Convert 3D Gaussian Splat PLY files to SPZ format (Niantic/Khronos standard)"
    )
    sub = parser.add_subparsers(dest="command", help="Command")

    # Convert command
    conv = sub.add_parser("convert", help="Convert a PLY file to SPZ")
    conv.add_argument("input", help="Input .ply file path")
    conv.add_argument("output", nargs="?", help="Output .spz file path (auto if omitted)")
    conv.add_argument("--sh-degree", type=int, default=3, choices=range(0, 4),
                      help="Spherical harmonic degree (default: 3)")
    conv.add_argument("--fractional-bits", type=int, default=12,
                      help="Position quantization bits (default: 12)")
    conv.add_argument("--scale-factor", type=float, default=0.3,
                      help="Scale mapping factor (default: 0.3)")

    # Skyfall command
    sky = sub.add_parser("skyfall", help="Download PLY from Skyfall-GS and convert")
    sky.add_argument("scene", help="Skyfall-GS scene ID (e.g., jax_004)")
    sky.add_argument("--output-dir", default=".", help="Output directory")
    sky.add_argument("--keep-ply", action="store_true", help="Keep the original PLY")

    # Info command
    info = sub.add_parser("info", help="Show info about a PLY file")
    info.add_argument("input", help="Input .ply file path")

    # List command
    sub.add_parser("list", help="List available Skyfall-GS scenes")

    args = parser.parse_args()

    if args.command == "list":
        scenes = [
            ("jax_004", "Residential (Jacksonville)"),
            ("jax_068", "H Building (Jacksonville)"),
            ("jax_214", "Office Building (Jacksonville)"),
            ("jax_260", "Lake Side (Jacksonville)"),
            ("jax_164", "City Hall (Jacksonville)"),
            ("jax_168", "Villa (Jacksonville)"),
            ("jax_175", "Stadium (Jacksonville)"),
            ("jax_264", "Factory (Jacksonville)"),
            ("nyc_004", "World Financial Center (NYC)"),
            ("nyc_010", "Union Square (NYC)"),
            ("nyc_219", "E 12th St (NYC)"),
            ("nyc_336", "Albany St (NYC)"),
        ]
        print("Available Skyfall-GS scenes:")
        print(f"  {'ID':<12} {'Description'}")
        print(f"  {'--':<12} {'-----------'}")
        for sid, desc in scenes:
            print(f"  {sid:<12} {desc}")
        print(f"\n  Source: https://huggingface.co/jayinnn/Skyfall-GS-ply")
        print(f"  Paper:  https://arxiv.org/abs/2510.15869")
        return

    if args.command == "info":
        data = parse_ply(args.input)
        print(f"PLY File: {args.input}")
        print(f"  Vertices:  {data.count:,}")
        print(f"  Has SH DC: {len(data.sh_dc) > 0}")
        print(f"  SH Rest:   {len(data.sh_rest[0]) if data.sh_rest else 0} coefficients")
        if data.positions:
            xs = [p[0] for p in data.positions]
            ys = [p[1] for p in data.positions]
            zs = [p[2] for p in data.positions]
            print(f"  Bounds X:  [{min(xs):.3f}, {max(xs):.3f}]")
            print(f"  Bounds Y:  [{min(ys):.3f}, {max(ys):.3f}]")
            print(f"  Bounds Z:  [{min(zs):.3f}, {max(zs):.3f}]")
        return

    if args.command == "convert":
        output = args.output or args.input.replace(".ply", ".spz")
        if not args.input.endswith(".ply"):
            print("Error: input must be a .ply file", file=sys.stderr)
            sys.exit(1)

        print(f"Converting: {args.input} → {output}")
        print(f"  SH degree: {args.sh_degree}, fractional bits: {args.fractional_bits}")

        data = parse_ply(args.input)
        print(f"  Parsed {data.count:,} gaussian splats")

        result = write_spz(data, output, args.sh_degree, args.fractional_bits, args.scale_factor)

        print(f"\n  Done!")
        print(f"  Output:    {result['output_bytes']:,} bytes")
        print(f"  Input est: {result['input_bytes']:,} bytes")
        print(f"  Compression: {result['compression_ratio']:.1f}%")
        return

    if args.command == "skyfall":
        ply_path = download_skyfall_ply(args.scene, args.output_dir)
        spz_path = ply_path.replace(".ply", ".spz")

        print(f"\nConverting to SPZ: {spz_path}")
        data = parse_ply(ply_path)
        print(f"  Parsed {data.count:,} gaussian splats")

        result = write_spz(data, spz_path)

        print(f"\n  Done!")
        print(f"  SPZ size: {result['output_bytes']:,} bytes ({result['output_bytes'] / 1024 / 1024:.1f} MB)")
        print(f"  Compression: {result['compression_ratio']:.1f}%")

        if not args.keep_ply:
            Path(ply_path).unlink()
            print(f"  Removed: {ply_path}")
        else:
            print(f"  Kept: {ply_path}")

        return

    parser.print_help()


if __name__ == "__main__":
    main()
