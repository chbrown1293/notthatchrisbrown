"use client";

import { Compass, Github, Linkedin, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { forwardRef, useState } from "react";
import { ASIExpedition } from "./ASIExpedition";
import { EarlyExpeditions } from "./EarlyExpeditions";
import { EducationBasecamp } from "./EducationBasecamp";
import FlyCastingGame from "./FlyCastingGame";
import FlyGameModal from "./FlyGameModal";
import { HackleThreadsExpedition } from "./HackleThreadsExpedition";
import { Identity } from "./Identity";
import { TappCarExpedition } from "./TappCarExpedition";

export const Resume = forwardRef<HTMLDivElement>((props, ref) => {
    const [activeTab, setActiveTab] = useState<"experience" | "about">(
        "experience",
    );
    const [flyGameOpen, setFlyGameOpen] = useState(false);

    return (
        <div
            ref={ref}
            className="min-h-screen bg-[#142114] text-slate-100 font-sans selection:bg-lime-500 selection:text-black print-container"
        >
            <style jsx global>{`
                @media print {
                    @page {
                        size: letter;
                        margin: 0 !important;
                    }

                    html,
                    body {
                        background-color: #142114 !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }

                    .print-container {
                        width: 100% !important;
                        background-color: #142114 !important;
                        display: block !important;
                    }

                    /* --- PAGE 1 LAYOUT --- */
                    .print-grid {
                        display: grid !important;
                        grid-template-columns: repeat(
                            12,
                            minmax(0, 1fr)
                        ) !important;
                        gap: 1.25rem !important;
                        padding: 0 0.5in 0in 0.5in !important;
                    }

                    .print-span-8 {
                        grid-column: span 8 / span 8 !important;
                    }
                    .print-span-4 {
                        grid-column: span 4 / span 4 !important;
                    }

                    /* --- PAGE 2+ LAYOUT --- */
                    /* Group Header + Jobs together to prevent the blank page gap */
                    .print-work-history-container {
                        break-before: page !important; /* Force this whole group to Page 2 */
                        display: block !important;
                        width: 100% !important;
                        grid-column: span 12 / span 12 !important;
                    }

                    .print-exp-title {
                        break-after: avoid !important; /* Glue title to the first job */
                        margin-bottom: 1.5rem !important;
                        display: block !important;
                    }

                    .no-split {
                        break-inside: avoid !important;
                        page-break-inside: avoid !important;
                        display: block !important;
                        margin-bottom: 1.5rem !important;
                    }

                    /* Header/Hero Fixes */
                    .print-content-wrap {
                        margin-top: -140px !important;
                    }
                    .print-header-img {
                        height: 260px !important;
                    }
                    .print-hide {
                        display: none !important;
                    }
                }
            `}</style>

            {flyGameOpen && (
                <FlyGameModal
                    onClose={() => setFlyGameOpen(false)}
                    isVisible={flyGameOpen}
                >
                    <FlyCastingGame />
                </FlyGameModal>
            )}

            {/* HERO IMAGE */}
            <div className="relative h-64 md:h-80 w-full overflow-hidden print-header-img">
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

            <div className="max-w-5xl mx-auto px-6 -mt-24 relative z-10 print-content-wrap print:max-w-none">
                <header className="relative flex flex-col items-center justify-center pt-12 pb-8">
                    <div className="md:absolute md:top-0 md:right-0 w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#142114] bg-slate-800 overflow-hidden shadow-2xl z-20 shrink-0 print:w-32 print:h-32 print:-top-8">
                        <Image
                            src="/profile.jpg"
                            alt="Chris Brown"
                            className="w-full h-full object-cover"
                            width={160}
                            height={160}
                        />
                    </div>
                    <div className="w-full text-center z-10">
                        <h1 className="text-5xl font-black tracking-tighter uppercase italic drop-shadow-md pr-2 print:text-4xl">
                            Chris Brown
                        </h1>
                        <p className="text-lime-400 font-mono text-sm uppercase font-black mt-2">
                            Technical Product Leader | Engineering Manager |
                            Full-Stack
                        </p>
                        <div className="flex items-center justify-center gap-4 mt-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
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

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-20 print-grid">
                    {/* LEFT COLUMN: Summary + Contact + Essentials */}
                    <div className="md:col-span-8 print-span-8 space-y-6 no-split">
                        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-md shadow-xl print:p-6">
                            <div className="flex items-center gap-3 mb-4 text-lime-400">
                                <Compass size={24} />
                                <h2 className="text-xs font-black uppercase tracking-[0.2em]">
                                    Summary
                                </h2>
                            </div>
                            <div className="prose prose-invert max-w-none space-y-3 text-slate-300 text-[13px]">
                                <p className="text-lg font-medium text-white italic border-l-4 border-lime-500 pl-4 print:text-base">
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

                        {/* Move Sidebar content here for PDF only */}
                        <div className="hidden print:block space-y-4">
                            <ContactCard />
                            <EssentialsCard />
                        </div>
                    </div>

                    {/* RIGHT COLUMN: About Me */}
                    <div className="md:col-span-4 print-span-4 no-split">
                        <Identity />
                    </div>

                    {/* FULL WIDTH EXPERIENCE: Grouped to prevent the blank page gap */}
                    <div className="md:col-span-12 print-work-history-container">
                        <h4 className="text-lime-400 font-mono uppercase font-black mt-2 ml-2 mb-4 tracking-widest print:text-xs print-exp-title print:pt-8">
                            Experience
                        </h4>

                        <div className="space-y-6">
                            <div className="no-split">
                                <ASIExpedition />
                            </div>
                            <div className="no-split">
                                <HackleThreadsExpedition />
                            </div>
                            <div className="no-split print:pt-8">
                                <TappCarExpedition />
                            </div>
                            <div className="no-split">
                                <EarlyExpeditions />
                            </div>
                            <div className="no-split">
                                <EducationBasecamp />
                            </div>
                        </div>
                    </div>

                    {/* SIDEBAR ITEMS (Visible on Web Only) */}
                    <div className="md:col-span-12 print:hidden space-y-4">
                        <ContactCard />
                        <EssentialsCard />
                    </div>
                </div>
            </div>
        </div>
    );
});

/* Helper Cards */
const ContactCard = () => (
    <div className="no-split bg-lime-400 text-black p-6 rounded-[2.5rem] shadow-[0_0_30px_rgba(163,230,53,0.2)] print:p-5">
        <h3 className="text-[10px] font-black uppercase mb-3 opacity-70">
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
    <div className="no-split bg-white/5 border border-white/10 p-6 rounded-[2.5rem] print:p-5">
        <h3 className="text-[10px] font-black uppercase mb-3 text-slate-500">
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

Resume.displayName = "Resume";
