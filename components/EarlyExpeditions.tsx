import { Flag } from "lucide-react";

export const EarlyExpeditions = () => (
    <div className="space-y-8 mt-12 border-t border-white/5 pt-12">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-2 ml-4">
            <Flag size={16} /> Early Career
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-4">
            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] relative group hover:bg-white/[0.05] transition-colors">
                <div className="absolute -left-2 top-6 w-1 h-10 bg-slate-700 rounded-full group-hover:bg-lime-500 transition-colors" />
                <h3 className="font-black text-slate-200 uppercase text-sm tracking-tighter">
                    Alberta Counsel
                </h3>
                <p className="text-[10px] font-mono text-slate-500 mb-4">
                    Campaign Strategy & I.T. Specialist • 2015 - 2016
                </p>
                <ul className="text-[11px] text-slate-400 space-y-2">
                    <li>
                        • Developed digital platforms for engagement, donations,
                        and campaign outreach.
                    </li>
                    <li>
                        • Built campaign analytics tools to improve donor
                        engagement and efficiency.
                    </li>
                </ul>
            </div>

            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[2.5rem] relative group hover:bg-white/[0.05] transition-colors">
                <div className="absolute -left-2 top-6 w-1 h-10 bg-slate-700 rounded-full group-hover:bg-lime-500 transition-colors" />
                <h3 className="font-black text-slate-200 uppercase text-sm tracking-tighter">
                    Golden & District Historical Society
                </h3>
                <p className="text-[10px] font-mono text-slate-500 mb-4">
                    Curatorial & Events • 2012 - 2013
                </p>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <p className="text-[9px] font-bold text-lime-600 uppercase mb-1">
                            Assistant Curator
                        </p>
                        <p className="text-[11px] text-slate-500 italic">
                            May - Sep 2013
                        </p>
                    </div>
                    <div className="flex-1 border-l border-white/5 pl-4">
                        <p className="text-[9px] font-bold text-lime-600 uppercase mb-1">
                            Events Coordinator
                        </p>
                        <p className="text-[11px] text-slate-500 italic">
                            May - Sep 2012
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
