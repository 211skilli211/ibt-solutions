'use client';

import { useEffect, useRef, useCallback } from 'react';

interface WebGLFluidProps {
  colors?: string[];
  className?: string;
  interactive?: boolean;
  speed?: number;
}

const vertexShaderSource = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;
  varying vec2 v_uv;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;
  uniform vec3 u_color4;
  
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 5; i++) {
      value += amplitude * snoise(p * frequency);
      frequency *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }
  
  void main() {
    vec2 uv = v_uv;
    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
    vec2 p = uv * aspect;
    float t = u_time * 0.15;
    
    float n1 = fbm(p * 1.5 + vec2(t, t * 0.7));
    float n2 = fbm(p * 2.0 + vec2(-t * 0.8, t * 0.3) + n1 * 0.5);
    float n3 = fbm(p * 0.8 + n2 * 0.3 + vec2(t * 0.2, -t * 0.4));
    
    vec2 mouse = u_mouse * aspect;
    float mouseDist = length(p - mouse);
    float mouseInfluence = smoothstep(0.5, 0.0, mouseDist) * 0.3;
    
    vec3 col = mix(u_color1, u_color2, smoothstep(-0.5, 0.5, n1));
    col = mix(col, u_color3, smoothstep(-0.3, 0.5, n2) * (0.6 + mouseInfluence));
    col = mix(col, u_color4 * 1.2, smoothstep(-0.2, 0.6, n3) * 0.35);
    
    float brightness = 0.85 + 0.15 * snoise(p * 3.0 + t * 0.5);
    col *= brightness;
    
    float vignette = 1.0 - smoothstep(0.4, 1.4, length(uv - 0.5) * 2.0);
    col *= vignette * 0.3 + 0.7;
    col = clamp(col, 0.0, 1.0);
    
    gl_FragColor = vec4(col, 1.0);
  }
`;

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ] : [0, 0, 0];
}

export default function WebGLFluidIBT({
  colors = ['#0c4a6e', '#0369a1', '#0284c7', '#38bdf8'],
  className = '',
  interactive = false,
  speed = 1,
}: WebGLFluidProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const startTimeRef = useRef(Date.now());

  const initGL = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return false;
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, preserveDrawingBuffer: false, powerPreference: 'low-power' });
    if (!gl) return false;
    glRef.current = gl;

    const compileShader = (type: number, source: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, source);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error('Shader error:', gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    };

    const vs = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vs || !fs) return false;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return false;

    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    // Clean up shaders after link
    gl.deleteShader(vs);
    gl.deleteShader(fs);

    return true;
  }, []);

  const render = useCallback(() => {
    const gl = glRef.current;
    const canvas = canvasRef.current;
    if (!gl || !canvas) return;

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    gl.viewport(0, 0, w, h);

    const prog = gl.getParameter(gl.CURRENT_PROGRAM);
    const t = (Date.now() - startTimeRef.current) / 1000;

    gl.uniform1f(gl.getUniformLocation(prog, 'u_time'), t * speed);
    gl.uniform2f(gl.getUniformLocation(prog, 'u_resolution'), w, h);
    gl.uniform2f(gl.getUniformLocation(prog, 'u_mouse'), mouseRef.current.x, mouseRef.current.y);

    const c = colors;
    gl.uniform3fv(gl.getUniformLocation(prog, 'u_color1'), hexToRgb(c[0] || '#0c4a6e'));
    gl.uniform3fv(gl.getUniformLocation(prog, 'u_color2'), hexToRgb(c[1] || '#0369a1'));
    gl.uniform3fv(gl.getUniformLocation(prog, 'u_color3'), hexToRgb(c[2] || '#0284c7'));
    gl.uniform3fv(gl.getUniformLocation(prog, 'u_color4'), hexToRgb(c[3] || '#38bdf8'));

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    animRef.current = requestAnimationFrame(render);
  }, [colors, speed]);

  useEffect(() => {
    if (!initGL()) return;
    startTimeRef.current = Date.now();
    render();
    return () => cancelAnimationFrame(animRef.current);
  }, [initGL, render]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !interactive) return;
    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) / rect.width;
      mouseRef.current.y = 1.0 - (e.clientY - rect.top) / rect.height;
    };
    canvas.addEventListener('mousemove', handleMove);
    return () => canvas.removeEventListener('mousemove', handleMove);
  }, [interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ opacity: 1 }}
    />
  );
}
