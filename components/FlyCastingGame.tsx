"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface Point {
    x: number;
    y: number;
    oldX: number;
    oldY: number;
}

const SEGMENT_COUNT = 75;
const SEGMENT_DIST_BASE = 6;
const GRAVITY = 0.5;
const FRICTION = 0.992;
const WATER_FRICTION = 0.35;
const ROD_LENGTH = 185;
const MAX_DIST_FT = 300;

export default function FlyCastingGame() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [game, setGame] = useState({
        power: 0,
        potential: 5,
        distance: 0,
        isMouseDown: false,
        isCasting: false,
        showResult: false,
        highScore: 0,
    });

    const lineRef = useRef<Point[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const rodTipRef = useRef({ x: 0, y: 0 });
    const PIVOT = useRef({ x: 0, y: 0 });
    const cameraRef = useRef({ zoom: 1, x: 0 });
    const tensionRef = useRef(false);
    const settleTimerRef = useRef<NodeJS.Timeout | null>(null);
    const [canvasSize, setCanvasSize] = useState({ width: 1200, height: 800 });

    const initLine = () => {
        const w = containerRef.current?.clientWidth || 1200;
        const h = containerRef.current?.clientHeight || 800;
        const waterY = h - 100;
        PIVOT.current = { x: w / 2, y: waterY - 20 };

        if (settleTimerRef.current) {
            clearTimeout(settleTimerRef.current);
            settleTimerRef.current = null;
        }

        const points: Point[] = [];
        for (let i = 0; i < SEGMENT_COUNT; i++) {
            points.push({
                x: PIVOT.current.x - i * SEGMENT_DIST_BASE,
                y: waterY,
                oldX: PIVOT.current.x - i * SEGMENT_DIST_BASE,
                oldY: waterY,
            });
        }
        lineRef.current = points;
        cameraRef.current = { zoom: 1, x: 0 };
    };

    useEffect(() => {
        initLine();
        const handleResize = () => {
            if (containerRef.current) {
                setCanvasSize({
                    width: containerRef.current.clientWidth,
                    height: containerRef.current.clientHeight,
                });
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        const update = () => {
            const points = lineRef.current;
            if (!points.length) return;

            const WATER_LEVEL = canvasSize.height - 100;

            // 1. ROD
            const dx = mouseRef.current.x - PIVOT.current.x;
            const dy = mouseRef.current.y - PIVOT.current.y;
            let angle = Math.atan2(dy, dx);
            angle = Math.max(-Math.PI * 0.85, Math.min(-Math.PI * 0.1, angle));
            rodTipRef.current = {
                x: PIVOT.current.x + Math.cos(angle) * ROD_LENGTH,
                y: PIVOT.current.y + Math.sin(angle) * ROD_LENGTH,
            };

            // 2. TENSION
            const fly = points[points.length - 1];
            const distToTip = Math.sqrt(
                (fly.x - rodTipRef.current.x) ** 2 +
                    (fly.y - rodTipRef.current.y) ** 2
            );
            tensionRef.current =
                distToTip > SEGMENT_COUNT * SEGMENT_DIST_BASE * 0.88;

            // 3. PHYSICS
            for (let i = 0; i < points.length; i++) {
                const p = points[i];
                if (i === 0 && !game.isCasting) {
                    p.x = rodTipRef.current.x;
                    p.y = rodTipRef.current.y;
                } else {
                    const onWater = p.y >= WATER_LEVEL - 1;
                    const friction = onWater ? WATER_FRICTION : FRICTION;
                    let vx = (p.x - p.oldX) * friction;
                    let vy = (p.y - p.oldY) * friction;
                    p.oldX = p.x;
                    p.oldY = p.y;
                    p.x += vx;
                    p.y += vy + GRAVITY;
                    if (p.y > WATER_LEVEL) {
                        p.y = WATER_LEVEL;
                        p.oldX = p.x - vx * 0.15;
                    }
                }
            }

            // 4. CAMERA
            const flyX = points[points.length - 1].x;
            if (game.isCasting) {
                const span = flyX - PIVOT.current.x + 600;
                const targetZoom = Math.max(
                    0.06,
                    Math.min(1, canvasSize.width / span)
                );
                const targetCamX =
                    (flyX + PIVOT.current.x) / 2 - PIVOT.current.x;

                cameraRef.current.zoom +=
                    (targetZoom - cameraRef.current.zoom) * 0.04;
                cameraRef.current.x +=
                    (targetCamX - cameraRef.current.x) * 0.04;

                // Show result trigger
                const flyVel = Math.abs(fly.x - fly.oldX);
                if (
                    fly.y >= WATER_LEVEL - 1 &&
                    flyVel < 0.05 &&
                    !game.showResult &&
                    settleTimerRef.current === null
                ) {
                    settleTimerRef.current = setTimeout(() => {
                        setGame((prev) => ({ ...prev, showResult: true }));
                    }, 1000);
                }
            }

            // 5. CONSTRAINTS
            for (let j = 0; j < 12; j++) {
                for (let i = 0; i < points.length - 1; i++) {
                    const p1 = points[i];
                    const p2 = points[i + 1];
                    const dist = Math.sqrt(
                        (p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2
                    );
                    const diff = SEGMENT_DIST_BASE - dist;
                    const ox = ((p2.x - p1.x) / dist) * diff * 0.5;
                    const oy = ((p2.y - p1.y) / dist) * diff * 0.5;
                    if (i === 0 && !game.isCasting) {
                        p2.x += ox * 2;
                        p2.y += oy * 2;
                    } else {
                        p1.x -= ox;
                        p1.y -= oy;
                        p2.x += ox;
                        p2.y += oy;
                    }
                }
            }

            // 6. RENDER
            ctx.save();
            ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
            ctx.translate(canvasSize.width / 2, canvasSize.height - 100);
            ctx.scale(cameraRef.current.zoom, cameraRef.current.zoom);
            ctx.translate(-PIVOT.current.x - cameraRef.current.x, 0);

            // Water
            ctx.fillStyle = "#0c4a6e";
            ctx.fillRect(PIVOT.current.x - 4000, 0, 40000, 1000);

            // Markers
            ctx.fillStyle = "rgba(255,255,255,0.2)";
            ctx.font = `bold ${22 / cameraRef.current.zoom}px sans-serif`;
            for (let f = 50; f <= MAX_DIST_FT; f += 50) {
                const xPos = PIVOT.current.x + f * 36;
                ctx.fillRect(xPos, -25, 2, 50);
                ctx.fillText(`${f}ft`, xPos + 10, -35);
            }

            // DRAW RUNNING LINE (Matched to Fly Line)
            if (game.isCasting) {
                const startX = rodTipRef.current.x;
                const startY = rodTipRef.current.y - (canvasSize.height - 100);
                const endX = points[0].x;
                const endY = points[0].y - (canvasSize.height - 100);

                // Sag calculation: ensure the control point never goes below the water (0)
                const midX = (startX + endX) / 2;
                const sagAmount = Math.abs(endX - startX) * 0.15;
                const midY = Math.min(Math.max(startY, endY) + sagAmount, 0);

                ctx.beginPath();
                ctx.lineWidth = 3 / cameraRef.current.zoom;
                ctx.strokeStyle = "#fbbf24";
                ctx.moveTo(startX, startY);
                ctx.quadraticCurveTo(midX, midY, endX, endY);
                ctx.stroke();
            }

            // DRAW FLY LINE
            ctx.beginPath();
            ctx.lineWidth = 3 / cameraRef.current.zoom;
            ctx.strokeStyle =
                tensionRef.current && game.isMouseDown ? "#fff" : "#fbbf24";
            ctx.moveTo(points[0].x, points[0].y - (canvasSize.height - 100));
            for (let i = 1; i < points.length; i++) {
                ctx.lineTo(
                    points[i].x,
                    points[i].y - (canvasSize.height - 100)
                );
            }
            ctx.stroke();

            // Fly & Rod
            ctx.fillStyle = "#f43f5e";
            ctx.beginPath();
            ctx.arc(
                fly.x,
                fly.y - (canvasSize.height - 100),
                5 / cameraRef.current.zoom,
                0,
                Math.PI * 2
            );
            ctx.fill();

            ctx.beginPath();
            ctx.lineWidth = 8 / cameraRef.current.zoom;
            ctx.strokeStyle = "#0f172a";
            ctx.lineCap = "round";
            ctx.moveTo(PIVOT.current.x, -20);
            ctx.lineTo(
                PIVOT.current.x + (rodTipRef.current.x - PIVOT.current.x),
                rodTipRef.current.y - (canvasSize.height - 100)
            );
            ctx.stroke();

            ctx.restore();
            animationFrameId = requestAnimationFrame(update);
        };

        update();
        return () => cancelAnimationFrame(animationFrameId);
    }, [canvasSize, game]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!game.isMouseDown || game.isCasting) return;
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;
        const worldX =
            (e.clientX - rect.left - canvasSize.width / 2) /
                cameraRef.current.zoom +
            PIVOT.current.x +
            cameraRef.current.x;
        const moveX = worldX - mouseRef.current.x;
        mouseRef.current.x = worldX;

        if (Math.abs(moveX) > 1) {
            if (tensionRef.current) {
                if (moveX < 0) {
                    // Backcast: harder to load
                    setGame((prev) => ({
                        ...prev,
                        potential: Math.min(
                            prev.potential + Math.abs(moveX) * 0.04,
                            100
                        ),
                    }));
                } else {
                    // Forward cast
                    setGame((prev) => ({
                        ...prev,
                        power: Math.min(
                            prev.power + moveX * 1.4,
                            prev.potential * 15
                        ),
                    }));
                }
            } else {
                // High penalty for poor rhythm
                setGame((prev) => ({
                    ...prev,
                    potential: prev.potential * 0.9,
                    power: prev.power * 0.75,
                }));
            }
        }
    };

    const executeCast = () => {
        if (!game.isMouseDown) return;
        const power = Math.max(10, game.power);
        const shootForce = power / 9;

        lineRef.current.forEach((p, i) => {
            const boost = shootForce * (1.4 - i / SEGMENT_COUNT);
            p.oldX = p.x - boost;
            p.oldY = p.y + shootForce / 4;
        });

        // HARDER DIFFICULTY: Exponential drop-off
        const distRatio = Math.pow(power / 1500, 3.0);
        const dist = Math.max(
            5,
            Math.min(MAX_DIST_FT, Math.floor(distRatio * MAX_DIST_FT * 8.0))
        );

        setGame((prev) => ({
            ...prev,
            isMouseDown: false,
            isCasting: true,
            distance: dist,
            highScore: Math.max(prev.highScore, dist),
        }));
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full bg-slate-950 overflow-hidden cursor-crosshair font-sans"
        >
            <div className="absolute top-10 left-10 z-10 pointer-events-none opacity-90">
                <div className="flex flex-col gap-1">
                    <span className="text-sky-400 text-[9px] font-black uppercase tracking-[0.2em] mb-1">
                        Rod Potential
                    </span>
                    <div className="w-40 h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-sky-400"
                            animate={{ width: `${game.potential}%` }}
                        />
                    </div>
                    <div className="w-64 h-3 bg-white/5 rounded-full overflow-hidden mt-1 border border-white/10">
                        <motion.div
                            className="h-full bg-orange-500"
                            animate={{ width: `${(game.power / 1500) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="absolute top-10 right-10 text-right opacity-30">
                <p className="text-8xl font-black text-white italic tracking-tighter leading-none">
                    {game.highScore}
                </p>
                <p className="text-sky-500 font-bold uppercase text-[10px] tracking-widest leading-none mt-2">
                    PB Distance
                </p>
            </div>

            <AnimatePresence>
                {game.showResult && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        key="result-popup"
                        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 w-full max-w-sm px-6"
                    >
                        <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 p-6 rounded-3xl flex items-center justify-between shadow-2xl">
                            <div>
                                <div className="text-sky-400 font-bold uppercase text-[9px] tracking-[0.3em] mb-1">
                                    Cast Distance
                                </div>
                                <div className="text-5xl font-black text-white italic">
                                    {game.distance}
                                    <span className="text-sm ml-1 text-white/40 italic">
                                        ft
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    setGame((prev) => ({
                                        ...prev,
                                        showResult: false,
                                        isCasting: false,
                                        potential: 5,
                                        power: 0,
                                    }));
                                    initLine();
                                }}
                                className="bg-white text-slate-950 px-6 py-4 rounded-2xl font-black uppercase text-[10px] hover:bg-sky-500 hover:text-white transition-all active:scale-95"
                            >
                                Reset
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <canvas
                ref={canvasRef}
                width={canvasSize.width}
                height={canvasSize.height}
                onMouseDown={() =>
                    !game.isCasting &&
                    setGame((prev) => ({ ...prev, isMouseDown: true }))
                }
                onMouseMove={handleMouseMove}
                onMouseUp={executeCast}
                onMouseLeave={() =>
                    game.isMouseDown &&
                    !game.isCasting &&
                    setGame((prev) => ({
                        ...prev,
                        isMouseDown: false,
                        power: 0,
                    }))
                }
                className="w-full h-full block"
            />
        </div>
    );
}
