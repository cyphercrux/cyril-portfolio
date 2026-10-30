"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { liquidMetalVertex, liquidMetalFragment } from "@/shaders/liquidMetal";

interface LiquidMetalCanvasProps {
  onFallback?: () => void;
}

export default function LiquidMetalCanvas({ onFallback }: LiquidMetalCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animId: number = 0;
    let isVisible = true;
    let texture: THREE.Texture | null = null;

    try {
      // Create WebGL renderer
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    } catch {
      onFallback?.();
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(container.clientWidth || 1, container.clientHeight || 1) },
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
    loader.load(
      "/images/hero/cyril-portfolio-hero.jpg",
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
      (err) => {
        console.warn("Could not load hero texture, running procedural shader:", err);
      }
    );

    function updateSize() {
      if (!container || !renderer) return;
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      renderer.setSize(width, height, false);
      uniforms.uResolution.value.set(width, height);
    }

    updateSize();

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);

    // Mouse and Touch Interaction
    function handlePointerMove(e: MouseEvent | TouchEvent) {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;

      if ("touches" in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ("clientX" in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const x = (clientX - rect.left) / rect.width;
      const y = 1.0 - (clientY - rect.top) / rect.height; // invert Y for WebGL
      uniforms.uMouse.value.set(
        Math.max(0, Math.min(1, x)),
        Math.max(0, Math.min(1, y))
      );
    }

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });

    // Intersection Observer to pause rendering when hero is off-screen (0% GPU/CPU overhead!)
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animId) {
          clock.start();
          render();
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    const clock = new THREE.Clock();

    function render() {
      if (!isVisible) {
        animId = 0;
        return;
      }
      uniforms.uTime.value = clock.getElapsedTime();
      renderer?.render(scene, camera);
      animId = requestAnimationFrame(render);
    }

    render();

    // Cleanup
    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      geometry.dispose();
      material.dispose();
      texture?.dispose();
      renderer?.dispose();
    };
  }, [onFallback]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
}
