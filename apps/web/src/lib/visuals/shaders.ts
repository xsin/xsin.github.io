/* GLSL sources for the WebGL experiments, ported from prototype/xsin-studio/app.js.
   Kept as plain template strings so the exact shader code stays diffable against the prototype. */

/** Full-screen triangle: the geometry ships in the buffer, so the vertex stage only passes clip space through. */
export const VERTEX_SHADER = `
    attribute vec2 aPos;
    void main() {
      gl_Position = vec4(aPos, 0.0, 1.0);
    }
  `;
/** Hero chrome orb: a raymarched sphere shaded as smoked chrome in a studio environment. */
export const HERO_FRAG = `
    precision highp float;

    uniform vec2  uRes;
    uniform float uTime;
    uniform vec2  uMouse;
    uniform float uScroll;
    uniform float uTheme;
    uniform float uFlow;
    uniform float uChrome;

    mat2 rot(float a) {
      float c = cos(a);
      float s = sin(a);
      return mat2(c, -s, s, c);
    }

    float hash21(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    float noise3(vec3 p) {
      vec3 i = floor(p);
      vec3 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      float n = i.x + i.y * 57.0 + 113.0 * i.z;
      float a = hash21(vec2(n, 0.0));
      float b = hash21(vec2(n + 1.0, 0.0));
      float c = hash21(vec2(n + 57.0, 0.0));
      float d = hash21(vec2(n + 58.0, 0.0));
      float e = hash21(vec2(n + 113.0, 0.0));
      float f2 = hash21(vec2(n + 114.0, 0.0));
      float g = hash21(vec2(n + 170.0, 0.0));
      float h = hash21(vec2(n + 171.0, 0.0));
      return mix(
        mix(mix(a, b, f.x), mix(c, d, f.x), f.y),
        mix(mix(e, f2, f.x), mix(g, h, f.x), f.y),
        f.z
      );
    }

    float fbm(vec3 p) {
      float v = 0.0;
      float a = 0.5;
      for (int i = 0; i < 4; i++) {
        v += a * noise3(p);
        p = p * 2.03 + vec3(1.7, 9.2, 3.1);
        a *= 0.5;
      }
      return v;
    }

    float map(vec3 p) {
      return length(p) - 1.0;
    }

    vec3 calcNormal(vec3 p) {
      vec2 e = vec2(0.0018, 0.0);
      return normalize(vec3(
        map(p + e.xyy) - map(p - e.xyy),
        map(p + e.yxy) - map(p - e.yxy),
        map(p + e.yyx) - map(p - e.yyx)
      ));
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / min(uRes.x, uRes.y) * 1.45;
      vec2 mo = uMouse;

      vec3 ro = vec3(0.0, 0.0, 3.35);
      vec3 rd = normalize(vec3(uv, -1.65));
      ro.xz *= rot(mo.x * 0.22);
      rd.xz *= rot(mo.x * 0.22);
      ro.yz *= rot(-mo.y * 0.14);
      rd.yz *= rot(-mo.y * 0.14);
      ro.y += uScroll * 0.4;

      float t = 0.0;
      float dmin = 8.0;
      bool hit = false;

      for (int i = 0; i < 88; i++) {
        vec3 p = ro + rd * t;
        float d = map(p);
        dmin = min(dmin, d);
        if (d < 0.0015) {
          hit = true;
          break;
        }
        if (t > 6.5) break;
        t += d * 0.85;
      }

      vec3 col = vec3(0.0);
      float alpha = 0.0;
      vec3 accent = mix(vec3(0.33, 0.52, 1.0), vec3(0.46, 0.96, 0.92), 0.5 + 0.5 * sin(uTime * 0.15));

      if (hit) {
        vec3 p = ro + rd * t;
        vec3 n = calcNormal(p);
        vec3 v = -rd;

        float ndv = clamp(dot(n, v), 0.0, 1.0);
        float fres = pow(1.0 - ndv, 3.0);

        // A barely-there ripple keeps the chrome alive without turning it into stone.
        float ripple = (0.004 + uFlow * 0.005) * (sin(p.y * 7.0 + uTime * 1.2) + sin(p.x * 5.0 - uTime * 0.9) * 0.6);
        n = normalize(n + vec3(ripple, ripple * 0.5, ripple * 0.3));

        vec3 r = reflect(rd, n);
        r.xz *= rot(sin(uTime * 0.06) * 0.18 + uMouse.x * 0.2);

        // Studio environment reflected in smoked chrome.
        float sky = smoothstep(-0.5, 0.7, r.y);
        vec3 env = mix(vec3(0.006, 0.009, 0.014), vec3(0.28, 0.32, 0.38), sky);
        float hy = r.y + 0.10 * r.x * r.x;
        float horizon = smoothstep(-0.045, 0.005, hy) * (1.0 - smoothstep(0.025, 0.085, hy));
        env += vec3(0.95, 0.97, 1.0) * horizon * 0.85;
        float leftBox = smoothstep(-0.78, -0.3, r.x) * (1.0 - smoothstep(-0.02, 0.3, r.x));
        env += vec3(0.72, 0.82, 0.98) * leftBox * 0.62;
        float rightBox = smoothstep(0.3, 0.62, r.x) * (1.0 - smoothstep(0.72, 0.9, r.x));
        env += vec3(0.12, 0.26, 0.62) * rightBox * 0.22;
        float ceiling = smoothstep(0.52, 0.6, r.y) * (1.0 - smoothstep(0.74, 0.82, r.y));
        env += vec3(0.55, 0.65, 0.82) * ceiling * 0.28;
        float limeEdge = smoothstep(-0.85, -0.3, r.x) * (1.0 - smoothstep(0.02, 0.35, r.x)) * smoothstep(-0.9, -0.35, r.y);
        env += vec3(0.42, 0.72, 0.04) * limeEdge * 0.14;

        vec3 base = env * 0.72;
        vec3 irid = 0.5 + 0.5 * cos(6.28318 * (vec3(0.56, 0.68, 0.88) + fres * 0.6 + n.y * 0.1 + uTime * 0.012));
        base = mix(base, irid * 0.12 + vec3(0.04), 0.02 + 0.03 * uChrome);

        vec3 l1 = normalize(vec3(-0.55, 0.75, 0.7));
        vec3 l2 = normalize(vec3(0.7, -0.4, 0.45));
        float spec1 = pow(max(dot(reflect(-l1, n), v), 0.0), 120.0);
        float spec2 = pow(max(dot(reflect(-l2, n), v), 0.0), 22.0);
        float broad = pow(max(dot(reflect(-l1, n), v), 0.0), 10.0);

        base += vec3(1.0, 0.99, 0.96) * spec1 * 2.4;
        base += vec3(0.72, 0.82, 1.0) * broad * 0.18;
        base += vec3(0.40, 0.70, 1.0) * spec2 * 0.24;
        base += vec3(0.55, 0.72, 1.0) * fres * 0.14;
        vec3 film = 0.5 + 0.5 * cos(6.28318 * (vec3(0.0, 0.33, 0.67) + fres * 2.2 + n.y * 0.4 + uTime * 0.05));
        base += film * pow(fres, 2.0) * 0.42;

        if (uTheme > 0.5) {
          base = mix(base, vec3(0.02, 0.025, 0.032), fres * 0.4);
        }

        col = base / (1.0 + base * 0.72);
        col = pow(col, vec3(0.4545));
        alpha = 1.0;
      } else {
        float glow = exp(-max(dmin, 0.0) * 6.5);
        float halo = exp(-max(dmin, 0.0) * 24.0);
        if (uTheme > 0.5) {
          float shadow = exp(-max(dmin, 0.0) * 7.0);
          col = vec3(0.05, 0.055, 0.06) * (shadow * 0.35);
          alpha = shadow * 0.18;
        } else {
          col = accent * (glow * 0.09 + halo * 0.16);
          alpha = clamp(glow * 0.1 + halo * 0.18, 0.0, 1.0);
        }
      }

      col += (hash21(gl_FragCoord.xy + fract(uTime)) - 0.5) * 0.018;
      gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
    }
  `;
