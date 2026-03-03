"use client";
import { Resume } from "@/components/Resume";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";

export default function ResumePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isExporting, setIsExporting] = useState(false);

    const handleExportPdf = async () => {
        setIsExporting(true);
        try {
            const { toCanvas } = await import("html-to-image");
            const { default: jsPDF } = await import("jspdf");

            // Open all accordion sections via React state (multiple can now be open)
            const accordionButtons = Array.from(
                document.querySelectorAll<HTMLButtonElement>("button.w-full.text-left")
            );
            accordionButtons.forEach((btn) => btn.click());
            await new Promise((r) => setTimeout(r, 400)); // wait for CSS animation

            const element = document.getElementById("resume")!;
            const canvas = await toCanvas(element, {
                pixelRatio: 2,
                backgroundColor: "#142114",
                filter: (node) =>
                    !(node instanceof Element &&
                        node.classList.contains("hide-in-export")),
            });

            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "pt",
                format: "letter",
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = pageWidth;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            const imgData = canvas.toDataURL("image/jpeg", 0.92);

            const fillPage = () => {
                pdf.setFillColor("#142114");
                pdf.rect(0, 0, pageWidth, pageHeight, "F");
            };

            fillPage();
            pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
            let heightLeft = imgHeight - pageHeight;
            let position = -pageHeight;

            while (heightLeft > 0) {
                pdf.addPage();
                fillPage();
                pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
                position -= pageHeight;
            }

            pdf.save(
                `Chris_Brown_Resume-${new Date().toISOString().split("T")[0]}.pdf`
            );

            // Close all accordion sections
            accordionButtons.forEach((btn) => btn.click());
        } catch (err) {
            console.error("PDF export failed:", err);
        } finally {
            setIsExporting(false);
        }
    };

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
                <div className="fixed bottom-6 right-6 z-[50]">
                    <button
                        onClick={handleExportPdf}
                        disabled={isExporting}
                        className="flex items-center gap-3 cursor-pointer bg-lime-400 text-black px-8 py-4 rounded-full font-black uppercase tracking-tighter shadow-[0_0_20px_rgba(163,230,53,0.4)] hover:scale-105 active:scale-95 transition-all group disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        <Download size={20} className="group-hover:bounce" />
                        {isExporting ? "Exporting..." : "Export PDF"}
                    </button>
                </div>
            )}

            <Resume />
        </main>
    );
}
