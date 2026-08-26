import { useEffect, useRef } from "react";

/**
 * BloomScene — the About-page centrepiece.
 * A curved masonry wall of terracotta bricks slowly rotates and "breathes",
 * while green bloom particles rise through it. Pointer movement tilts the
 * whole sculpture. three.js is imported dynamically inside an effect, so
 * nothing leaks into SSR; reduced-motion users get a single still frame.
 */
export function BloomScene({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const THREE = await import("three");
      if (disposed || !host.isConnected) return;

      /* palette — hex equivalents of the oklch tokens in styles.css */
      const INK = 0x120f0c;
      const BRICK = 0x9f4f32;
      const MOSS = 0x5e7a5e;
      const ACCENT = 0xb1623d;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        });
      } catch {
        return; // no WebGL — hero simply stays typographic
      }
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(INK, 15, 32);

      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.set(0, 0.4, 17);

      /* light — warm key, mossy rim, ember fill */
      scene.add(new THREE.AmbientLight(0xffe9d8, 0.55));
      const key = new THREE.DirectionalLight(0xffd9b0, 1.7);
      key.position.set(-7, 9, 8);
      scene.add(key);
      const rim = new THREE.DirectionalLight(MOSS, 1.0);
      rim.position.set(8, -3, -9);
      scene.add(rim);
      const ember = new THREE.PointLight(ACCENT, 60, 30, 1.8);
      ember.position.set(3, -4, 7);
      scene.add(ember);

      const group = new THREE.Group();
      scene.add(group);

      /* ------- the breathing wall: a concave arc of running-bond bricks ------- */
      const RADIUS = 6.6;
      const ARC = Math.PI * 1.04;
      const COURSES = 13;
      const PER = 15;
      const BW = 0.94;
      const BH = 0.47;
      const COUNT = COURSES * PER;

      const brickGeo = new THREE.BoxGeometry(BW, BH, 0.62);
      const brickMat = new THREE.MeshStandardMaterial({
        roughness: 0.88,
        metalness: 0.04,
      });
      const wall = new THREE.InstancedMesh(brickGeo, brickMat, COUNT);
      wall.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      group.add(wall);

      interface Brick {
        angle: number;
        y: number;
        phase: number;
        speed: number;
        lift: number;
      }
      const bricks: Brick[] = [];
      const tint = new THREE.Color();
      const brickCol = new THREE.Color(BRICK);
      const accentCol = new THREE.Color(ACCENT);
      const darkCol = new THREE.Color(INK);

      for (let c = 0; c < COURSES; c++) {
        const y = (c - (COURSES - 1) / 2) * (BH + 0.06);
        const stagger = (c % 2) * 0.5;
        for (let b = 0; b < PER; b++) {
          const t = (b + stagger + 0.5) / PER;
          bricks.push({
            angle: -ARC / 2 + t * ARC,
            y,
            phase: Math.random() * Math.PI * 2,
            speed: 0.45 + Math.random() * 0.65,
            lift: Math.random() * 0.05,
          });
          tint
            .copy(brickCol)
            .lerp(accentCol, Math.random() * 0.5)
            .lerp(darkCol, Math.random() * 0.22);
          wall.setColorAt(bricks.length - 1, tint);
        }
      }
      if (wall.instanceColor) wall.instanceColor.needsUpdate = true;

      /* ------- bloom particles rising through the wall ------- */
      const P_COUNT = 340;
      const pGeo = new THREE.BufferGeometry();
      const pos = new Float32Array(P_COUNT * 3);
      const col = new Float32Array(P_COUNT * 3);
      const pSpeed = new Float32Array(P_COUNT);
      const pSway = new Float32Array(P_COUNT);
      const moss = new THREE.Color(MOSS);
      const leaf = new THREE.Color(0x8fae6f);
      const emberCol = new THREE.Color(0xd08a55);
      for (let p = 0; p < P_COUNT; p++) {
        pos[p * 3] = (Math.random() - 0.5) * 15;
        pos[p * 3 + 1] = (Math.random() - 0.5) * 13;
        pos[p * 3 + 2] = (Math.random() - 0.5) * 9;
        const c = Math.random();
        const pc = c < 0.62 ? moss : c < 0.9 ? leaf : emberCol;
        col[p * 3] = pc.r;
        col[p * 3 + 1] = pc.g;
        col[p * 3 + 2] = pc.b;
        pSpeed[p] = 0.16 + Math.random() * 0.4;
        pSway[p] = Math.random() * Math.PI * 2;
      }
      pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      pGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));

      const spriteCanvas = document.createElement("canvas");
      spriteCanvas.width = spriteCanvas.height = 64;
      const sctx = spriteCanvas.getContext("2d")!;
      const grad = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.35, "rgba(255,255,255,.55)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      sctx.fillStyle = grad;
      sctx.fillRect(0, 0, 64, 64);
      const sprite = new THREE.CanvasTexture(spriteCanvas);

      const pMat = new THREE.PointsMaterial({
        size: 0.14,
        map: sprite,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });
      const blooms = new THREE.Points(pGeo, pMat);
      group.add(blooms);

      /* ------- interaction & loop ------- */
      let targetX = 0;
      let targetY = 0;
      let curX = 0;
      let curY = 0;
      const onPointer = (e: PointerEvent) => {
        const r = host.getBoundingClientRect();
        if (r.height === 0) return;
        targetX = ((e.clientX - r.left) / r.width) * 2 - 1;
        targetY = ((e.clientY - r.top) / r.height) * 2 - 1;
      };
      window.addEventListener("pointermove", onPointer, { passive: true });

      const resize = () => {
        const w = host.clientWidth || 1;
        const h = host.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(host);

      const dummy = new THREE.Object3D();
      const clock = new THREE.Clock();
      let raf = 0;
      let visible = true;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const frame = () => {
        raf = 0;
        const t = clock.getElapsedTime();

        curX += (targetX - curX) * 0.045;
        curY += (targetY - curY) * 0.045;
        group.rotation.y = t * 0.07 + curX * 0.42;
        group.rotation.x = curY * 0.14 + Math.sin(t * 0.11) * 0.03;

        for (let k = 0; k < COUNT; k++) {
          const bp = bricks[k]!;
          const breathe = Math.sin(t * bp.speed + bp.phase) * 0.075;
          const r = RADIUS + breathe;
          dummy.position.set(
            Math.sin(bp.angle) * r,
            bp.y + Math.sin(t * bp.speed * 0.7 + bp.phase) * bp.lift,
            -Math.cos(bp.angle) * r + 4.6,
          );
          dummy.rotation.set(0, bp.angle, 0);
          dummy.updateMatrix();
          wall.setMatrixAt(k, dummy.matrix);
        }
        wall.instanceMatrix.needsUpdate = true;

        const posAttr = pGeo.getAttribute("position");
        const arr = posAttr.array as Float32Array;
        for (let p = 0; p < P_COUNT; p++) {
          let y = arr[p * 3 + 1]! + pSpeed[p]! * 0.016;
          if (y > 7) y = -7;
          arr[p * 3 + 1] = y;
          arr[p * 3] = arr[p * 3]! + Math.sin(t * 0.6 + pSway[p]!) * 0.0035;
        }
        posAttr.needsUpdate = true;

        renderer.render(scene, camera);
        if (visible && !disposed) raf = requestAnimationFrame(frame);
      };

      const io = new IntersectionObserver(
        ([entry]) => {
          visible = entry?.isIntersecting ?? true;
          if (visible && !raf && !reduced && !disposed) raf = requestAnimationFrame(frame);
        },
        { threshold: 0.02 },
      );
      io.observe(host);

      if (reduced) {
        /* one carefully-composed still frame */
        clock.getElapsedTime();
        group.rotation.y = 0.35;
        for (let k = 0; k < COUNT; k++) {
          const bp = bricks[k]!;
          dummy.position.set(
            Math.sin(bp.angle) * RADIUS,
            bp.y,
            -Math.cos(bp.angle) * RADIUS + 4.6,
          );
          dummy.rotation.set(0, bp.angle, 0);
          dummy.updateMatrix();
          wall.setMatrixAt(k, dummy.matrix);
        }
        wall.instanceMatrix.needsUpdate = true;
        renderer.render(scene, camera);
      } else {
        raf = requestAnimationFrame(frame);
      }

      cleanup = () => {
        if (raf) cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        window.removeEventListener("pointermove", onPointer);
        brickGeo.dispose();
        brickMat.dispose();
        pGeo.dispose();
        pMat.dispose();
        sprite.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return <div ref={hostRef} aria-hidden="true" className={className} />;
}
