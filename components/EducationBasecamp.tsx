import { GraduationCap } from "lucide-react";

export const EducationBasecamp = () => (
    <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-md">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-lime-500 mb-6 flex items-center gap-2">
            <GraduationCap size={16} /> Education
        </h3>
        <div className="relative pl-4 border-l-2 border-slate-800">
            <h4 className="text-sm font-black text-white uppercase tracking-tighter italic">
                MacEwan University
            </h4>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                Bachelor of Commerce, Management Major • 2011 - 2016
            </span>
            <p className="text-xs text-slate-400 mt-1 italic">
                Edmonton, Alberta
            </p>
        </div>
    </div>
);
