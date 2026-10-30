// Liquid Metal Shaders
// Procedural + Texture-domain-warped multi-layered liquid metal ribbons
// Brand Palette: 65% deep black (#050505), 20% neon lime (#C6FF00), 15% royal purple (#7C3AED)

export const liquidMetalVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

export const liquidMetalFragment = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform sampler2D uTexture;
  uniform float uHasTexture;
  uniform float uIntensity;

  varying vec2 vUv;

  // --- Simplex Noise Algorithms for Fluid Deformation ---
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

    vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 105.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  // 3-Layer domain-warping fluid flow field
  vec2 getFluidDisplacement(vec2 p, float t) {
    // Layer 1: Macro fluid current (swirling liquid metal body)
    float a1 = snoise(vec3(p * 1.5, t * 0.16));
    float a2 = snoise(vec3(p * 1.5 + vec2(4.3, 2.7), t * 0.16));
    vec2 flow1 = vec2(a1, a2);

    // Layer 2: Stretching & bending fluid ribbons
    float b1 = snoise(vec3(p * 2.8 + flow1 * 1.3, t * 0.26 + 1.4));
    float b2 = snoise(vec3(p * 2.8 - flow1 * 1.3 + vec2(3.1, 7.8), t * 0.26 + 3.9));
    vec2 flow2 = vec2(b1, b2);

    // Layer 3: Surface capillary micro-ripples
    float c1 = snoise(vec3(p * 5.5 + flow2 * 0.7, t * 0.38 + 5.2));
    float c2 = snoise(vec3(p * 5.5 - flow2 * 0.7, t * 0.38 + 1.1));

    return flow1 * 0.055 + flow2 * 0.028 + vec2(c1, c2) * 0.012;
  }

  // Liquid height field for 3D specular normals
  float getLiquidHeight(vec2 p, float t) {
    float n1 = snoise(vec3(p * 2.2, t * 0.18));
    float n2 = snoise(vec3(p * 4.4 + vec2(n1 * 0.8), t * 0.28));
    return n1 * 0.65 + n2 * 0.35;
  }

  void main() {
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 p = (vUv - 0.5) * aspect;
    float t = uTime * 0.32;

    // Continuous organic fluid displacement
    vec2 fluidDisp = getFluidDisplacement(p, t);

    // Interactive mouse / touch wave perturbation
    vec2 mDiff = (vUv - uMouse) * aspect;
    float mDist = length(mDiff);
    float mForce = smoothstep(0.38, 0.0, mDist);
    fluidDisp += normalize(mDiff + 0.0001) * mForce * 0.035 * sin(mDist * 20.0 - t * 4.5);

    // Warped UV coordinates for texture sampling
    vec2 warpedUv = clamp(vUv + fluidDisp, 0.002, 0.998);

    // Brand color palette (65% black, 20% neon lime, 15% royal purple)
    vec3 cBlack = vec3(0.012, 0.012, 0.016);
    vec3 cNeonLime = vec3(0.776, 1.0, 0.0);        // #C6FF00
    vec3 cBrightLime = vec3(0.718, 1.0, 0.0);      // #B7FF00
    vec3 cRoyalPurple = vec3(0.486, 0.227, 0.929); // #7C3AED
    vec3 cDeepPurple = vec3(0.180, 0.040, 0.350);  // #2E0A59
    vec3 cBrightViolet = vec3(0.659, 0.333, 0.969);// #A855F7

    // Compute surface normal for 3D liquid metal reflection
    float eps = 0.008;
    float h0 = getLiquidHeight(p + fluidDisp * 2.0, t);
    float hx = getLiquidHeight(p + fluidDisp * 2.0 + vec2(eps, 0.0), t);
    float hy = getLiquidHeight(p + fluidDisp * 2.0 + vec2(0.0, eps), t);
    vec3 normal = normalize(vec3(-(hx - h0) / eps * 0.35, -(hy - h0) / eps * 0.35, 1.0));

    // Dynamic Blinn-Phong specular calculation (chrome reflection)
    vec3 light1 = normalize(vec3(0.45, 0.75, 0.85));
    vec3 light2 = normalize(vec3(-0.55, -0.35, 0.65));
    vec3 view = vec3(0.0, 0.0, 1.0);

    vec3 half1 = normalize(light1 + view);
    vec3 half2 = normalize(light2 + view);
    float spec1 = pow(max(0.0, dot(normal, half1)), 32.0);
    float spec2 = pow(max(0.0, dot(normal, half2)), 16.0);
    float fresnel = pow(1.0 - max(0.0, dot(normal, view)), 3.2);

    vec3 finalColor = cBlack;

    if (uHasTexture > 0.5) {
      // Chromatic dispersion through flowing liquid ribbons
      vec2 chromOff = fluidDisp * 0.22;
      float r = texture2D(uTexture, clamp(warpedUv + chromOff, 0.002, 0.998)).r;
      float g = texture2D(uTexture, warpedUv).g;
      float b = texture2D(uTexture, clamp(warpedUv - chromOff, 0.002, 0.998)).b;
      vec3 sampledArtwork = vec3(r, g, b);

      // Deepen black areas to preserve 65% black ratio
      float luminance = dot(sampledArtwork, vec3(0.299, 0.587, 0.114));
      sampledArtwork = mix(cBlack, sampledArtwork, smoothstep(0.04, 0.25, luminance));

      finalColor = sampledArtwork;

      // Add dynamic glossy liquid metal highlights across the flowing curves
      finalColor += spec1 * cNeonLime * 0.42;
      finalColor += spec2 * cBrightViolet * 0.32;
      finalColor += (spec1 * 0.6 + spec2 * 0.4) * vec3(0.95, 1.0, 0.92) * 0.25;

      // Luminous rim fresnel on liquid ribbon edges
      finalColor += fresnel * mix(cRoyalPurple, cNeonLime, smoothstep(-0.2, 0.6, h0)) * 0.28;
    } else {
      // Procedural fallback matching the exact brand color proportions
      float ribbon1 = smoothstep(0.2, 0.7, h0 * 0.5 + 0.5 + fluidDisp.x * 2.0);
      float ribbon2 = smoothstep(0.3, 0.8, -h0 * 0.5 + 0.5 + fluidDisp.y * 2.0);

      // Base black foundation (65%)
      finalColor = cBlack;

      // Royal purple ambient & ribbons (15%)
      finalColor = mix(finalColor, cDeepPurple, ribbon2 * 0.55);
      finalColor = mix(finalColor, cRoyalPurple, ribbon2 * smoothstep(0.4, 0.8, ribbon2) * 0.8);

      // Neon lime dynamic ribbons (20%)
      finalColor = mix(finalColor, cBrightLime, ribbon1 * 0.75);
      finalColor = mix(finalColor, cNeonLime, ribbon1 * spec1 * 0.6);

      // Highlights
      finalColor += spec1 * cNeonLime * 0.5;
      finalColor += spec2 * cBrightViolet * 0.35;
      finalColor += fresnel * cRoyalPurple * 0.3;
    }

    // Atmospheric edge vignette to gently blend into background
    float vignette = smoothstep(1.3, 0.3, length(p));
    finalColor *= mix(0.7, 1.0, vignette);

    // Apply intensity multiplier
    finalColor *= uIntensity;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;
