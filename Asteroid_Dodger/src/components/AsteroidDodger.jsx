import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/*
Asteroid Dodger - Realistic Space Edition (React + Tailwind + Framer Motion)
- Single-file component (JavaScript)
- Tailwind required for styling
- Framer Motion optional but used for polish (install with npm i framer-motion)
*/

/* ---------- Helpers ---------- */
const rand = (min, max) => Math.random() * (max - min) + min;
const uid = () => Math.random().toString(36).slice(2, 9);

/* ---------- Component ---------- */
export default function AsteroidDodger() {
  // CONFIG
  const GAME_HEIGHT = 520; // default visual height
  const BASE_SPAWN = 900; // ms
  const MIN_SPAWN = 260; // ms
  const ASTEROID_MIN = 28;
  const ASTEROID_MAX = 96;
  const ASTEROID_BASE_SPEED = 80; // px/sec base
  const ASTEROID_LIFESPAN = 20000; // ms fallback
  const SHIP_BASE_WIDTH = 72; // visual width in px

  // refs
  const arenaRef = useRef(null);
  const rafRef = useRef(null);
  const lastTsRef = useRef(null);
  const spawnAccRef = useRef(0);
  const spawnIntervalRef = useRef(BASE_SPAWN);

  // states
  const [running, setRunning] = useState(false);
  const [shipNormX, setShipNormX] = useState(0.5); // 0..1
  const [asteroids, setAsteroids] = useState([]); // {id, cx, top, size, vy, vx, hue, created}
  const [surviveMs, setSurviveMs] = useState(0);
  const [bestMs, setBestMs] = useState(() => Number(localStorage.getItem("ad_best_real") || 0));
  const [showOverlay, setShowOverlay] = useState(false);
  const [collisionCount, setCollisionCount] = useState(0);
  const [difficulty, setDifficulty] = useState(0); // grows with time

  /* ---------- Start / End ---------- */
  const startGame = () => {
    setAsteroids([]);
    setSurviveMs(0);
    setShowOverlay(false);
    setCollisionCount(0);
    setDifficulty(0);
    spawnIntervalRef.current = BASE_SPAWN;
    lastTsRef.current = null;
    setRunning(true);
  };

  const endGame = (collided = false) => {
    setRunning(false);
    setShowOverlay(true);
    if (collided) setCollisionCount((c) => c + 1);
    setAsteroids([]);
    setBestMs((prev) => {
      const nb = Math.max(prev, surviveMs);
      localStorage.setItem("ad_best_real", nb);
      return nb;
    });
  };

  /* ---------- Spawning ---------- */
  const spawnOne = (arenaRect) => {
    const size = Math.round(rand(ASTEROID_MIN, ASTEROID_MAX));
    const cx = rand(size / 2, arenaRect.width - size / 2); // center x in px
    const vx = rand(-20, 20); // slight lateral drift px/sec
    const vy = rand(ASTEROID_BASE_SPEED * 0.9, ASTEROID_BASE_SPEED * 1.8) * (1 + difficulty * 0.02);
    const ast = {
      id: uid(),
      cx,
      top: -size,
      size,
      vx,
      vy,
      hue: Math.floor(rand(10, 50)), // earthy hues for asteroids
      created: Date.now(),
    };
    setAsteroids((p) => [...p, ast]);
  };

  /* ---------- Controls: pointer + keyboard ---------- */
  useEffect(() => {
    const arena = arenaRef.current;
    if (!arena) return;

    const handleMove = (e) => {
      if (!running) return;
      let clientX = e.clientX;
      if (e.touches && e.touches[0]) clientX = e.touches[0].clientX;
      const rect = arena.getBoundingClientRect();
      const norm = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      setShipNormX(norm);
    };

    const onDown = (e) => {
      handleMove(e);
      // pointer capture handled implicitly
    };

    arena.addEventListener("mousemove", handleMove);
    arena.addEventListener("touchmove", handleMove, { passive: true });
    arena.addEventListener("mousedown", onDown);
    arena.addEventListener("touchstart", onDown, { passive: true });

    return () => {
      arena.removeEventListener("mousemove", handleMove);
      arena.removeEventListener("touchmove", handleMove);
      arena.removeEventListener("mousedown", onDown);
      arena.removeEventListener("touchstart", onDown);
    };
  }, [running]);

  useEffect(() => {
    const onKey = (e) => {
      if (!running) return;
      if (e.key === "ArrowLeft" || e.key === "a") setShipNormX((s) => Math.max(0, s - 0.06));
      if (e.key === "ArrowRight" || e.key === "d") setShipNormX((s) => Math.min(1, s + 0.06));
      if (e.key === " "){ // pause toggle
        setRunning((r) => !r);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [running]);

  /* ---------- Core loop ---------- */
  useEffect(() => {
    if (!running) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      return;
    }

    const arena = arenaRef.current;
    if (!arena) return;
    const rect = arena.getBoundingClientRect();
    const shipPxY = rect.height - 70; // ship vertical origin for collision approx (px)
    const shipRadius = Math.max(14, SHIP_BASE_WIDTH * 0.22); // make ship collision small (nose-focused)

    let last = performance.now();
    lastTsRef.current = last;
    spawnAccRef.current = 0;

    const loop = (now) => {
      const dt = (now - last) / 1000; // seconds since last frame
      last = now;

      // update survive time and difficulty
      setSurviveMs((prev) => prev + (now - lastTsRef.current));
      setDifficulty((d) => d + (now - lastTsRef.current) / 10000); // small growth
      lastTsRef.current = now;

      // manage spawn timer and spawn interval shrink with difficulty
      spawnAccRef.current += dt * 1000;
      spawnIntervalRef.current = Math.max(MIN_SPAWN, BASE_SPAWN - difficulty * 14);

      if (spawnAccRef.current >= spawnIntervalRef.current) {
        spawnAccRef.current = 0;
        // spawn 1 or occasionally 2 asteroids
        const arenaRect = arena.getBoundingClientRect();
        const repeat = Math.random() < Math.min(0.6, difficulty / 30) ? 1 + Math.round(Math.random()) : 1;
        for (let i = 0; i < repeat; i++) spawnOne(arenaRect);
      }

      // move asteroids
      setAsteroids((prev) => {
        const nowMs = Date.now();
        const next = [];
        for (const a of prev) {
          const nx = a.cx + a.vx * dt;
          const ny = a.top + a.vy * dt;
          // keep if inside + buffer and not expired
          if (ny - a.size < rect.height + 120 && nowMs - a.created < ASTEROID_LIFESPAN) {
            const moved = { ...a, cx: nx, top: ny };
            // collision check only when asteroid near ship vertical zone to avoid premature detection
            const asteroidCenterY = moved.top + moved.size / 2;
            if (asteroidCenterY > shipPxY - 120) {
              // ship center x in px
              const shipPxX = shipNormX * rect.width;
              // improved collision: use smaller asteroid radius multiplier (visual padding)
              const ar = (moved.size / 2) * 0.78;
              const dx = moved.cx - shipPxX;
              const dy = asteroidCenterY - shipPxY;
              const dist2 = dx * dx + dy * dy;
              const minDist = ar + shipRadius;
              if (dist2 <= minDist * minDist) {
                // collision happened
                endGame(true);
                return []; // will clear list by returning empty
              }
            }
            next.push(moved);
          }
        }
        return next;
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, shipNormX, difficulty]);

  /* ---------- Derived values ---------- */
  const survivedSec = Math.floor(surviveMs / 1000);
  const bestSec = Math.floor(bestMs / 1000);

  /* ---------- Render ---------- */
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#020217] to-[#04040b] text-white p-6 flex items-start justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main area */}
        <div className="lg:col-span-2">
          <div className="rounded-xl p-4 bg-[rgba(10,14,20,0.6)] border border-white/6 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-extrabold flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center shadow-sm">🚀</span>
                  Asteroid Dodger — Space Edition
                </h1>
                <p className="text-sm text-slate-300 mt-1">Dark space theme · realistic asteroids · dodge and survive</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-xs text-slate-400">Time</div>
                  <div className="text-lg font-bold">{survivedSec}s</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Best</div>
                  <div className="text-lg font-bold text-amber-300">{bestSec}s</div>
                </div>
                <div>
                  {!running ? (
                    <button onClick={startGame} className="px-4 py-2 rounded-full bg-gradient-to-r from-slate-600 to-slate-800 font-bold shadow">Launch</button>
                  ) : (
                    <button onClick={() => endGame(false)} className="px-4 py-2 rounded-full bg-red-600/90 font-bold shadow">Abort</button>
                  )}
                </div>
              </div>
            </div>

            {/* Arena */}
            <div
              ref={arenaRef}
              className="relative mt-4 h-[520px] rounded-lg overflow-hidden border border-white/6"
              style={{
                background:
                  "radial-gradient(circle at 10% 20%, rgba(255,255,255,0.02), transparent 6%), radial-gradient(circle at 90% 80%, rgba(255,255,255,0.01), transparent 6%), linear-gradient(180deg,#000814,#00040a)",
              }}
            >
              {/* starfield layer */}
              <Starfield />

              {/* ship - positioned by normalized x */}
              <div className="absolute bottom-8 left-0 right-0 pointer-events-none">
                <div
                  className="mx-auto relative"
                  style={{
                    width: `${SHIP_BASE_WIDTH}px`,
                    transform: `translateX(calc(${(shipNormX - 0.5) * 100}% + 0px))`,
                    transition: "transform 80ms linear",
                  }}
                >
                  <ShipSVG />
                  {/* engine exhaust glow below ship */}
                  <div style={{ transform: "translateY(-6px)" }} className="flex items-center justify-center">
                    <div className="w-6 h-12 rounded-full blur-xl" style={{ background: "radial-gradient(circle,#ffb86b55,#ff6b6b00)" }} />
                  </div>
                </div>
              </div>

              {/* asteroids */}
              <AnimatePresence>
                {asteroids.map((a) => {
                  // left/top for element: left = cx - size/2, top = a.top
                  const left = a.cx - a.size / 2;
                  const top = a.top;
                  return (
                    <motion.div
                      key={a.id}
                      initial={{ opacity: 0, scale: 0.6, y: -60 }}
                      animate={{ opacity: 1, scale: 1, y: top }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      style={{
                        position: "absolute",
                        left,
                        width: a.size,
                        height: a.size,
                        zIndex: 20,
                        pointerEvents: "auto",
                      }}
                    >
                      <AsteroidSVG size={a.size} hue={a.hue} />
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* overlay when not running */}
              {!running && (
                <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
                  <div className="pointer-events-auto bg-black/50 backdrop-blur-md border border-white/8 p-6 rounded-2xl text-center">
                    <h2 className="text-2xl font-extrabold">{showOverlay ? "You Crashed!" : "Ready for Launch"}</h2>
                    <p className="text-slate-300 mt-2">{showOverlay ? `Survived ${survivedSec}s` : "Move with arrow keys or drag; avoid asteroids."}</p>
                    <div className="mt-4 flex justify-center gap-3">
                      <button onClick={startGame} className="px-4 py-2 rounded-full bg-gradient-to-r from-slate-600 to-slate-800 font-bold pointer-events-auto">
                        {showOverlay ? "Play Again" : "Start"}
                      </button>
                      {showOverlay && (
                        <button
                          onClick={() => {
                            localStorage.setItem("ad_best_real", 0);
                            setBestMs(0);
                          }}
                          className="px-3 py-2 rounded-full bg-white/6 text-sm pointer-events-auto"
                        >
                          Reset Best
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-3 text-slate-400 text-sm">Tip: the ship's nose is your true collision point — keep distance from asteroid centers.</div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 rounded-xl p-6 bg-[rgba(255,255,255,0.03)] border border-white/6 shadow-xl">
            <h3 className="text-lg font-extrabold flex items-center gap-3">Flight Stats <span className="text-amber-300">🏆</span></h3>
            <p className="text-sm text-slate-300 mt-1">Live summary & best</p>

            <div className="mt-4 grid gap-3">
              <Stat title="Time Survived" value={`${survivedSec}s`} icon="⏱️" />
              <Stat title="Best Time" value={`${bestSec}s`} icon="🥇" />
              <Stat title="Collisions" value={`${collisionCount}`} icon="💥" />
              <Stat title="Asteroids On Screen" value={`${asteroids.length}`} icon="☄️" />
            </div>

            <div className="mt-5">
              {!running ? (
                <button onClick={startGame} className="w-full px-4 py-3 rounded-full bg-gradient-to-r from-slate-600 to-slate-800 font-bold">Launch Now</button>
              ) : (
                <div className="text-sm text-slate-300">Flight active — dodge carefully.</div>
              )}
            </div>

            <div className="mt-4 text-xs text-slate-400">Controls: Arrow keys or drag/touch. Click asteroids to destroy for a tiny bonus.</div>
          </div>

          <div className="mt-4 text-center text-xs text-slate-400">Built with ❤️ • React</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Subcomponents: Ship, Asteroid, Starfield, Stat ---------- */

function ShipSVG() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      <defs>
        <linearGradient id="sg1" x1="0" x2="1">
          <stop offset="0" stopColor="#98f6ff" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <g>
        <ellipse cx="36" cy="52" rx="22" ry="6" fill="rgba(255,255,255,0.03)" />
        <path d="M12 50 L36 12 L60 50 Z" fill="url(#sg1)" stroke="rgba(255,255,255,0.06)" strokeWidth="1.4" />
        <rect x="30" y="22" width="12" height="14" rx="3" fill="#ffffff33" />
        {/* cockpit glow */}
        <ellipse cx="36" cy="30" rx="4.5" ry="3.2" fill="#ffffff88" />
      </g>
    </svg>
  );
}

function AsteroidSVG({ size = 64, hue = 20 }) {
  // simple asteroid-like SVG with rotation animation via CSS
  const style = {
    width: size,
    height: size,
    transformOrigin: "50% 50%",
    animation: "spinAst 6s linear infinite",
    borderRadius: "50%",
    overflow: "hidden",
  };
  return (
    <>
      <style>{`
        @keyframes spinAst { from{ transform: rotate(0deg)} to{ transform: rotate(360deg)} }
      `}</style>
      <div style={style}>
        <svg width={size} height={size} viewBox="0 0 100 100">
          <defs>
            <radialGradient id={`g${hue}`} cx="30%" cy="30%">
              <stop offset="0" stopColor={`hsl(${hue} 25% 80%)`} />
              <stop offset="1" stopColor={`hsl(${(hue + 30) % 360} 30% 35%)`} />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="48" fill={`url(#g${hue})`} stroke="rgba(0,0,0,0.45)" strokeWidth="2" />
          {/* craters */}
          <ellipse cx="36" cy="38" rx="12" ry="8" fill="rgba(0,0,0,0.12)" />
          <ellipse cx="62" cy="54" rx="8" ry="6" fill="rgba(0,0,0,0.14)" />
          <ellipse cx="48" cy="68" rx="6" ry="4" fill="rgba(0,0,0,0.13)" />
        </svg>
      </div>
    </>
  );
}

function Starfield() {
  // CSS-based subtle star dots plus parallax moving small layers
  return (
    <>
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage:
              "radial-gradient(#ffffff14 1px, transparent 2px), radial-gradient(#ffffff0c 1px, transparent 3px)",
            backgroundSize: "8px 8px, 18px 18px",
            opacity: 0.6,
            animation: "moveStars 40s linear infinite",
            mixBlendMode: "screen",
          }}
        />
      </div>
      <style>{`
        @keyframes moveStars {
          from { transform: translateY(0) }
          to { transform: translateY(-60px) }
        }
      `}</style>
    </>
  );
}

function Stat({ title, value, icon }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-white/3 border border-white/5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl" style={{ background: "linear-gradient(135deg,#ffffff11,#00000011)" }}>
          {icon}
        </div>
        <div>
          <div className="text-xs text-slate-300">{title}</div>
          <div className="text-lg font-bold">{value}</div>
        </div>
      </div>
    </div>
  );
}
