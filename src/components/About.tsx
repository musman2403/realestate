"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./About.module.css";

const stats = [
    { value: 250, label: "Properties Sold", suffix: "+" },
    { value: 15, label: "Years Experience", suffix: "" },
    { value: 98, label: "% Client Satisfaction", suffix: "" },
];

export default function About() {
    const [counts, setCounts] = useState<number[]>([0, 0, 0]);
    const [hasAnimated, setHasAnimated] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    // Animate counters
                    stats.forEach((stat, index) => {
                        let start = 0;
                        const end = stat.value;
                        const duration = 2000;
                        const step = end / (duration / 16);

                        const timer = setInterval(() => {
                            start += step;
                            if (start >= end) {
                                start = end;
                                clearInterval(timer);
                            }
                            setCounts((prev) => {
                                const newCounts = [...prev];
                                newCounts[index] = Math.floor(start);
                                return newCounts;
                            });
                        }, 16);
                    });
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [hasAnimated]);

    return (
        <section id="about" className={styles.about} ref={sectionRef}>
            <div className="container">
                <div className={styles.content}>
                    <h2 className="section-headline">
                        Your Local
                        <br />
                        <span className="gradient-text">Real Estate Experts</span>
                    </h2>
                    <p className={styles.text}>
                        Real Estates & Builders has been helping buyers and investors
                        navigate Lahore&apos;s property market with honesty and proven results.
                        We operate with full transparency — every deal backed by documented
                        verification, competitive pricing, and professional support.
                    </p>
                    <div className={styles.stats}>
                        {stats.map((stat, index) => (
                            <div key={index} className={styles.stat}>
                                <span className={styles.statNumber}>
                                    {counts[index]}{stat.suffix}
                                </span>
                                <span className={styles.statLabel}>{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
