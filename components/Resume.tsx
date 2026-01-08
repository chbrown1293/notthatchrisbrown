import {
    Briefcase,
    Compass,
    Fish,
    Github,
    Linkedin,
    Mail,
    MapPin, // Added for tab icon
    User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { forwardRef, useState } from "react"; // Added useState
import { ASIExpedition } from "./ASIExpedition";
import { EarlyExpeditions } from "./EarlyExpeditions";
import { EducationBasecamp } from "./EducationBasecamp";
import FlyCastingGame from "./FlyCastingGame";
import FlyGameModal from "./FlyGameModal";
import { HackleThreadsExpedition } from "./HackleThreadsExpedition";
import { Identity } from "./Identity";
import { TappCarExpedition } from "./TappCarExpedition";

export const Resume = forwardRef<HTMLDivElement>((props, ref) => {
    // 1. Define the active tab state
    const [activeTab, setActiveTab] = useState<"experience" | "about">(
        "experience"
    );

    const [flyGameOpen, setFlyGameOpen] = useState(false);

    return (
        <div
            ref={ref}
            className="min-h-screen bg-[#142114] text-slate-100 font-sans selection:bg-lime-500 selection:text-black"
        >
            {flyGameOpen && (
                <FlyGameModal
                    onClose={() => setFlyGameOpen(false)}
                    isVisible={flyGameOpen}
                >
                    <FlyCastingGame />
                </FlyGameModal>
            )}
            <div className="relative h-64 md:h-80 w-full overflow-hidden">
                <Image
                    src="/golden.png"
                    alt="Golden BC Landscape"
                    fill
                    priority
                    className="object-cover object-top"
                    quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#142114] z-10"></div>
            </div>

            <div className="max-w-5xl mx-auto px-6 -mt-24 relative z-10">
                <header className="relative flex flex-col items-center justify-center pt-12 pb-8">
                    <div className="md:absolute md:top-0 md:right-0 w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#142114] bg-slate-800 overflow-hidden shadow-2xl z-20 shrink-0">
                        <Image
                            src="/profile.jpg"
                            alt="Chris Brown"
                            className="w-full h-full object-cover"
                            width={160}
                            height={160}
                        />
                    </div>

                    <div className="w-full text-center z-10">
                        <div className="flex items-center justify-center gap-2">
                            <h1 className="text-5xl font-black tracking-tighter uppercase italic drop-shadow-md pr-2">
                                Chris Brown
                            </h1>
                        </div>

                        <p className="text-lime-400 font-mono text-sm uppercase font-black mt-2">
                            Technical Product Leader | Engineering Manager |
                            Full-Stack
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
                            <span className="flex items-center gap-1">
                                <MapPin size={14} className="text-lime-600" />{" "}
                                Golden, BC, Canada
                            </span>
                            <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] border border-white/10">
                                Open to Work
                            </span>
                        </div>
                    </div>
                </header>

                {/* 2. TAB TOGGLE (Mobile Only) */}
                <div className="flex md:hidden bg-white/5 border border-white/10 p-1 rounded-2xl mb-8">
                    <button
                        onClick={() => setActiveTab("experience")}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                            activeTab === "experience"
                                ? "bg-lime-500 text-black"
                                : "text-slate-400"
                        }`}
                    >
                        <Briefcase size={16} /> Experience
                    </button>
                    <button
                        onClick={() => setActiveTab("about")}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                            activeTab === "about"
                                ? "bg-lime-500 text-black"
                                : "text-slate-400"
                        }`}
                    >
                        <User size={16} /> About
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-20">
                    {/* 3. LEFT COLUMN (Journey/Experience) */}
                    {/* Logic: Hidden on mobile IF activeTab is NOT experience. Always visible on md+ */}
                    <div
                        className={`${
                            activeTab === "experience" ? "block" : "hidden"
                        } md:block md:col-span-8 space-y-6`}
                    >
                        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-md shadow-xl">
                            <div className="flex items-center gap-3 mb-6 text-lime-400">
                                <Compass size={24} />
                                <h2 className="text-xs font-black uppercase tracking-[0.2em]">
                                    Summary
                                </h2>
                            </div>
                            <div className="prose prose-invert max-w-none space-y-4 text-slate-300 leading-relaxed">
                                <p className="text-xl font-medium text-white italic border-l-4 border-lime-500 pl-4">
                                    "I’m a technical leader with 8+ years
                                    building and scaling data-driven SaaS
                                    platforms, leading engineering teams, and
                                    shaping product strategy."
                                </p>
                                <p>
                                    My background spans product development,
                                    full-stack engineering, data pipelines, and
                                    research analytics. This gives me a unique
                                    ability to bridge engineering, product, and
                                    business needs.
                                </p>
                                <p>
                                    I thrive in roles where I can combine deep
                                    technical understanding with product
                                    thinking: translating user needs into
                                    product requirements, designing architecture
                                    that will scale, and collaborating across
                                    engineering, data science, design, and
                                    executive teams.
                                </p>
                            </div>
                        </div>

                        <h4 className="text-lime-400 font-mono uppercase font-black mt-2 ml-2 tracking-widest">
                            Experience
                        </h4>
                        <ASIExpedition />
                        <HackleThreadsExpedition />
                        <TappCarExpedition />
                        <EarlyExpeditions />
                        <EducationBasecamp />
                    </div>

                    {/* 4. RIGHT COLUMN (Identity/Sidebar) */}
                    {/* Logic: Hidden on mobile IF activeTab is NOT about. Always visible on md+ */}
                    <div
                        className={`${
                            activeTab === "about" ? "block" : "hidden"
                        } md:block md:col-span-4 space-y-4`}
                    >
                        <Identity />

                        <div className="bg-lime-400 text-black p-6 rounded-[2.5rem] shadow-[0_0_30px_rgba(163,230,53,0.2)]">
                            <h3 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-70">
                                External and Contact
                            </h3>
                            <div className="space-y-4 font-bold">
                                <Link
                                    href="mailto:chris@notthatchrisbrown.ca"
                                    className="flex items-center gap-3 hover:underline"
                                >
                                    <Mail size={18} />{" "}
                                    chris@notthatchrisbrown.ca
                                </Link>
                                <Link
                                    href="https://linkedin.com/..."
                                    className="flex items-center gap-3 hover:underline"
                                    target="_blank"
                                >
                                    <Linkedin size={18} /> LinkedIn
                                </Link>
                                <Link
                                    href="https://github.com/..."
                                    className="flex items-center gap-3 hover:underline"
                                    target="_blank"
                                >
                                    <Github size={18} /> GitHub
                                </Link>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem]">
                            <h3 className="text-[10px] font-black uppercase tracking-widest mb-4 text-slate-500">
                                Essentials
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    "Next.js",
                                    "TypeScript",
                                    "SaaS Arch",
                                    "Product Strategy",
                                    "ML Integration",
                                ].map((skill) => (
                                    <span
                                        key={skill}
                                        className="text-[10px] font-bold border border-white/20 px-3 py-1 rounded-full bg-white/5 uppercase tracking-tighter"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setFlyGameOpen(true);
                            }}
                            className="bg-[#0f1a0f] hover:bg-[#162116] border border-white/5 p-6 rounded-[2.5rem] text-slate-500 flex items-center gap-2 cursor-pointer hover:text-lime-400"
                        >
                            <div className="flex gap-4">
                                <Fish size={20} />
                            </div>
                            <span className="text-[10px] font-mono uppercase tracking-widest  ">
                                Launch fly casting Simulator
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* TOPO MAP (Kept at bottom) */}
            <div className="relative w-full mt-[-15rem] md:mt-[-20rem] pointer-events-none select-none">
                <div
                    className="w-full h-64 md:h-96"
                    style={{
                        WebkitMaskImage:
                            "linear-gradient(to bottom, transparent 0%, black 100%)",
                        maskImage:
                            "linear-gradient(to bottom, transparent 0%, black 100%)",
                    }}
                >
                    <Image
                        src="/ontarioLakes1.svg"
                        alt="Topographic Map"
                        className="w-full h-full object-cover opacity-40"
                        fill
                    />
                </div>
            </div>
        </div>
    );
});

Resume.displayName = "Resume";
