import {
    CircleQuestionMark,
    Fish,
    Layers,
    Map as MapIcon,
    Smartphone,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Modal from "./Modal";

export const HackleThreadsExpedition = () => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div className="relative pl-12 group">
            {modalOpen && (
                <Modal
                    isVisible={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title="About Hackle+Threads"
                    icon={<Fish size={20} className="text-lime-400" />}
                    colorScheme="lime"
                >
                    <p className="text-sm text-gray-300">
                        Hackle+Threads is a web platform I built to share and
                        discover fly-tying patterns with a geospatial twist. As
                        an avid fly-fisherman, I wanted to create a tool that
                        helps anglers find patterns tied for specific locations
                        around the world. The platform allows users to upload
                        their own patterns, and find others' patterns based on:
                    </p>
                    <ul className="list-disc text-sm text-gray-300 mt-4 space-y-2 ml-8">
                        <li className="leading-tight">
                            <strong>Location:</strong> Authors can attach
                            polygons to their patterns, indicating where the
                            pattern is effective.
                        </li>
                        <li className="leading-tight">
                            <strong>Species:</strong> Patterns can be tagged
                            with fish species, helping users find patterns for
                            their target fish.
                        </li>
                        <li className="leading-tight">
                            <strong>Materials:</strong> Patterns can include
                            detailed material lists, allowing users to search
                            based on available tying materials.
                        </li>
                        <li className="leading-tight">
                            <strong>Keyword:</strong> Using vector search, users
                            can find patterns based on descriptive keywords in
                            titles and descriptions.
                        </li>
                    </ul>
                    <p className="text-sm text-gray-300 mt-4">
                        The platform is built on Next.js with a PostGIS backend
                        for geospatial queries, and MapLibre for interactive
                        mapping. The map features server-side cluster rendering
                        to efficiently on all devices. I'm continuously working
                        on new features, including mobile apps using React
                        Native + Expo and integrating with my Next.js backend.
                    </p>
                    <p className="text-sm text-gray-300 mt-4">
                        Currently the platform has over 200 patterns shared by
                        50+ active users worldwide. All users have been acquired
                        organically through fly-fishing communities and word of
                        mouth.
                    </p>
                </Modal>
            )}
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-[#3d5a3d] flex items-center justify-center text-lime-400 z-10 shadow-[0_0_15px_rgba(163,230,53,0.3)] border border-lime-500/50">
                <Fish size={18} />
            </div>

            <div className="absolute left-4 top-8 bottom-[-48px] w-[2px] bg-gradient-to-b from-lime-500/50 to-transparent"></div>

            <div className="bg-[#162616] border border-lime-900/40 rounded-[3rem] p-8 hover:border-lime-500/50 transition-all shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/topography.png')]"></div>

                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                        <div>
                            <div className="flex items-center gap-3">
                                <h3 className="text-3xl font-black text-white italic tracking-tight uppercase leading-tight">
                                    <Link
                                        href="https://hackleandthreads.com"
                                        target="_blank"
                                        className="hover:underline"
                                    >
                                        Hackle + Threads
                                    </Link>
                                    <CircleQuestionMark
                                        size={24}
                                        className="print:hidden absolute top-2 right-2 lg:static lg:inline-block lg:ml-2 lg:align-baseline ml-2 text-lime-400 align-baseline cursor-pointer hover:text-lime-500"
                                        onMouseEnter={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            setModalOpen(true);
                                        }}
                                    />
                                </h3>
                            </div>
                            <p className="text-slate-400 font-mono text-[10px] uppercase font-bold tracking-[0.2em] mt-2">
                                Founder | Dec 2024 - Present
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <div className="text-right">
                                <p className="text-[9px] uppercase font-black text-slate-500 tracking-tighter">
                                    Patterns
                                </p>
                                <p className="text-xl font-black text-white italic leading-none">
                                    200+
                                </p>
                            </div>
                            <div className="text-right border-l border-white/10 pl-4">
                                <p className="text-[9px] uppercase font-black text-slate-500 tracking-tighter">
                                    Active Users
                                </p>
                                <p className="text-xl font-black text-white italic leading-none">
                                    50+
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-lime-500 font-black text-[10px] uppercase tracking-widest">
                                <MapIcon size={14} /> Geospatial Discovery
                            </div>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                Engineered a high-performance discovery tool
                                using{" "}
                                <span className="text-white font-bold">
                                    MapLibre
                                </span>{" "}
                                and{" "}
                                <span className="text-white font-bold">
                                    PostGIS
                                </span>
                                . Implemented clustering logic for global
                                pattern sharing and regional fly-tying trends.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-lime-500 font-black text-[10px] uppercase tracking-widest">
                                <Layers size={14} /> UX Architecture
                            </div>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                Designed custom{" "}
                                <span className="text-white font-bold">
                                    step-by-step tying interfaces
                                </span>{" "}
                                and interactive dashboards. Managed full product
                                lifecycle from Figma wireframes to Vercel
                                deployment.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {[
                            "Next.js",
                            "PostGIS",
                            "MapLibre",
                            "Tailwind CSS",
                            "Geospatial Search",
                            "Clustering",
                        ].map((s) => (
                            <span
                                key={s}
                                className="px-3 py-1 rounded-full bg-black/40 text-[9px] font-bold text-slate-400 border border-white/5 uppercase tracking-tighter"
                            >
                                {s}
                            </span>
                        ))}
                    </div>

                    <div className="mt-4 pt-6 border-t border-white/5 flex items-center gap-3">
                        <div className="p-2 bg-orange-500/10 rounded-xl border border-orange-500/20">
                            <Smartphone
                                className="text-orange-400 animate-pulse"
                                size={16}
                            />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest">
                                In Development
                            </p>
                            <p className="text-[11px] text-slate-500">
                                Cross-platform iOS and Android native apps using
                                React Native + Expo.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
