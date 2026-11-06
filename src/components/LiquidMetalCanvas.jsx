import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { liquidMetalVertex, liquidMetalFragment } from "../shaders/liquidMetal";

/**
 * LIQUID METAL CANVAS
 * Interactive WebGL shader rendering real-time fluid ribbons, chromatic aberration,
 * and mouse/touch ripple turbulence using Three.js.
 */
export default function LiquidMetalCanvas() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let renderer = null;
    let animId = 0;
    let isVisible = true;
    let texture = null;

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    } catch (e) {
      console.warn("WebGL initialization failed, falling back to static gradient:", e);
      setHasWebGL(false);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(container.clientWidth || 1, container.clientHeight || 1),
      },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uTexture: { value: new THREE.Texture() },
      uHasTexture: { value: 0.0 },
      uIntensity: { value: 1.0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: liquidMetalVertex,
      fragmentShader: liquidMetalFragment,
      uniforms,
      depthTest: false,
      depthWrite: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Load Cyril's supplied liquid gradient hero artwork
    const loader = new THREE.TextureLoader();
    const heroImagePaths = [
      "/images/hero/cyril-portfolio-hero.webp",
      "/images/hero/cyril-portfolio-hero.jpg",
      "/images/hero/liquid-gradient-clean.webp",
    ];

    const loadTexture = (idx = 0) => {
      if (idx >= heroImagePaths.length) return;
      loader.load(
        heroImagePaths[idx],
        (tex) => {
          tex.minFilter = THREE.LinearFilter;
          tex.magFilter = THREE.LinearFilter;
          tex.wrapS = THREE.ClampToEdgeWrapping;
          tex.wrapT = THREE.ClampToEdgeWrapping;
          tex.needsUpdate = true;
          texture = tex;
          uniforms.uTexture.value = tex;
          uniforms.uHasTexture.value = 1.0;
        },
        undefined,
        () => loadTexture(idx + 1)
      );
    };
    loadTexture();

    function updateSize() {
      if (!container || !renderer) return;
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      renderer.setSize(width, height, false);
      uniforms.uResolution.value.set(width, height);
    }
    updateSize();

    const resizeObserver = new ResizeObserver(() => updateSize());
    resizeObserver.observe(container);

    // Mouse and Touch Interaction with smooth damping
    const targetMouse = new THREE.Vector2(0.5, 0.5);
    const currentMouse = new THREE.Vector2(0.5, 0.5);

    function handlePointerMove(e) {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      targetMouse.x = (clientX - rect.left) / rect.width;
      targetMouse.y = 1.0 - (clientY - rect.top) / rect.height;
    }

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });

    // IntersectionObserver to pause rendering when out of viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Animation render loop
    let lastTime = performance.now();
    function animate(now) {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      uniforms.uTime.value += dt;

      // Lerp mouse towards target
      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.06;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.06;
      uniforms.uMouse.value.copy(currentMouse);

      renderer.render(scene, camera);
    }
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      resizeObserver.disconnect();
      observer.disconnect();

      if (texture) texture.dispose();
      geometry.dispose();
      material.dispose();
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0"
    >
      {hasWebGL ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-auto"
          style={{ width: "100%", height: "100%", display: "block" }}
        />
      ) : (
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: "url(/images/hero/cyril-portfolio-hero.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      {/* Subtle Dark Vignette Mask */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, transparent 25%, rgba(5, 5, 5, 0.6) 65%, #050505 100%)",
        }}
      />
    </div>
  );
}
