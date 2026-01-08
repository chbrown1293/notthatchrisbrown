"use client";
import FlyCastingGame from "@/components/FlyCastingGame";
import { Resume } from "@/components/Resume";
import { Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

export default function ResumePage() {
    const componentRef = useRef<HTMLDivElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle:
            "Chris_Brown_Resume-" + new Date().toISOString().split("T")[0],
    });

    useEffect(() => {
        const handleModalStateChange = (event: CustomEvent) => {
            setIsModalOpen(event.detail.open);
        };

        window.addEventListener(
            "modalStateChange",
            handleModalStateChange as EventListener
        );

        return () => {
            window.removeEventListener(
                "modalStateChange",
                handleModalStateChange as EventListener
            );
        };
    }, []);

    return (
        <main className="relative">
            {!isModalOpen && (
                <div className="fixed bottom-6 right-6 z-[50] print:hidden">
                    <button
                        onClick={() => handlePrint()}
                        className="flex items-center gap-3 cursor-pointer bg-lime-400 text-black px-8 py-4 rounded-full font-black uppercase tracking-tighter shadow-[0_0_20px_rgba(163,230,53,0.4)] hover:scale-105 active:scale-95 transition-all group"
                    >
                        <Download size={20} className="group-hover:bounce" />
                        Export PDF
                    </button>
                </div>
            )}

            <Resume ref={componentRef} />
            <FlyCastingGame />
        </main>
    );
}
