import { Car, MapPin, ShieldCheck, Trophy, Zap } from "lucide-react";

export const TappCarExpedition = () => (
    <div className="relative pl-12 group">
        <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white z-10 shadow-[0_0_20px_rgba(249,115,22,0.4)]">
            <Car size={18} />
        </div>
        <div className="absolute left-4 top-8 bottom-[-40px] w-[2px] bg-orange-500/20"></div>

        <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 hover:bg-white/[0.07] transition-all backdrop-blur-md">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-3xl font-black text-white italic tracking-tight uppercase">
                        TappCar
                    </h3>
                    <p className="text-orange-400 font-mono text-[10px] uppercase font-bold tracking-[0.2em] mt-2">
                        Chief Technology Officer | Jan 2016 - Jul 2017
                    </p>
                </div>
                <div className="bg-orange-500/20 p-2 rounded-2xl border border-orange-500/30">
                    <Trophy className="text-orange-400" size={24} />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest">
                        <Zap size={14} className="text-orange-400" /> Technical
                        Leadership
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Led development across iOS, Android, and Web platforms.
                        Designed fraud detection, pricing models, and real-time
                        dashboards for 300+ drivers.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest">
                        <ShieldCheck size={14} className="text-orange-400" />{" "}
                        Product Strategy
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Prioritized features based on KPI analysis and customer
                        feedback. Built APIs for international airport
                        integrations.
                    </p>
                </div>
            </div>

            <div className="bg-orange-400 text-black p-4 rounded-2xl flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                    <MapPin size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                        Market Impact:
                    </span>
                </div>
                <span className="text-lg font-black italic tracking-tighter">
                    500,000+ Completed Rides
                </span>
            </div>
        </div>
    </div>
);
