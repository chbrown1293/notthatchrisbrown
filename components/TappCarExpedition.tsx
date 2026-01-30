import { Car, CircleQuestionMark, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Modal from "./Modal";

export const TappCarExpedition = () => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="relative pl-12 group">
            {modalOpen && (
                <Modal
                    isVisible={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title="About TappCar"
                    icon={<Car size={20} className="text-orange-400" />}
                    colorScheme="orange"
                >
                    <p className="text-sm text-slate-300 leading-relaxed">
                        TappCar was a Canadian ride-sharing service founded to
                        take advantage of gaps in the market left by larger
                        competitors at a time when the Alberta ride-sharing
                        legislation was evolving rapidly.
                    </p>
                    <p className="text-sm text-slate-300 mt-4 leading-relaxed">
                        We had an 8 month period between ride-sharing being
                        legalized in Edmonton and the launch of Uber in the
                        city, which we used to rapidly grow our user and driver
                        base. As CTO, I led the development of the mobile and
                        web platforms, built fraud detection systems, and
                        designed real-time dashboards for drivers and operations
                        staff.
                    </p>
                    <p className="text-sm text-slate-300 mt-4 leading-relaxed">
                        As ride-share legislation was passed in other Albertan
                        municipalities, we expanded to Calgary, Red Deer, and
                        Lethbridge, eventually completing over 500,000 trips
                        with a network of 300+ drivers.
                    </p>
                    <p className="text-sm text-slate-300 mt-4 leading-relaxed">
                        One particular challenge was operating at international
                        airports, which required building custom APIs and
                        dashboards to integrate with airport dispatch systems
                        and track pick ups and drop offs in real-time in order
                        to comply with local regulations and service
                        requirements.
                    </p>
                </Modal>
            )}
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white z-10 shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                <Car size={18} />
            </div>
            <div className="absolute left-4 top-8 bottom-[-40px] w-[2px] bg-orange-500/20"></div>

            <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 hover:bg-white/[0.07] transition-all backdrop-blur-md">
                <div className="relative flex flex-col md:flex-row justify-between items-start mb-6">
                    <div>
                        <h3 className="relative text-3xl font-black text-white italic tracking-tight uppercase leading-tight">
                            <Link
                                href="https://hackleandthreads.com"
                                target="_blank"
                                className="hover:underline"
                            >
                                TappCar
                            </Link>
                            <CircleQuestionMark
                                size={24}
                                className="print:hidden absolute top-2 right-2 lg:static lg:inline-block lg:ml-2 lg:align-baseline text-orange-400 cursor-pointer hover:text-orange-500"
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
                        <p className="text-orange-400 font-mono text-[10px] uppercase font-bold tracking-[0.2em] my-2">
                            Chief Technology Officer | Jan 2016 - Jul 2017
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="text-right">
                            <p className="text-[9px] uppercase font-black text-slate-500 tracking-tighter">
                                Trips
                            </p>
                            <p className="text-xl font-black text-white italic leading-none">
                                500k+
                            </p>
                        </div>
                        <div className="text-right border-l border-white/10 pl-4">
                            <p className="text-[9px] uppercase font-black text-slate-500 tracking-tighter">
                                Drivers
                            </p>
                            <p className="text-xl font-black text-white italic leading-none">
                                300+
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest">
                            <Zap size={14} className="text-orange-400" />{" "}
                            Technical Leadership
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Led development across iOS, Android, and Web
                            platforms. Designed fraud detection, pricing models,
                            and real-time dashboards for 300+ drivers.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest">
                            <ShieldCheck
                                size={14}
                                className="text-orange-400"
                            />{" "}
                            Product Strategy
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Prioritized features based on KPI analysis and
                            customer feedback. Built APIs for international
                            airport integrations.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
