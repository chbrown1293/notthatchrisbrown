import {
    BarChart3,
    Compass,
    Fish,
    Github,
    Linkedin,
    Mail,
    MapPin,
    Mountain,
    Zap,
} from "lucide-react";
import { forwardRef } from "react";
import { ASIExpedition } from "./ASIExpedition";
import { EarlyExpeditions } from "./EarlyExpeditions";
import { EducationBasecamp } from "./EducationBasecamp";
import { HackleThreadsExpedition } from "./HackleThreadsExpedition";
import { Identity } from "./Identity";
import { TappCarExpedition } from "./TappCarExpedition";

export const Resume = forwardRef<HTMLDivElement>((props, ref) => {
    return (
        <div
            ref={ref}
            className="min-h-screen bg-[#142114] text-slate-100 font-sans selection:bg-lime-500 selection:text-black"
        >
            <div className="relative h-64 md:h-80 w-full overflow-hidden">
                <div className="absolute inset-0 bg-[url('/golden.png')] bg-cover bg-top">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#142114]"></div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 -mt-24 relative z-10">
                <header className="relative flex flex-col items-center justify-center pt-12 pb-8">
                    {/* PROFILE PICTURE: Moved to absolute positioning so it doesn't "push" the text */}
                    <div className="md:absolute md:top-0 md:right-0 w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#142114] bg-slate-800 overflow-hidden shadow-2xl z-20 shrink-0">
                        <img
                            src="/profile.jpg"
                            alt="Chris Brown"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* TEXT CONTENT: Now has w-full and text-center to guarantee perfect alignment */}
                    <div className="w-full text-center z-10">
                        <div className="flex items-center justify-center gap-2">
                            <h1 className="text-5xl font-black tracking-tighter uppercase italic drop-shadow-md">
                                Chris Brown
                            </h1>
                        </div>

                        <p className="text-lime-400 font-mono text-sm tracking-widest uppercase font-black mt-2">
                            Technical Product Leader | Engineering Manager |
                            Full-Stack
                        </p>

                        <div className="flex items-center justify-center gap-4 mt-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
                            <span className="flex items-center gap-1">
                                <MapPin size={14} className="text-lime-600" />{" "}
                                Golden, British Columbia, Canada
                            </span>
                            <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] border border-white/10">
                                Open to Work
                            </span>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-20">
                    <div className="md:col-span-8 space-y-6">
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

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-[#1d2e1d] p-6 rounded-[2rem] border border-lime-900/30">
                                <BarChart3 className="text-lime-400 mb-3" />
                                <h3 className="font-bold text-white mb-1">
                                    Data-Driven Strategy
                                </h3>
                                <p className="text-xs text-slate-400">
                                    Scaling platforms like TappCar to 500k+
                                    rides through real-time ops tooling.
                                </p>
                            </div>
                            <div className="bg-[#1d2e1d] p-6 rounded-[2rem] border border-lime-900/30">
                                <Zap className="text-lime-400 mb-3" />
                                <h3 className="font-bold text-white mb-1">
                                    Full-Stack Execution
                                </h3>
                                <p className="text-xs text-slate-400">
                                    Hands-on leadership in Next.js, TypeScript,
                                    and ML-driven datasets.
                                </p>
                            </div>
                        </div>
                        <ASIExpedition />
                        <HackleThreadsExpedition />
                        <TappCarExpedition />
                        <EarlyExpeditions />
                        <EducationBasecamp />
                    </div>

                    <div className="md:col-span-4 space-y-4">
                        <Identity />
                        <div className="bg-lime-400 text-black p-6 rounded-[2.5rem] shadow-[0_0_30px_rgba(163,230,53,0.2)]">
                            <h3 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-70">
                                External and Contact
                            </h3>
                            <div className="space-y-4 font-bold">
                                <a
                                    href="mailto:chris@notthatchrisbrown.ca"
                                    className="flex items-center gap-3 hover:underline"
                                >
                                    <Mail size={18} />{" "}
                                    chris@notthatchrisbrown.ca
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/chris-brown-bc/"
                                    className="flex items-center gap-3 hover:underline"
                                >
                                    <Linkedin size={18} /> LinkedIn
                                </a>
                                <a
                                    href="https://github.com/chbrown1293"
                                    className="flex items-center gap-3 hover:underline"
                                >
                                    <Github size={18} /> GitHub
                                </a>
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
                                    "Data Pipelines",
                                    "Engineering Management",
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

                        <div className="bg-[#0f1a0f] border border-white/5 p-6 rounded-[2.5rem] flex items-center justify-between">
                            <div className="flex gap-4">
                                <Fish className="text-slate-500" size={20} />
                                <Mountain
                                    className="text-slate-500"
                                    size={20}
                                />
                            </div>
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                                BC Interior
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

Resume.displayName = "Resume";
