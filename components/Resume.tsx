"use client";

import { Compass, Github, Linkedin, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ASIExpedition } from "./ASIExpedition";
import { EarlyExpeditions } from "./EarlyExpeditions";
import { EducationBasecamp } from "./EducationBasecamp";
import FlyCastingGame from "./FlyCastingGame";
import FlyGameModal from "./FlyGameModal";
import { HackleThreadsExpedition } from "./HackleThreadsExpedition";
import { Identity } from "./Identity";
import { TappCarExpedition } from "./TappCarExpedition";

export const Resume = ({ isExporting = false }: { isExporting?: boolean }) => {
    const [flyGameOpen, setFlyGameOpen] = useState(false);

    return (
        <div
            id="resume"
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

            {/* HERO IMAGE */}
            <div className="relative h-64 md:h-80 w-full overflow-hidden">
                <Image
                    src="/golden.png"
                    alt="Golden BC"
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
                        <h1 className="text-5xl font-black tracking-tighter uppercase italic drop-shadow-md pr-2">
                            Chris Brown
                        </h1>
                        <p className="text-lime-400 font-mono text-sm uppercase font-black mt-2">
                            Engineering Manager | Full-Stack Developer
                        </p>
                        <div className="flex items-center justify-center gap-4 mt-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
                            <span className="flex items-center gap-1">
                                <MapPin size={14} className="text-lime-600" />{" "}
                                Golden, BC, Canada
                            </span>
                            <span className="bg-white/10 px-2 py-0.5 rounded text-[0.625rem] border border-white/10">
                                Open to Work
                            </span>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-20">
                    {/* LEFT COLUMN: Summary */}
                    <div className="md:col-span-8 space-y-6">
                        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-md shadow-xl">
                            <div className="flex items-center gap-3 mb-4 text-lime-400">
                                <Compass size={24} />
                                <h2 className="text-xs font-black uppercase tracking-[0.2em]">
                                    Summary
                                </h2>
                            </div>
                            <div
                                className={`prose prose-invert max-w-none space-y-3 text-slate-300 ${isExporting ? "text-sm" : "text-[13px]"}`}
                            >
                                <p
                                    className={`font-medium text-white italic border-l-4 border-lime-500 pl-4 ${isExporting ? "text-xl" : "text-lg"}`}
                                >
                                    "I'm a technical leader with 8+ years
                                    building and scaling data-driven SaaS
                                    platforms, leading engineering teams, and
                                    shaping product strategy."
                                </p>
                                <p>
                                    My background spans full-stack engineering,
                                    product development, data pipelines, and
                                    research analytics/visualization. I've led
                                    teams at high-growth startups and
                                    collaborated closely with cross-functional
                                    partners to drive product innovation and
                                    business growth.
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

                        {/* Contact + Essentials shown here only during export */}
                        {isExporting && (
                            <>
                                <ContactCard />
                            </>
                        )}
                    </div>

                    {/* RIGHT COLUMN: About Me */}
                    <div className="md:col-span-4">
                        <Identity />
                    </div>

                    {/* FULL WIDTH EXPERIENCE */}
                    <div className="md:col-span-12">
                        <h4 className="text-lime-400 font-mono uppercase font-black mt-2 ml-2 mb-4 tracking-widest">
                            Experience
                        </h4>

                        <div className="space-y-6">
                            <ASIExpedition isExporting={isExporting} />
                            <HackleThreadsExpedition />
                            <TappCarExpedition />
                            <EarlyExpeditions />
                            <EducationBasecamp />
                        </div>
                    </div>

                    {/* SIDEBAR ITEMS — hidden during export (moved to left column above) */}
                    {!isExporting && (
                        <div className="md:col-span-12 space-y-4">
                            <ContactCard />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

/* Helper Cards */
const ContactCard = () => (
    <div className="bg-lime-400 text-black p-6 rounded-[2.5rem] shadow-[0_0_30px_rgba(163,230,53,0.2)]">
        <h3 className="text-[0.625rem] font-black uppercase mb-3 opacity-70">
            External and Contact
        </h3>
        <div className="space-y-3 font-bold text-xs">
            <Link
                href="mailto:chris@notthatchrisbrown.ca"
                className="flex items-center gap-3 hover:underline"
            >
                <Mail size={16} /> chris@notthatchrisbrown.ca
            </Link>
            <Link
                href="#"
                className="flex items-center gap-3 hover:underline"
                target="_blank"
            >
                <Linkedin size={16} /> LinkedIn
            </Link>
            <Link
                href="#"
                className="flex items-center gap-3 hover:underline"
                target="_blank"
            >
                <Github size={16} /> GitHub
            </Link>
        </div>
    </div>
);

const EssentialsCard = () => (
    <div className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem]">
        <h3 className="text-[0.625rem] font-black uppercase mb-3 text-slate-500">
            Essentials
        </h3>
        <div className="flex flex-wrap gap-2">
            {[
                "Next.js",
                "TypeScript",
                "SaaS Arch",
                "Product Strategy",
                "ML Integration",
                "Team Leadership",
                "System Design",
                "Stakeholder Mgmt",
                "Roadmapping",
            ].map((skill) => (
                <span
                    key={skill}
                    className="text-[9px] font-bold border border-white/20 px-2 py-1 rounded-full bg-white/5 uppercase tracking-tight"
                >
                    {skill}
                </span>
            ))}
        </div>
    </div>
);
