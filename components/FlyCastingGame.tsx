"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

// --- Types ---
interface Point {
    x: number;
    y: number;
    oldX: number;
    oldY: number;
}

interface GameState {
    power: number;
    distance: number;
    isCasting: boolean;
    isMouseDown: boolean;
    highScore: number;
}

const SEGMENT_COUNT = 20;
const SEGMENT_DIST = 15;
const GRAVITY = 0.4;
const FRICTION = 0.98;
const ROD_LENGTH = 180; // Fixed rod length
const TARGET_ANGLE = -Math.PI / 6; // 2 o'clock
const TOLERANCE = 1.0; // How quickly the penalty scales (1.0 is fairly strict)

export default function FlyCastingGame() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [game, setGame] = useState<GameState>({
        power: 0,
        distance: 0,
        isCasting: false,
        isMouseDown: false,
        highScore: 0,
    });

    // Refs for physics to keep 60fps without React state lag
    const lineRef = useRef<Point[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const rodTipRef = useRef({ x: 150, y: 200 });
    const pivotRef = useRef({ x: 150, y: 500 }); // The "hand" position

    // Initialize Line
    useEffect(() => {
        const points: Point[] = [];
        for (let i = 0; i < SEGMENT_COUNT; i++) {
            points.push({ x: 150, y: 300, oldX: 150, oldY: 300 });
        }
        lineRef.current = points;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        const update = () => {
            const points = lineRef.current;
            const pivot = { x: 150, y: canvas.height - 100 };
            pivotRef.current = pivot;

            // 1. Calculate Fixed Rod Tip Position based on mouse angle
            const dx = mouseRef.current.x - pivot.x;
            const dy = mouseRef.current.y - pivot.y;
            const angle = Math.atan2(dy, dx);

            rodTipRef.current = {
                x: pivot.x + Math.cos(angle) * ROD_LENGTH,
                y: pivot.y + Math.sin(angle) * ROD_LENGTH,
            };

            // 2. Verlet Integration (Physics)
            for (let i = 0; i < points.length; i++) {
                const p = points[i];

                if (i === 0) {
                    // Attachment point is the rod tip
                    p.x = rodTipRef.current.x;
                    p.y = rodTipRef.current.y;
                } else {
                    const vx = (p.x - p.oldX) * FRICTION;
                    const vy = (p.y - p.oldY) * FRICTION;

                    p.oldX = p.x;
                    p.oldY = p.y;
                    p.x += vx;
                    p.y += vy + GRAVITY;
                }
            }

            // 3. Constraints
            for (let j = 0; j < 5; j++) {
                for (let i = 0; i < points.length - 1; i++) {
                    const p1 = points[i];
                    const p2 = points[i + 1];
                    const dx = p2.x - p1.x;
                    const dy = p2.y - p1.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const diff = SEGMENT_DIST - dist;
                    const percent = diff / dist / 2;
                    const offsetX = dx * percent;
                    const offsetY = dy * percent;

                    if (i !== 0) {
                        p1.x -= offsetX;
                        p1.y -= offsetY;
                    }
                    p2.x += offsetX;
                    p2.y += offsetY;
                }
            }

            // 4. Drawing
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Water
            ctx.fillStyle = "#1e40af";
            ctx.fillRect(0, canvas.height - 100, canvas.width, 100);

            // Fly Line
            ctx.beginPath();
            ctx.lineWidth = 2.5;
            ctx.strokeStyle = "#fbbf24";
            ctx.lineJoin = "round";
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }
            ctx.stroke();

            // Rod (Fixed Length)
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.strokeStyle = "#334155";
            ctx.lineCap = "round";
            ctx.moveTo(pivot.x, pivot.y);
            ctx.lineTo(rodTipRef.current.x, rodTipRef.current.y);
            ctx.stroke();

            // Rod Handle
            ctx.beginPath();
            ctx.arc(pivot.x, pivot.y, 8, 0, Math.PI * 2);
            ctx.fillStyle = "#000";
            ctx.fill();

            animationFrameId = requestAnimationFrame(update);
        };

        update();
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    const handleMouseDown = () => {
        setGame((prev) => ({ ...prev, isMouseDown: true, power: 0 }));
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // 1. Determine direction BEFORE updating the ref
        const movementX = x - mouseRef.current.x;

        // IMPORTANT: Update the ref so the rod actually moves!
        mouseRef.current = { x, y };

        const isMovingForward = movementX > 2; // Threshold to prevent jitter

        // 2. Check line straightness (Tension)
        const points = lineRef.current;
        if (points.length === 0) return;

        const fly = points[points.length - 1];
        const rodTip = rodTipRef.current;

        // Calculate distance from tip to fly
        const distToFly = Math.sqrt(
            (fly.x - rodTip.x) ** 2 + (fly.y - rodTip.y) ** 2
        );
        const totalLength = SEGMENT_COUNT * SEGMENT_DIST;

        // Is the fly behind the rod tip? (Check if fly.x is less than tip.x)
        const isLineBehind = fly.x < rodTip.x;

        // 3. Logic for "Loading" the cast
        if (game.isMouseDown && !game.isCasting) {
            // Power Stroke: Moving forward + line is stretched out behind you
            if (
                isMovingForward &&
                isLineBehind &&
                distToFly > totalLength * 0.7
            ) {
                setGame((prev) => ({
                    ...prev,
                    power: Math.min(
                        prev.power + Math.abs(movementX) * 0.4, // Increased sensitivity
                        100
                    ),
                }));
            } else {
                // Decay power slowly if not in a perfect power stroke
                setGame((prev) => ({
                    ...prev,
                    power: prev.power * 0.98,
                }));
            }
        }
    };

    const handleMouseUp = () => {
        if (!game.isMouseDown) return;

        // 1. Calculate the angle of the rod at release
        const dx = mouseRef.current.x - pivotRef.current.x;
        const dy = mouseRef.current.y - pivotRef.current.y;
        const releaseAngle = Math.atan2(dy, dx);

        // 2. Calculate accuracy (1.0 is perfect, 0.0 is completely off)
        // We compare releaseAngle to TARGET_ANGLE (-0.52 radians)
        const angleDiff = Math.abs(releaseAngle - TARGET_ANGLE);
        const accuracy = Math.max(0, 1 - angleDiff * TOLERANCE);

        if (game.power > 15) {
            // 3. Apply accuracy to the final distance
            const finalDist = Math.floor(game.power * 2.8 * accuracy);

            setGame((prev) => ({
                ...prev,
                isMouseDown: false,
                isCasting: true,
                distance: finalDist,
                highScore: Math.max(prev.highScore, finalDist),
            }));

            setTimeout(() => {
                setGame((prev) => ({ ...prev, isCasting: false, power: 0 }));
            }, 1500);
        } else {
            setGame((prev) => ({ ...prev, isMouseDown: false, power: 0 }));
        }
    };

    return (
        <div
            className="relative w-full h-full bg-sky-300 rounded-xl overflow-hidden cursor-crosshair select-none shadow-2xl border-4 border-slate-700"
            onMouseLeave={handleMouseUp}
        >
            {/* UI Overlay */}
            <div className="absolute top-6 left-6 z-10 pointer-events-none">
                <h2 className="text-2xl font-black text-slate-800 uppercase italic tracking-tighter">
                    Tension Cast
                </h2>
                <div className="mt-2 w-48 h-4 bg-slate-800/20 rounded-full overflow-hidden border border-white/50 backdrop-blur-sm">
                    <motion.div
                        className="h-full bg-orange-500"
                        animate={{ width: `${game.power}%` }}
                        transition={{
                            type: "spring",
                            bounce: 0,
                            duration: 0.1,
                        }}
                    />
                </div>
                <p className="text-[10px] font-bold text-slate-700 mt-1 uppercase tracking-widest">
                    {game.isMouseDown
                        ? "Charging Power..."
                        : "Hold Click to Begin"}
                </p>
            </div>

            <div className="absolute top-6 right-6 text-right z-10">
                <p className="text-xs font-bold text-slate-700 uppercase">PB</p>
                <p className="text-3xl font-black text-slate-900 leading-none">
                    {game.highScore}
                    <span className="text-sm">ft</span>
                </p>
            </div>

            {/* Result Popup */}
            <AnimatePresence>
                {game.isCasting && (
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.5, opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                    >
                        <div className="bg-white px-10 py-6 rounded-3xl shadow-2xl border-b-8 border-orange-600 text-center">
                            <p className="text-orange-500 font-black uppercase text-xs tracking-widest">
                                Line Out!
                            </p>
                            <h3 className="text-7xl font-black text-slate-900 italic">
                                {game.distance}ft
                            </h3>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Instructions */}
            {!game.isMouseDown && !game.isCasting && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                    >
                        <p className="text-slate-800 font-black text-xl uppercase italic bg-white/30 px-4 py-2 rounded-full backdrop-blur-md">
                            Hold Left Click & Shake to Load
                        </p>
                    </motion.div>
                </div>
            )}

            <canvas
                ref={canvasRef}
                width={1200}
                height={600}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                className="w-full h-full"
            />
        </div>
    );
}
