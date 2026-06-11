import React, { useEffect, useRef, useState } from 'react';
import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ), 
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {              \
  int index = 0;                                            \
  for (int i = 0; i < 2; i++) {                               \
     ColorStop currentColor = colors[i];                    \
     bool isInBetween = currentColor.position <= factor;    \
     index = int(mix(float(index), float(i), float(isInBetween))); \
  }                                                         \
  ColorStop currentColor = colors[index];                   \
  ColorStop nextColor = colors[index + 1];                  \
  float range = nextColor.position - currentColor.position; \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  
  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);
  
  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);
  
  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;
  
  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
  
  vec3 auroraColor = intensity * rampColor;
  
  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`;

interface AuroraProps {
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  time?: number;
  speed?: number;
}

// Background component that manages OGL WebGL rendering
function AuroraBackground({ 
  colorStops = ['#5227FF', '#7cff67', '#5227FF'], 
  amplitude = 1.0, 
  blend = 0.5,
  speed = 1.0,
  time
}: AuroraProps) {
  const propsRef = useRef<AuroraProps>({ colorStops, amplitude, blend, speed, time });
  propsRef.current = { colorStops, amplitude, blend, speed, time };

  const ctnDom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.backgroundColor = 'transparent';

    let program: Program | undefined;

    function resize() {
      if (!ctn) return;
      const width = ctn.offsetWidth;
      const height = ctn.offsetHeight;
      renderer.setSize(width, height);
      if (program) {
        program.uniforms.uResolution.value = [width, height];
      }
    }
    window.addEventListener('resize', resize);

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    const colorStopsArray = colorStops.map(hex => {
      const c = new Color(hex);
      return [c.r, c.g, c.b];
    });

    program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColorStops: { value: colorStopsArray },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uBlend: { value: blend }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });
    ctn.appendChild(gl.canvas);

    let animateId = 0;
    const update = (t: number) => {
      animateId = requestAnimationFrame(update);
      const currentProps = propsRef.current;
      const tVal = currentProps.time ?? t * 0.01;
      const sVal = currentProps.speed ?? 1.0;
      
      if (program) {
        program.uniforms.uTime.value = tVal * sVal * 0.1;
        program.uniforms.uAmplitude.value = currentProps.amplitude ?? 1.0;
        program.uniforms.uBlend.value = currentProps.blend ?? blend;
        const stops = currentProps.colorStops ?? colorStops;
        program.uniforms.uColorStops.value = stops.map((hex: string) => {
          const c = new Color(hex);
          return [c.r, c.g, c.b];
        });
        renderer.render({ scene: mesh });
      }
    };
    animateId = requestAnimationFrame(update);

    resize();

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener('resize', resize);
      if (ctn && gl.canvas.parentNode === ctn) {
        ctn.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [amplitude, blend]);

  return <div ref={ctnDom} className="w-full h-full" />;
}

interface MiddleCallToActionProps extends AuroraProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  children?: React.ReactNode;
}

export default function MiddleCallToAction({
  colorStops = ['#7cff67', '#B497CF', '#5227FF'],
  amplitude = 1.0,
  blend = 0.5,
  speed = 1.0,
  time,
  title = "Tu productividad, potenciada al máximo",
  subtitle = "Atelier v11 introduce nuevas y potentes funciones de IA para llevar tu taller al siguiente nivel",
  buttonText = "Descubre más",
  children
}: MiddleCallToActionProps) {
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    const initial = localStorage.getItem('atelier-lang') || 'en';
    setCurrentLang(initial);

    const handleLangChange = (e: any) => {
      setCurrentLang(e.detail.lang);
    };
    window.addEventListener('languagechange', handleLangChange);
    return () => window.removeEventListener('languagechange', handleLangChange);
  }, []);

  const content = {
    es: {
      title: title,
      subtitle: subtitle,
      buttonText: buttonText
    },
    en: {
      title: "Your profitability, fully maximized",
      subtitle: "Atelier introduces powerful new telemetry features to take your workshop to another level.",
      buttonText: "Register now"
    }
  };

  const activeText = content[currentLang as 'es' | 'en'];

  return (
    <div className="relative w-full overflow-hidden bg-[#111] py-28 px-6 md:py-36 md:px-12 flex flex-col items-center justify-center text-center my-8 select-none">
      
      {/* Background Aurora WebGL Animation */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-45 mix-blend-screen z-0">
        <AuroraBackground 
          colorStops={colorStops} 
          amplitude={amplitude} 
          blend={blend} 
          speed={speed} 
          time={time} 
        />
      </div>

      {/* Overlay Content Card matching Evernote style */}
      <div className="relative z-10 max-w-4xl flex flex-col items-center gap-10">
        <h2 className="font-['Mona_Sans'] text-3xl md:text-4xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] text-pretty">
          {activeText.title}
        </h2>
        
        <p className="font-['Arimo'] text-[#fff] text-2xl md:text-3xl max-w-4xl leading-relaxed text-pretty">
          {activeText.subtitle}
        </p>

        {/* Children element injection (if any) */}
        {children && (
          <div className="text-gray-400 font-['Arimo']">
            {children}
          </div>
        )}

        {/* Custom Lime/Evernote green CTA button */}
        <button className="w-full md:w-auto mt-4 px-16 py-4 bg-[#0071eb] hover:bg-[#004FA6] text-white font-semibold text-lg rounded-md transition-all hover:scale-[1.02] active:scale-[0.98] duration-200 cursor-pointer font-['Arimo'] text-xl lg:text-2xl">
          {activeText.buttonText}
        </button>
      </div>

    </div>
  );
}
