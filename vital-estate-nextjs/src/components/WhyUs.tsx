"use client";

import { useEffect, useState } from "react";
import styles from "./WhyUs.module.css";

const values = [
    {
        icon: "📄",
        title: "Documentation First",
        description:
            "Every transaction starts with verified documents. No surprises, no hidden clauses.",
    },
    {
        icon: "🔍",
        title: "Market Intelligence",
        description:
            "Real-time pricing data and neighborhood insights to help you make informed decisions.",
    },
    {
        icon: "🤝",
        title: "Trusted Network",
        description:
            "500+ successful transactions with verified buyers, sellers, and legal experts.",
    },
    {
        icon: "⚡",
        title: "Fast Closings",
        description:
            "Streamlined process that closes deals 40% faster than traditional agents.",
    },
];

export default function WhyUs() {
    const [visibleCards, setVisibleCards] = useState<number[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Stagger the reveal
                        values.forEach((_, index) => {
                            setTimeout(() => {
                                setVisibleCards((prev) => [...prev, index]);
                            }, 200 + index * 150);
                        });
                    }
                });
            },
            { threshold: 0.2 }
        );

        const section = document.getElementById("why-us");
        if (section) observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <section id="why-us" className={styles.whyUs}>
            {/* SVG Grid Background */}
            <div className={styles.gridContainer}>
                <svg className={styles.gridSvg} viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
                    <defs>
                        <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: "#E8E8E8", stopOpacity: 0.3 }} />
                            <stop offset="50%" style={{ stopColor: "#C0C0C0", stopOpacity: 0.2 }} />
                            <stop offset="100%" style={{ stopColor: "#9CA3AF", stopOpacity: 0.1 }} />
                        </linearGradient>
                    </defs>
                    <g className={styles.gridLines} stroke="url(#gridGradient)" strokeWidth="1" fill="none">
                        <path d="M0,100 L1200,100" />
                        <path d="M0,200 L1200,200" />
                        <path d="M0,300 L1200,300" />
                        <path d="M0,400 L1200,400" />
                        <path d="M0,500 L1200,500" />
                        <path d="M200,0 L200,600" />
                        <path d="M400,0 L400,600" />
                        <path d="M600,0 L600,600" />
                        <path d="M800,0 L800,600" />
                        <path d="M1000,0 L1000,600" />
                    </g>
                </svg>
            </div>
            <div className="container">
                <h2 className="section-headline">
                    Why Choose <span className="gradient-text">Vital Estate?</span>
                </h2>
                <div className={styles.valueGrid}>
                    {values.map((value, index) => (
                        <article
                            key={index}
                            className={`${styles.valueCard} ${visibleCards.includes(index) ? styles.visible : ""}`}
                        >
                            <div className={styles.valueIcon}>{value.icon}</div>
                            <h3>{value.title}</h3>
                            <p>{value.description}</p>
                        </article>
                    ))}
                </div>
                <div className={styles.cta}>
                    <a href="#lead-capture" className="btn btn-primary">
                        Start Your Journey
                    </a>
                </div>
            </div>
        </section>
    );
}
