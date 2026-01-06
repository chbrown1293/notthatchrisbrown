"use client";
import {
    BarChart3,
    ChevronDown,
    Code2,
    Search,
    Target,
    Trophy,
    Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const ASIExpedition = () => {
    const [expandedRole, setExpandedRole] = useState<string | null>(
        "dev-manager"
    );

    const toggleRole = (role: string) => {
        setExpandedRole(expandedRole === role ? null : role);
    };

    const roles = [
        {
            id: "dev-manager",
            title: "Development Manager",
            period: "Jun 2023 - Present",
            type: "Permanent Full-time",
            sections: [
                {
                    label: "Product & Strategy",
                    icon: <Target size={14} />,
                    bullets: [
                        "Own end-to-end product development for our market research SaaS platform, including roadmap planning and prioritization.",
                        "Translate client needs and business goals into clear product specs, workflows, and feature epics.",
                        "Collaborate with executives, researchers, and data scientists to shape product direction.",
                    ],
                },
                {
                    label: "Technical Leadership",
                    icon: <Code2 size={14} />,
                    bullets: [
                        "Lead a distributed engineering team, driving architecture decisions, code quality, and sprint execution.",
                        "Architect and implement complex Next.js/TypeScript features across the platform.",
                        "Mentor engineers, unblock technical challenges, and refine development processes.",
                    ],
                },
                {
                    label: "Impact",
                    icon: <Trophy size={14} />,
                    bullets: [
                        "Delivered major feature releases that improved platform reliability and client adoption.",
                        "Implemented processes that increased development velocity and strengthened cross-team collaboration.",
                    ],
                },
            ],
        },
        {
            id: "prod-dev-manager",
            title: "Product Development Manager",
            period: "Feb 2020 - Jun 2023",
            type: "Permanent Full-time",
            sections: [
                {
                    label: "Product & Strategy",
                    icon: <BarChart3 size={14} />,
                    bullets: [
                        "Defined product direction for new data sources, annotation workflows, and analytics features.",
                        "Led development of a self-serve research tool used by clients to explore proprietary datasets.",
                    ],
                },
                {
                    label: "Technical Leadership",
                    icon: <Zap size={14} />,
                    bullets: [
                        "Guided system architecture for ingestion pipelines, indexing, and performance improvements.",
                        "Oversaw migration from self-hosted to managed Elasticsearch, improving reliability.",
                    ],
                },
                {
                    label: "Impact",
                    icon: <Trophy size={14} />,
                    bullets: [
                        "Accelerated dataset onboarding and improved data quality through workflow automation.",
                    ],
                },
            ],
        },
        {
            id: "software-engineer",
            title: "Software Engineer",
            period: "Aug 2017 - Feb 2020",
            type: "Permanent Full-time",
            sections: [
                {
                    label: "Technical Contributions",
                    icon: <Code2 size={14} />,
                    bullets: [
                        "Developed ingestion pipelines, annotation systems, and client-facing data visualizations.",
                        "Optimized Elasticsearch clusters, improving access to large-scale datasets.",
                    ],
                },
            ],
        },
    ];

    return (
        <div className="relative pl-12 group">
            {/* Map Pin Icon */}
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white z-10 shadow-[0_0_20px_rgba(79,70,229,0.4)] border border-indigo-400/50">
                <Search size={18} />
            </div>

            {/* Trail Line */}
            <div className="absolute left-4 top-8 bottom-[-40px] w-[2px] bg-gradient-to-b from-indigo-500/50 to-transparent"></div>

            <div className="bg-white/[0.03] border border-white/10 rounded-[3rem] overflow-hidden backdrop-blur-md transition-all hover:bg-white/[0.05]">
                {/* Header Section */}
                <div className="p-8 border-b border-white/5">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div>
                            <h3 className="text-3xl font-black text-white italic tracking-tight uppercase">
                                Advanced Symbolics Inc.
                            </h3>
                            <p className="text-indigo-400 font-mono text-[10px] uppercase font-bold tracking-[0.2em] mt-2">
                                Remote • 8 Years 6 Months
                            </p>
                        </div>
                        <Link href="https://askpolly.ai" target="_blank">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="142"
                                height="60"
                                viewBox="0 0 142 60"
                                fill="none"
                            >
                                <path
                                    d="M1.03854 46.5169C1.03854 45.4888 1.33227 44.6076 1.91973 43.8733C2.50719 43.118 3.31495 42.541 4.34301 42.1424C5.39204 41.7228 6.59843 41.513 7.96218 41.513C8.75944 41.513 9.58818 41.5759 10.4484 41.7018C11.3086 41.8277 12.0744 42.0165 12.7458 42.2683V40.8836C12.7458 39.4988 12.3367 38.3974 11.5184 37.5791C10.7002 36.7609 9.5672 36.3517 8.11953 36.3517C7.23834 36.3517 6.36764 36.5196 5.50744 36.8553C4.66821 37.17 3.78702 37.6421 2.86387 38.2715L2.04562 36.7609C3.11563 36.0265 4.16467 35.481 5.19272 35.1244C6.22078 34.7467 7.26981 34.5579 8.33983 34.5579C10.354 34.5579 11.9485 35.1349 13.1234 36.2888C14.2984 37.4427 14.8858 39.0373 14.8858 41.0724V48.6569C14.8858 48.9507 14.9488 49.1709 15.0746 49.3178C15.2005 49.4437 15.3998 49.5171 15.6726 49.5381V51.2375C15.4418 51.2585 15.2425 51.2795 15.0746 51.3005C14.9068 51.3215 14.7809 51.3215 14.697 51.3005C14.1725 51.2795 13.7738 51.1117 13.5011 50.797C13.2283 50.4822 13.0815 50.1466 13.0605 49.7899L13.029 48.594C12.2947 49.5381 11.3401 50.2724 10.1652 50.797C8.99023 51.3005 7.79433 51.5523 6.57745 51.5523C5.52842 51.5523 4.57379 51.332 3.71358 50.8914C2.87436 50.4298 2.21346 49.8214 1.73091 49.066C1.26933 48.2898 1.03854 47.44 1.03854 46.5169ZM12.0219 47.7757C12.2527 47.482 12.4311 47.1988 12.557 46.926C12.6828 46.6533 12.7458 46.412 12.7458 46.2022V43.8104C12.0324 43.5376 11.2876 43.3278 10.5113 43.181C9.75603 43.0341 8.99023 42.9607 8.21395 42.9607C6.68235 42.9607 5.44449 43.2649 4.50036 43.8733C3.55623 44.4818 3.08416 45.3105 3.08416 46.3595C3.08416 46.968 3.24152 47.5449 3.55623 48.0904C3.87094 48.615 4.33252 49.0556 4.94096 49.4122C5.5494 49.7479 6.26274 49.9158 7.08099 49.9158C8.10904 49.9158 9.06366 49.7164 9.94485 49.3178C10.847 48.9192 11.5394 48.4052 12.0219 47.7757ZM24.8911 51.5523C23.5484 51.5523 22.3 51.332 21.1461 50.8914C19.9922 50.4508 18.9956 49.7794 18.1563 48.8772L19.0375 47.3666C19.9607 48.2268 20.8838 48.8562 21.807 49.2549C22.7511 49.6325 23.7477 49.8214 24.7967 49.8214C26.0766 49.8214 27.1151 49.5696 27.9124 49.066C28.7096 48.5415 29.1083 47.7967 29.1083 46.8316C29.1083 46.1812 28.909 45.6882 28.5103 45.3525C28.1327 44.9958 27.5767 44.7125 26.8424 44.5027C26.129 44.272 25.2688 44.0307 24.2617 43.7789C23.1288 43.4642 22.1741 43.139 21.3979 42.8033C20.6426 42.4466 20.0656 42.006 19.667 41.4815C19.2893 40.936 19.1005 40.2332 19.1005 39.373C19.1005 38.3029 19.3627 37.4218 19.8872 36.7294C20.4327 36.016 21.1671 35.481 22.0902 35.1244C23.0344 34.7467 24.0834 34.5579 25.2373 34.5579C26.4962 34.5579 27.6081 34.7572 28.5733 35.1558C29.5384 35.5545 30.3251 36.1105 30.9336 36.8238L29.895 38.2715C29.3076 37.6001 28.6047 37.107 27.7865 36.7923C26.9892 36.4566 26.0975 36.2888 25.1114 36.2888C24.4401 36.2888 23.8002 36.3832 23.1917 36.572C22.5833 36.7399 22.0797 37.0336 21.6811 37.4532C21.3034 37.8519 21.1146 38.4078 21.1146 39.1212C21.1146 39.7087 21.2615 40.1702 21.5552 40.5059C21.8489 40.8206 22.2895 41.0934 22.877 41.3242C23.4645 41.534 24.1883 41.7648 25.0485 42.0165C26.2864 42.3522 27.3669 42.6984 28.29 43.0551C29.2132 43.3908 29.9265 43.8314 30.4301 44.3769C30.9336 44.9224 31.1854 45.6882 31.1854 46.6742C31.1854 48.2058 30.6084 49.4017 29.4545 50.2619C28.3005 51.1222 26.7794 51.5523 24.8911 51.5523ZM46.4299 51.2375L40.356 42.8348L36.8627 46.1078V51.2375H34.7227V28.2637H36.8627V43.8104L46.1467 34.8726H48.507L41.8036 41.5759L48.7587 51.2375H46.4299ZM59.7822 51.5523C58.4185 51.5523 57.1911 51.1956 56.1001 50.4822C55.0301 49.7689 54.1804 48.8877 53.551 47.8387V57.9409H51.4109V34.8411H53.3307V38.0197C53.9811 36.9917 54.8518 36.1629 55.9428 35.5335C57.0337 34.8831 58.1982 34.5579 59.436 34.5579C60.569 34.5579 61.6075 34.7992 62.5517 35.2817C63.4958 35.7433 64.3141 36.3727 65.0064 37.17C65.6988 37.9673 66.2338 38.8799 66.6114 39.908C67.0101 40.915 67.2094 41.9641 67.2094 43.0551C67.2094 44.5867 66.8947 46.0029 66.2653 47.3037C65.6568 48.5835 64.7966 49.6115 63.6846 50.3878C62.5727 51.1641 61.2719 51.5523 59.7822 51.5523ZM59.1843 49.664C60.0864 49.664 60.8942 49.4857 61.6075 49.129C62.3209 48.7513 62.9293 48.2478 63.4329 47.6184C63.9574 46.989 64.356 46.2861 64.6288 45.5098C64.9015 44.7125 65.0379 43.8943 65.0379 43.0551C65.0379 42.1739 64.8805 41.3347 64.5658 40.5374C64.2721 39.7401 63.842 39.0373 63.2755 38.4288C62.709 37.8204 62.0586 37.3378 61.3243 36.9812C60.59 36.6245 59.7927 36.4462 58.9325 36.4462C58.387 36.4462 57.8205 36.5511 57.2331 36.7609C56.6456 36.9707 56.0791 37.2749 55.5336 37.6735C55.0091 38.0512 54.5685 38.4813 54.2118 38.9638C53.8552 39.4464 53.6349 39.9604 53.551 40.5059V45.5413C53.8866 46.3176 54.3377 47.0204 54.9042 47.6498C55.4707 48.2583 56.1211 48.7513 56.8554 49.129C57.6107 49.4857 58.387 49.664 59.1843 49.664ZM77.821 51.5523C76.6461 51.5523 75.5551 51.332 74.5481 50.8914C73.562 50.4298 72.7017 49.8109 71.9674 49.0346C71.2541 48.2373 70.6981 47.3351 70.2995 46.3281C69.9008 45.3 69.7015 44.2195 69.7015 43.0865C69.7015 41.9116 69.9008 40.8206 70.2995 39.8136C70.6981 38.7855 71.2646 37.8833 71.9989 37.107C72.7332 36.3098 73.5934 35.6908 74.5795 35.2503C75.5866 34.7887 76.6776 34.5579 77.8525 34.5579C79.0274 34.5579 80.1079 34.7887 81.094 35.2503C82.0801 35.6908 82.9403 36.3098 83.6747 37.107C84.409 37.8833 84.9755 38.7855 85.3741 39.8136C85.7727 40.8206 85.972 41.9116 85.972 43.0865C85.972 44.2195 85.7727 45.3 85.3741 46.3281C84.9755 47.3351 84.409 48.2373 83.6747 49.0346C82.9613 49.8109 82.1011 50.4298 81.094 50.8914C80.1079 51.332 79.0169 51.5523 77.821 51.5523ZM71.873 43.118C71.873 44.3349 72.1353 45.4469 72.6598 46.4539C73.2053 47.44 73.9291 48.2268 74.8313 48.8143C75.7335 49.3808 76.73 49.664 77.821 49.664C78.912 49.664 79.9086 49.3703 80.8108 48.7828C81.713 48.1953 82.4368 47.3981 82.9823 46.391C83.5278 45.363 83.8005 44.251 83.8005 43.0551C83.8005 41.8382 83.5278 40.7262 82.9823 39.7191C82.4368 38.7121 81.713 37.9148 80.8108 37.3273C79.9086 36.7399 78.912 36.4462 77.821 36.4462C76.73 36.4462 75.7335 36.7504 74.8313 37.3588C73.9501 37.9673 73.2368 38.775 72.6913 39.7821C72.1458 40.7682 71.873 41.8802 71.873 43.118ZM89.6455 28.2637H91.7856V47.524C91.7856 48.3422 91.9324 48.8772 92.2262 49.129C92.5199 49.3808 92.8766 49.5066 93.2962 49.5066C93.6738 49.5066 94.0515 49.4647 94.4291 49.3808C94.8068 49.2968 95.132 49.2129 95.4047 49.129L95.7824 50.8599C95.3838 51.0277 94.8907 51.1641 94.3033 51.269C93.7368 51.3739 93.2437 51.4264 92.8241 51.4264C91.859 51.4264 91.0827 51.1431 90.4953 50.5767C89.9288 50.0102 89.6455 49.2339 89.6455 48.2478V28.2637ZM98.2202 28.2637H100.36V47.524C100.36 48.3422 100.507 48.8772 100.801 49.129C101.095 49.3808 101.451 49.5066 101.871 49.5066C102.248 49.5066 102.626 49.4647 103.004 49.3808C103.381 49.2968 103.707 49.2129 103.979 49.129L104.357 50.8599C103.958 51.0277 103.465 51.1641 102.878 51.269C102.311 51.3739 101.818 51.4264 101.399 51.4264C100.434 51.4264 99.6574 51.1431 99.0699 50.5767C98.5034 50.0102 98.2202 49.2339 98.2202 48.2478V28.2637ZM107.122 56.2729C107.416 56.2939 107.699 56.3044 107.972 56.3044C108.245 56.3254 108.444 56.3149 108.57 56.2729C108.822 56.231 109.063 56.0841 109.294 55.8323C109.524 55.5806 109.797 55.098 110.112 54.3847C110.427 53.6713 110.867 52.6223 111.434 51.2375L104.29 34.8411H106.556L112.567 49.0346L118.105 34.8411H120.245L111.748 55.9897C111.601 56.3883 111.381 56.7555 111.087 57.0912C110.794 57.4478 110.427 57.7206 109.986 57.9094C109.566 58.1192 109.042 58.2346 108.412 58.2556C108.224 58.2766 108.024 58.2766 107.814 58.2556C107.626 58.2556 107.395 58.2346 107.122 58.1927V56.2729Z"
                                    fill="white"
                                ></path>
                                <circle
                                    cx="121.41"
                                    cy="25.5005"
                                    r="2.82"
                                    fill="#22618E"
                                    className="a1"
                                ></circle>
                                <circle
                                    cx="117.804"
                                    cy="18.2838"
                                    r="2.82"
                                    fill="#01AED5"
                                    className="a2"
                                ></circle>
                                <circle
                                    cx="117.804"
                                    cy="11.0667"
                                    r="2.82"
                                    fill="#CE0257"
                                    className="a3"
                                ></circle>
                                <circle
                                    cx="117.804"
                                    cy="3.84967"
                                    r="2.82"
                                    fill="#FBA100"
                                    className="a4"
                                ></circle>
                                <circle
                                    cx="125.019"
                                    cy="18.2838"
                                    r="2.82"
                                    fill="#01AED5"
                                    className="a3"
                                ></circle>
                                <circle
                                    cx="125.019"
                                    cy="11.0667"
                                    r="2.82"
                                    fill="#CE0257"
                                    className="a4"
                                ></circle>
                                <circle
                                    cx="125.019"
                                    cy="3.84967"
                                    r="2.82"
                                    fill="#FBA100"
                                    className="a5"
                                ></circle>
                                <circle
                                    cx="132.236"
                                    cy="18.2838"
                                    r="2.82"
                                    fill="#01AED5"
                                    className="a3"
                                ></circle>
                                <circle
                                    cx="132.236"
                                    cy="11.0667"
                                    r="2.82"
                                    fill="#CE0257"
                                    className="a5"
                                ></circle>
                                <circle
                                    cx="132.236"
                                    cy="3.84967"
                                    r="2.82"
                                    fill="#FBA100"
                                    className="a6"
                                ></circle>
                                <circle
                                    cx="138.732"
                                    cy="18.2838"
                                    r="2.82"
                                    fill="#01AED5"
                                    className="a5"
                                ></circle>
                                <circle
                                    cx="138.732"
                                    cy="11.0667"
                                    r="2.82"
                                    fill="#CE0257"
                                    className="a6"
                                ></circle>
                                <circle
                                    cx="138.732"
                                    cy="3.84967"
                                    r="2.82"
                                    fill="#FBA100"
                                    className="a7"
                                ></circle>
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Roles List */}
                <div className="divide-y divide-white/5">
                    {roles.map((role) => (
                        <div key={role.id} className="group/role">
                            <button
                                onClick={() => toggleRole(role.id)}
                                className="w-full text-left p-6 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer"
                            >
                                <div>
                                    <h4
                                        className={`font-black uppercase tracking-widest text-sm transition-colors ${
                                            expandedRole === role.id
                                                ? "text-indigo-400"
                                                : "text-slate-200"
                                        }`}
                                    >
                                        {role.title}
                                    </h4>
                                    <p className="text-[10px] font-mono text-slate-500 mt-1 uppercase">
                                        {role.period} • {role.type}
                                    </p>
                                </div>
                                <div
                                    className={`transition-transform duration-300 ${
                                        expandedRole === role.id
                                            ? "rotate-180 text-indigo-400"
                                            : "text-slate-600"
                                    }`}
                                >
                                    <ChevronDown size={20} />
                                </div>
                            </button>

                            {/* Expandable Content Area */}
                            <div
                                className={`grid transition-all duration-300 ease-in-out print:grid-rows-[1fr] print:opacity-100 ${
                                    expandedRole === role.id
                                        ? "grid-rows-[1fr] opacity-100 mt-2"
                                        : "grid-rows-[0fr] opacity-0"
                                }`}
                            >
                                <div className="overflow-hidden print:overflow-visible">
                                    <div className="p-8 pt-0 space-y-6">
                                        {role.sections.map((section, idx) => (
                                            <div
                                                key={idx}
                                                className="space-y-3"
                                            >
                                                <div className="flex items-center gap-2 text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">
                                                    {section.icon}
                                                    {section.label}
                                                </div>
                                                <ul className="space-y-2">
                                                    {section.bullets.map(
                                                        (bullet, bIdx) => (
                                                            <li
                                                                key={bIdx}
                                                                className="text-sm text-slate-400 leading-relaxed flex gap-3"
                                                            >
                                                                <span className="mt-1.5 h-1 w-1 rounded-full bg-indigo-500/50 shrink-0" />
                                                                {bullet}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
