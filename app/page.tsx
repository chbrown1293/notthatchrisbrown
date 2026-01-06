"use client";
import { Resume } from "@/components/Resume";
import { Download } from "lucide-react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function ResumePage() {
    const componentRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: "Alex_Fisher_Field_Guide",
    });

    return (
        <main className="relative">
            <div className="fixed bottom-6 right-6 z-50 print:hidden">
                <button
                    onClick={() => handlePrint()}
                    className="flex items-center gap-3 bg-lime-400 text-black px-8 py-4 rounded-full font-black uppercase tracking-tighter shadow-[0_0_20px_rgba(163,230,53,0.4)] hover:scale-105 active:scale-95 transition-all group"
                >
                    <Download size={20} className="group-hover:bounce" />
                    Export Field Guide (PDF)
                </button>
            </div>

            <Resume ref={componentRef} />
        </main>
    );
}
