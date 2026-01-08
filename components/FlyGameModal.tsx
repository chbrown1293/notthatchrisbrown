// components/FlyGameModal.tsx
"use client";

import { Fish, X } from "lucide-react";
import React, { useEffect } from "react";

export default function FlyGameModal({
    children,
    isVisible,
    onClose,
    title = "Fly Casting Simulator",
    icon,
}: {
    children: React.ReactNode;
    isVisible: boolean;
    onClose: () => void;
    title?: string;
    icon?: React.ReactNode;
}) {
    // Handle Closing Logic
    const handleClose = () => {
        window.dispatchEvent(
            new CustomEvent("modalStateChange", { detail: { open: false } })
        );
        onClose();
    };

    // Body Scroll Lock + ESC Key Listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
        };

        if (isVisible) {
            window.dispatchEvent(
                new CustomEvent("modalStateChange", { detail: { open: true } })
            );
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.body.style.overflow = "auto";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 print:hidden">
            {/* Background Overlay */}
            <div
                className="absolute z-[210] inset-0 bg-[#0d140d]/90 backdrop-blur-xl transition-opacity"
                onClick={handleClose}
            />

            {/* Modal Container */}
            <div className="relative w-full h-full z-[220] bg-[#0a120a] border border-lime-500/30 rounded-[2.5rem] shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col">
                {/* Topographic Texture */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/topography.png')]" />

                {/* Header */}
                <div className="relative z-10 flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-lime-500/10 rounded-2xl border border-lime-500/20 text-lime-400">
                            {icon ? icon : <Fish size={22} />}
                        </div>
                        <div>
                            <h2 className="text-[12px] font-black uppercase tracking-[0.4em] text-lime-400">
                                {title}
                            </h2>
                            <p className="text-xs text-white/50  tracking-wide mt-1">
                                See how well you understand fly casting physics
                                - build your cast potential by executing well
                                timed backcasts! Click and hold the rod to start
                                a cast, then release at the optimal time to
                                maximize distance.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleClose}
                        className="p-3 rounded-full hover:bg-white/10 text-slate-500 hover:text-white transition-all hover:rotate-90 cursor-pointer"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Main Content Area (Game Window) */}
                <div className="relative z-10 flex-1 overflow-hidden p-3 md:p-6 bg-black/40">
                    <div className="w-full h-full rounded-[1.5rem] overflow-hidden border border-lime-500/10 bg-[#111] shadow-2xl relative">
                        {children}
                    </div>
                </div>

                {/* Footer */}
                <div className="relative z-10 p-5 border-t border-white/5 bg-black/60 flex justify-between items-center px-10">
                    <div className="hidden md:flex gap-8">
                        <div className="flex flex-col">
                            <span className="text-[8px] text-lime-500/40 uppercase font-black tracking-widest">
                                Physics Engaged
                            </span>
                            <span className="text-[10px] text-white/70 uppercase font-black tracking-tighter italic">
                                Verlet Integration Active
                            </span>
                        </div>
                        <div className="flex flex-col border-l border-white/10 pl-8">
                            <span className="text-[8px] text-lime-500/40 uppercase font-black tracking-widest">
                                Objective
                            </span>
                            <span className="text-[10px] text-white/70 uppercase font-black tracking-tighter italic">
                                Precision 2 O&apos;Clock Release
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={handleClose}
                        className="text-[11px] font-black text-lime-400 uppercase tracking-[0.2em] hover:brightness-125 transition-all ml-auto cursor-pointer flex items-center gap-2 group"
                    >
                        <span className="group-hover:mr-1 transition-all">
                            TERMINATE SESSION
                        </span>
                        <X size={14} className="opacity-50" />
                    </button>
                </div>
            </div>
        </div>
    );
}