/** Craft "liquid chrome" card: domain-warped fBm field with a faint ring. */
export const MINI_FRAG = `
    precision highp float;

    uniform vec2 uRes;
    uniform float uTime;
    uniform vec2 uMouse;

    float hash21(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    float noise2(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      float a = hash21(i);
      float b = hash21(i + vec2(1.0, 0.0));
      float c = hash21(i + vec2(0.0, 1.0));
      float d = hash21(i + vec2(1.0, 1.0));
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    float fbm2(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      for (int i = 0; i < 4; i++) {
        v += a * noise2(p);
        p = p * 2.02 + vec2(1.7, 9.2);
        a *= 0.5;
      }
      return v;
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / min(uRes.x, uRes.y);
      float t = uTime * 0.18;
      vec2 q = uv * 1.5;
      q += 0.35 * vec2(
        fbm2(q + vec2(t, 0.0)),
        fbm2(q + vec2(0.0, -t))
      );
      float v = fbm2(q * 1.7 + uMouse * 0.35 + vec2(0.0, t * 0.6));

      vec3 base = vec3(0.015, 0.02, 0.028);
      vec3 teal = vec3(0.04, 0.42, 0.38);
      vec3 violet = vec3(0.30, 0.15, 0.62);
      vec3 col = mix(base, teal, smoothstep(0.2, 0.72, v));
      col = mix(col, violet, smoothstep(0.56, 0.94, fbm2(q * 2.2 - t)));

      float ring = pow(max(0.0, 1.0 - length(uv * vec2(0.9, 1.1))), 7.0);
      col += vec3(0.55, 0.95, 0.8) * ring * 0.22;
      col += (hash21(gl_FragCoord.xy + uTime) - 0.5) * 0.03;

      gl_FragColor = vec4(pow(col, vec3(0.92)), 1.0);
    }
  `;
