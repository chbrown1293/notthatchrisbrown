import { Dog, Map, Mountain, MountainSnow, User, Waves } from "lucide-react";

export const Identity = () => (
    <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-md relative overflow-hidden group">
        <Map className="absolute -right-4 -bottom-4 text-white/[0.03] w-32 h-32 rotate-12" />

        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-lime-500 mb-6 flex items-center gap-2">
            <User size={16} /> About Me
        </h3>

        <div className="space-y-4 relative z-10">
            <p className="text-sm text-slate-300 leading-relaxed">
                Based in{" "}
                <span className="text-white font-bold">Golden, BC</span>, I love
                all things related to web/mobile development and data
                visualization. I'm especially interested in projects that
                combine technology + data with outdoor adventure and/or
                environmental stewardship.
            </p>

            <div className="pt-4 border-t border-white/5 space-y-3">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    Non-Tech Interests
                </p>

                <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                            <Waves size={14} />
                        </div>
                        <span>Fly-fishing and tying</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400">
                        <div className="w-8 h-8 rounded-lg bg-slate-500/10 flex items-center justify-center text-slate-300 border border-slate-500/20">
                            <MountainSnow size={14} />
                        </div>
                        <span>Backcountry skiing</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400">
                        <div className="w-8 h-8 rounded-lg bg-lime-500/10 flex items-center justify-center text-slate-300 border border-slate-500/20">
                            <Mountain size={14} />
                        </div>
                        <span>Rock climbing</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400">
                        <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20">
                            <Dog size={14} />
                        </div>
                        <span>My wonderful dog, Brin</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
