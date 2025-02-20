/** @jsxImportSource react */

import { qwikify$ } from "@builder.io/qwik-react";

import { Renderer, Program, Mesh, Color, Triangle } from "ogl";
import { useEffect, useRef } from "react";

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
uniform vec3 uColorStops[7];
uniform vec2 uResolution;

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

vec3 getRainbowColor(float t) {
    ColorStop colors[8];
    // Add first color again at the end to create seamless loop
    for(int i = 0; i < 7; i++) {
        colors[i] = ColorStop(uColorStops[i], float(i) / 7.0);
    }
    colors[7] = ColorStop(uColorStops[0], 1.0);
    
    float scaledT = t * 7.0;
    int index = int(floor(scaledT));
    float lerpFactor = fract(scaledT);
    
    // Ensure we stay within array bounds
    index = index % 7;
    
    return mix(colors[index].color, colors[index + 1].color, lerpFactor);
}

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    
    float noiseScale = 2.0;
    float timeScale = 0.1;
    float heightScale = 0.5;
    
    float height = snoise(vec2(uv.x * noiseScale + uTime * timeScale, uTime * 0.25)) 
                   * heightScale 
                   * uAmplitude;
    height = exp(height);
    height = (uv.y * 2.0 - height + 0.2);

    vec3 rainbowColor = getRainbowColor(mod(uv.x + uTime * 0.1, 1.0));
    
    fragColor.rgb = 0.6 * height * rainbowColor;
    fragColor.a = 1.0;
}
`;

interface AuroraPropType {
  colorStops?: Array<string>;
  amplitude?: number;
  speed?: number;
  time?: number;
}

const Aurora = (props: AuroraPropType) => {
  const {
    colorStops = [
      "#FF0000",
      "#FF7F00",
      "#FFFF00",
      "#00FF00",
      "#0000FF",
      "#4B0082",
      "#8F00FF",
    ],
    amplitude = 1.0,
  } = props;
  const propsRef = useRef(props);
  propsRef.current = props;

  const ctnDom: any = useRef(null);

  useEffect(() => {
    const ctn: any = ctnDom.current;
    if (!ctn) return;

    const renderer = new Renderer();
    const gl = renderer.gl;
    gl.clearColor(1, 1, 1, 1);

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    const colorStopsArray = colorStops.map((hex) => {
      const c = new Color(hex);
      return [c.r, c.g, c.b];
    });

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColorStops: { value: colorStopsArray },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
      },
    });

    function resize() {
      if (!ctn) return;
      const width = ctn.offsetWidth;
      const height = ctn.offsetHeight;
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [width, height];
    }
    window.addEventListener("resize", resize);

    const mesh = new Mesh(gl, { geometry, program });
    ctn.appendChild(gl.canvas);

    let animateId = 0;
    const update = (t: number) => {
      animateId = requestAnimationFrame(update);
      const { time = t * 0.01, speed = 1.0 } = propsRef.current;
      program.uniforms.uTime.value = time * speed * 0.1;
      program.uniforms.uAmplitude.value = propsRef.current.amplitude ?? 1.0;
      const stops = propsRef.current.colorStops ?? colorStops;
      program.uniforms.uColorStops.value = stops.map((hex) => {
        const c = new Color(hex);
        return [c.r, c.g, c.b];
      });
      renderer.render({ scene: mesh });
    };
    animateId = requestAnimationFrame(update);

    resize();

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener("resize", resize);
      if (ctn && gl.canvas.parentNode === ctn) {
        ctn.removeChild(gl.canvas);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [amplitude]);

  return <div ref={ctnDom} className="aurora-container" />;
};

export default qwikify$(Aurora);
