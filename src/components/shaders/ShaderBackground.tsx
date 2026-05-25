'use client';

import { useMemo, useId, useState, useEffect, useRef } from 'react';
import { SHADERS, type ShaderConfig } from './shaderRegistry';
import WebGLFluid from './webgl/WebGLFluid';

interface ShaderBackgroundProps {
  shader: string;
  colors?: string[];
  opacity?: number;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  speed?: number;
}

export default function ShaderBackground({
  shader,
  colors,
  opacity = 1,
  children,
  className = '',
  interactive = false,
  speed = 1,
}: ShaderBackgroundProps) {
  const config: ShaderConfig | undefined = SHADERS[shader];
  const resolvedColors = colors || config?.defaultColors || ['#0f766e', '#06b6d4', '#8b5cf6', '#ec4899'];
  const uid = useId().replace(/:/g, '');

  const cssVars = useMemo(() => ({
    '--s1': resolvedColors[0],
    '--s2': resolvedColors[1],
    '--s3': resolvedColors[2],
    '--s4': resolvedColors[3],
  } as React.CSSProperties), [resolvedColors]);

  // Build scoped CSS from the shader config
  const scopedCss = useMemo(() => {
    if (!config) return '';
    // Scope all class names to this instance
    let css = config.css
      .replace(/\.shader-[a-z]+/g, `.shader-${shader}-${uid}`)
      .replace(/@keyframes\s+([a-z-]+)/g, `@keyframes $1-${uid}`);

    // Apply speed multiplier
    if (speed !== 1) {
      css = css.replace(/(\d+(?:\.\d+)?)s\s+(ease|linear|infinite|alternate|forwards|backwards)/g,
        (_match, dur: string, rest: string) => {
          const newDur = (parseFloat(dur) / speed).toFixed(2);
          return `${newDur}s ${rest}`;
        });
    }

    return css;
  }, [config, shader, uid, speed]);

  // WebGL shader rendering
  const [hasWebGL, setHasWebGL] = useState(false);
  useEffect(() => {
    try {
      const c = document.createElement('canvas');
      setHasWebGL(!!c.getContext('webgl'));
    } catch { setHasWebGL(false); }
  }, []);

  if (!config) {
    return (
      <div className={`relative overflow-hidden bg-slate-900 ${className}`} style={cssVars}>
        {children}
      </div>
    );
  }

  // Use WebGL renderer for webgl shaders
  if (config.webgl && hasWebGL) {
    return (
      <div className={`relative overflow-hidden ${className}`} style={{ opacity }}>
        <WebGLFluid
          colors={resolvedColors}
          interactive={interactive}
          speed={speed}
        />
        {children}
      </div>
    );
  }

  // CSS shader rendering (fallback)
  const wrapperClass = `shader-${shader}-${uid}`;

  return (
    <div
      className={`relative overflow-hidden ${wrapperClass} ${className}`}
      style={{ ...cssVars, opacity }}
    >
      {scopedCss && <style suppressHydrationWarning dangerouslySetInnerHTML={{ __html: scopedCss }} />}
      {children}
    </div>
  );
}
