"use client";
import { asiRoles } from "@/components/ASIExpedition";
import { Resume } from "@/components/Resume";
import { Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ResumePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [showExportMenu, setShowExportMenu] = useState(false);
    const exportMenuRef = useRef<HTMLDivElement>(null);

    // ── Fancy (unchanged) ──────────────────────────────────────────────────
    const handleExportFancyPdf = async () => {
        setShowExportMenu(false);
        setIsExporting(true);
        try {
            const { toCanvas } = await import("html-to-image");
            const { default: jsPDF } = await import("jspdf");

            // Scale up all rem-based text for export
            document.documentElement.style.fontSize = "20px";

            // Wait for ASI roles to animate open (isExporting prop forces them expanded)
            await new Promise((r) => setTimeout(r, 400));

            const element = document.getElementById("resume")!;
            const canvas = await toCanvas(element, {
                pixelRatio: 2,
                backgroundColor: "#142114",
                filter: (node) =>
                    !(
                        node instanceof Element &&
                        node.classList.contains("hide-in-export")
                    ),
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
                `Chris_Brown_Resume-${new Date().toISOString().split("T")[0]}.pdf`,
            );

            document.documentElement.style.fontSize = "";
        } catch (err) {
            console.error("PDF export failed:", err);
            document.documentElement.style.fontSize = "";
        } finally {
            setIsExporting(false);
        }
    };

    // ── Boring (traditional text-based) ────────────────────────────────────
    const handleExportBoringPdf = async () => {
        setShowExportMenu(false);
        setIsExporting(true);
        try {
            const { default: jsPDF } = await import("jspdf");

            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "pt",
                format: "letter",
            });
            const pageW = pdf.internal.pageSize.getWidth();
            const pageH = pdf.internal.pageSize.getHeight();
            const margin = 56;
            const contentW = pageW - margin * 2;
            let y = margin;

            const checkBreak = (needed: number) => {
                if (y + needed > pageH - margin) {
                    pdf.addPage();
                    y = margin;
                }
            };

            // Basic text block
            const t = (
                str: string,
                opts: {
                    size?: number;
                    style?: "normal" | "bold" | "italic" | "bolditalic";
                    r?: number;
                    g?: number;
                    b?: number;
                    indent?: number;
                    after?: number;
                } = {},
            ) => {
                const {
                    size = 10,
                    style = "normal",
                    r = 30,
                    g = 30,
                    b = 30,
                    indent = 0,
                    after = 5,
                } = opts;
                pdf.setFontSize(size);
                pdf.setFont("helvetica", style);
                pdf.setTextColor(r, g, b);
                const lines = pdf.splitTextToSize(
                    str,
                    contentW - indent,
                ) as string[];
                const lh = size * 1.35;
                checkBreak(lines.length * lh + after);
                pdf.text(lines, margin + indent, y);
                y += lines.length * lh + after;
            };

            // Two-column row: label left, date right (single line)
            const row = (
                label: string,
                date: string,
                opts: {
                    labelSize?: number;
                    labelStyle?: "normal" | "bold";
                    labelR?: number;
                    labelG?: number;
                    labelB?: number;
                    dateSize?: number;
                    dateR?: number;
                    dateG?: number;
                    dateB?: number;
                    indent?: number;
                    after?: number;
                } = {},
            ) => {
                const {
                    labelSize = 10,
                    labelStyle = "normal",
                    labelR = 30,
                    labelG = 30,
                    labelB = 30,
                    dateSize = 9,
                    dateR = 110,
                    dateG = 110,
                    dateB = 110,
                    indent = 0,
                    after = 5,
                } = opts;
                const lh = labelSize * 1.35;
                checkBreak(lh + after);
                pdf.setFontSize(labelSize);
                pdf.setFont("helvetica", labelStyle);
                pdf.setTextColor(labelR, labelG, labelB);
                pdf.text(label, margin + indent, y);
                pdf.setFontSize(dateSize);
                pdf.setFont("helvetica", "normal");
                pdf.setTextColor(dateR, dateG, dateB);
                pdf.text(date, pageW - margin, y, { align: "right" });
                y += lh + after;
            };

            // Bullet
            const bullet = (str: string, indent = 18) => {
                const size = 9.5;
                const lh = size * 1.35;
                const textX = margin + indent + 8;
                const lines = pdf.splitTextToSize(
                    str,
                    contentW - indent - 8,
                ) as string[];
                checkBreak(lines.length * lh + 3);
                pdf.setFontSize(size);
                pdf.setFont("helvetica", "normal");
                pdf.setTextColor(50, 50, 50);
                pdf.text("\u2022", margin + indent, y);
                pdf.text(lines, textX, y);
                y += lines.length * lh + 3;
            };

            const rule = () => {
                pdf.setDrawColor(180, 180, 180);
                pdf.line(margin, y, pageW - margin, y);
                y += 10;
            };

            const gap = (n: number) => {
                y += n;
            };

            const sectionHead = (label: string) => {
                checkBreak(40);
                t(label, {
                    size: 10,
                    style: "bold",
                    r: 0,
                    g: 0,
                    b: 0,
                    after: 3,
                });
                rule();
                gap(2);
            };

            // ── HEADER ──────────────────────────────────────────────────────
            pdf.setFontSize(22);
            pdf.setFont("helvetica", "bold");
            pdf.setTextColor(0, 0, 0);
            pdf.text("CHRIS BROWN", margin, y);
            y += 28;

            t("Engineering Manager  |  Full-Stack Developer", {
                size: 10,
                r: 70,
                g: 70,
                b: 70,
                after: 4,
            });
            t(
                "Golden, BC, Canada  \u2022  chris@notthatchrisbrown.ca  \u2022  Open to Work",
                {
                    size: 9.5,
                    r: 110,
                    g: 110,
                    b: 110,
                    after: 14,
                },
            );
            rule();
            gap(2);

            // ── SUMMARY ─────────────────────────────────────────────────────
            sectionHead("SUMMARY");
            t(
                "Technical leader with 8+ years building and scaling data-driven SaaS platforms, leading engineering teams, and shaping product strategy. Background spans product development, full-stack engineering, data pipelines, and research analytics, with a unique ability to bridge engineering, product, and business needs.",
                { size: 9.5, r: 50, g: 50, b: 50, after: 16 },
            );

            // ── EXPERIENCE ──────────────────────────────────────────────────
            sectionHead("EXPERIENCE");

            // Advanced Symbolics Inc.
            row("Advanced Symbolics Inc.", "Aug 2017 \u2013 Present", {
                labelSize: 11,
                labelStyle: "bold",
                labelR: 0,
                labelG: 0,
                labelB: 0,
                after: 2,
            });
            t("Ottawa, ON (Remote)", {
                size: 9,
                r: 110,
                g: 110,
                b: 110,
                after: 10,
            });

            for (const role of asiRoles) {
                row(role.title, role.period.replace(" - ", " \u2013 "), {
                    labelSize: 10,
                    labelStyle: "bold",
                    labelR: 20,
                    labelG: 20,
                    labelB: 20,
                    indent: 10,
                    after: 5,
                });
                for (const section of role.sections) {
                    for (const b of section.bullets) {
                        bullet(b);
                    }
                }
                gap(8);
            }
            gap(6);

            // Hackle + Threads
            row("Hackle + Threads", "Dec 2024 \u2013 Present", {
                labelSize: 11,
                labelStyle: "bold",
                labelR: 0,
                labelG: 0,
                labelB: 0,
                after: 2,
            });
            t("Founder  \u2022  hackleandthreads.com", {
                size: 9,
                r: 110,
                g: 110,
                b: 110,
                after: 8,
            });
            bullet(
                "Engineered a high-performance geospatial fly-tying pattern discovery platform using MapLibre and PostGIS, with server-side cluster rendering for global scale.",
            );
            bullet(
                "Designed custom step-by-step tying interfaces and interactive dashboards; managed full product lifecycle from Figma wireframes to Vercel deployment.",
            );
            bullet(
                "Launched iOS and Android apps using React Native + Expo, integrated with Next.js backend APIs for a seamless cross-platform experience.",
            );
            bullet(
                "Stack: Next.js, PostGIS, MapLibre, Tailwind CSS, React Native, Expo",
            );
            gap(14);

            // TappCar
            row("TappCar", "Jan 2016 \u2013 Jul 2017", {
                labelSize: 11,
                labelStyle: "bold",
                labelR: 0,
                labelG: 0,
                labelB: 0,
                after: 2,
            });
            t("Chief Technology Officer", {
                size: 9,
                r: 110,
                g: 110,
                b: 110,
                after: 8,
            });
            bullet(
                "Led cross-platform development (iOS, Android, Web) for a Canadian ride-sharing service, completing 500,000+ trips with a network of 300+ drivers across Alberta.",
            );
            bullet(
                "Designed fraud detection systems, dynamic pricing models, and real-time dashboards for driver and operations teams.",
            );
            bullet(
                "Built custom APIs for international airport dispatch integration to comply with local regulations.",
            );
            bullet(
                "Prioritized features based on KPI analysis and customer feedback.",
            );
            gap(14);

            // ── EARLY CAREER ────────────────────────────────────────────────
            sectionHead("EARLY CAREER");

            row("Alberta Counsel", "2015 \u2013 2016", {
                labelSize: 10,
                labelStyle: "bold",
                labelR: 0,
                labelG: 0,
                labelB: 0,
                after: 2,
            });
            t("Campaign Strategy & I.T. Specialist", {
                size: 9,
                r: 110,
                g: 110,
                b: 110,
                after: 6,
            });
            bullet(
                "Developed digital platforms for engagement, donations, and campaign outreach.",
            );
            bullet(
                "Built campaign analytics tools to improve donor engagement and efficiency.",
            );
            gap(10);

            row("Golden & District Historical Society", "2012 \u2013 2013", {
                labelSize: 10,
                labelStyle: "bold",
                labelR: 0,
                labelG: 0,
                labelB: 0,
                after: 6,
            });
            bullet("Assistant Curator (May \u2013 Sep 2013)");
            bullet("Events Coordinator (May \u2013 Sep 2012)");
            gap(14);

            // ── EDUCATION ───────────────────────────────────────────────────
            sectionHead("EDUCATION");
            row("MacEwan University", "2011 \u2013 2016", {
                labelSize: 11,
                labelStyle: "bold",
                labelR: 0,
                labelG: 0,
                labelB: 0,
                after: 2,
            });
            t("Bachelor of Commerce, Management Major", {
                size: 9.5,
                r: 50,
                g: 50,
                b: 50,
                after: 2,
            });
            t("Edmonton, Alberta", {
                size: 9,
                r: 110,
                g: 110,
                b: 110,
                after: 14,
            });

            // ── SKILLS ──────────────────────────────────────────────────────
            sectionHead("SKILLS");
            t(
                "Next.js, TypeScript, SaaS Architecture, Product Strategy, ML Integration, Team Leadership, System Design, Stakeholder Management, Roadmapping",
                { size: 9.5, r: 50, g: 50, b: 50, after: 0 },
            );

            pdf.save(
                `Chris_Brown_Resume-Traditional-${new Date().toISOString().split("T")[0]}.pdf`,
            );
        } catch (err) {
            console.error("Boring PDF export failed:", err);
        } finally {
            setIsExporting(false);
        }
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (
                exportMenuRef.current &&
                !exportMenuRef.current.contains(e.target as Node)
            ) {
                setShowExportMenu(false);
            }
        };
        if (showExportMenu) {
            document.addEventListener("mousedown", handleOutsideClick);
        }
        return () =>
            document.removeEventListener("mousedown", handleOutsideClick);
    }, [showExportMenu]);

    useEffect(() => {
        const handleModalStateChange = (event: CustomEvent) => {
            setIsModalOpen(event.detail.open);
        };
        window.addEventListener(
            "modalStateChange",
            handleModalStateChange as EventListener,
        );
        return () =>
            window.removeEventListener(
                "modalStateChange",
                handleModalStateChange as EventListener,
            );
    }, []);

    return (
        <main className="relative">
            {!isModalOpen && (
                <div
                    className="fixed bottom-6 right-6 z-[50]"
                    ref={exportMenuRef}
                >
                    {showExportMenu && (
                        <div className="absolute bottom-full right-0 mb-3 bg-white rounded-2xl shadow-2xl overflow-hidden w-52 border border-gray-100">
                            <button
                                onClick={handleExportFancyPdf}
                                className="w-full text-left px-5 py-3.5 hover:bg-lime-50 transition-colors border-b border-gray-100 cursor-pointer"
                            >
                                <p className="text-sm font-black text-lime-600 uppercase tracking-tight">
                                    ✦ Fancy
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    Full design, dark theme
                                </p>
                            </button>
                            <button
                                onClick={handleExportBoringPdf}
                                className="w-full text-left px-5 py-3.5 hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                <p className="text-sm font-black text-gray-700 uppercase tracking-tight">
                                    ☰ Boring
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    Traditional format
                                </p>
                            </button>
                        </div>
                    )}
                    <button
                        onClick={() =>
                            !isExporting && setShowExportMenu((v) => !v)
                        }
                        disabled={isExporting}
                        className="flex items-center gap-3 cursor-pointer bg-lime-400 text-black px-8 py-4 rounded-full font-black uppercase tracking-tighter shadow-[0_0_20px_rgba(163,230,53,0.4)] hover:scale-105 active:scale-95 transition-all group disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        <Download size={20} className="group-hover:bounce" />
                        {isExporting ? "Exporting..." : "Export PDF"}
                    </button>
                </div>
            )}

            <Resume isExporting={isExporting} />
        </main>
    );
}
