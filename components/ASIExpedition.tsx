import { Search, Users2 } from "lucide-react";

export const ASIExpedition = () => (
    <div className="relative pl-12 group">
        <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white z-10 shadow-[0_0_20px_rgba(99,102,241,0.4)]">
            <Search size={18} />
        </div>
        <div className="absolute left-4 top-8 bottom-[-40px] w-[2px] bg-indigo-500/20"></div>

        <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 hover:bg-white/[0.07] transition-all backdrop-blur-md">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-3xl font-black text-white italic tracking-tight underline decoration-indigo-500/30 decoration-4 underline-offset-4">
                        Advanced Symbolics Inc.
                    </h3>
                    <p className="text-indigo-400 font-mono text-[10px] uppercase font-bold tracking-[0.2em] mt-2">
                        AskPolly SaaS Platform • 8.5 Years
                    </p>
                </div>
                <div className="hidden md:block">
                    <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/30 uppercase font-black tracking-widest italic">
                        AI Market Research Zone
                    </span>
                </div>
            </div>

            <div className="space-y-8">
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="font-black text-white uppercase text-xs tracking-[0.1em] flex items-center gap-2">
                            <Users2 size={14} className="text-indigo-400" />{" "}
                            Development Manager
                        </h4>
                        <span className="text-[10px] font-mono text-slate-500 bg-black/30 px-2 py-0.5 rounded">
                            2023 - PRESENT
                        </span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        Leading a distributed engineering team to architect and
                        deliver complex Next.js/TypeScript features. Bridging
                        engineering and data science to integrate ML-driven
                        datasets and improve pipeline efficiency.
                    </p>
                </div>

                <div className="opacity-80 border-l-2 border-white/5 pl-6">
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-slate-200 uppercase text-[11px] tracking-wider">
                            Product Development Manager
                        </h4>
                        <span className="text-[10px] font-mono text-slate-600">
                            2020 - 2023
                        </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                        Managed system architecture for ingestion pipelines and
                        overseen migration to managed Elasticsearch, reducing
                        operational overhead and scaling research capabilities.
                    </p>
                </div>

                <div className="opacity-50 border-l-2 border-white/5 pl-6">
                    <div className="flex justify-between items-center mb-1">
                        <h4 className="font-bold text-slate-400 uppercase text-[11px]">
                            Software Engineer
                        </h4>
                        <span className="text-[10px] font-mono text-slate-700">
                            2017 - 2020
                        </span>
                    </div>
                    <p className="text-xs text-slate-600 italic">
                        Developed ingestion pipelines and D3.js visualizations
                        for early prototypes.
                    </p>
                </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
                {[
                    "Next.js",
                    "Elasticsearch",
                    "Prisma",
                    "ML Integration",
                    "D3.js",
                    "Roadmapping",
                ].map((s) => (
                    <span
                        key={s}
                        className="px-2 py-1 rounded bg-indigo-500/10 text-[9px] font-bold text-indigo-300 border border-indigo-500/20 uppercase tracking-tighter italic"
                    >
                        {s}
                    </span>
                ))}
            </div>
        </div>
    </div>
);
