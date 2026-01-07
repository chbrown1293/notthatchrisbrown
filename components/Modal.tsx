// components/Modal.tsx
import { Compass, X } from "lucide-react";
import React from "react";

type ColorScheme = "lime" | "blue" | "orange" | "purple";

export default function Modal({
    children,
    isVisible,
    onClose,
    title = "Field Report",
    icon,
    colorScheme = "lime",
}: {
    children: React.ReactNode;
    isVisible: boolean;
    onClose: () => void;
    title?: string;
    icon?: React.ReactNode;
    colorScheme?: ColorScheme;
}) {
    if (!isVisible) return null;

    const themes = {
        lime: {
            text: "text-lime-400",
            border: "border-lime-500/30",
            bgSoft: "bg-lime-500/10",
            borderSoft: "border-lime-500/20",
            prose: "prose-lime",
        },
        blue: {
            text: "text-indigo-400",
            border: "border-indigo-500/30",
            bgSoft: "bg-indigo-500/10",
            borderSoft: "border-indigo-500/20",
            prose: "prose-indigo",
        },
        orange: {
            text: "text-orange-400",
            border: "border-orange-500/30",
            bgSoft: "bg-orange-500/10",
            borderSoft: "border-orange-500/20",
            prose: "prose-orange",
        },
        purple: {
            text: "text-purple-400",
            border: "border-purple-500/30",
            bgSoft: "bg-purple-500/10",
            borderSoft: "border-purple-500/20",
            prose: "prose-purple",
        },
    };

    const theme = themes[colorScheme];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 print:hidden">
            <div
                className="absolute inset-0 bg-[#0d140d]/80 backdrop-blur-md transition-opacity"
                onClick={onClose}
            />

            <div
                className={`relative w-full max-w-2xl bg-[#142114] border ${theme.border} rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in zoom-in duration-300`}
            >
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/topography.png')]" />

                <div className="relative z-10 flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                        <div
                            className={`p-2 ${theme.bgSoft} rounded-xl border ${theme.borderSoft} ${theme.text}`}
                        >
                            {icon ? icon : <Compass size={18} />}
                        </div>
                        <h2
                            className={`text-[10px] font-black uppercase tracking-[0.3em] ${theme.text}`}
                        >
                            {title}
                        </h2>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/10 text-slate-500 hover:text-white transition-all hover:rotate-90 cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="relative z-10 p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    <div
                        className={`prose prose-invert ${theme.prose} max-w-none`}
                    >
                        {children}
                    </div>
                </div>

                <div className="relative z-10 p-4 border-t border-white/5 bg-black/20 flex justify-between items-center px-8">
                    <button
                        onClick={onClose}
                        className={`text-[10px] font-black ${theme.text} uppercase tracking-widest hover:underline ml-auto cursor-pointer`}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
