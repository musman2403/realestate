"use client";

import { useState, useEffect } from "react";
import ParticlesBackground from "./ParticlesBackground";
import styles from "./Services.module.css";

const services = [
    {
        id: 1,
        title: "Buy Property",
        description: "Find your dream home with verified listings and transparent pricing.",
        icon: "🏠",
    },
    {
        id: 2,
        title: "Sell Property",
        description: "Get the best value for your property with our market expertise.",
        icon: "💰",
    },
    {
        id: 3,
        title: "Rent Property",
        description: "Quality rentals for tenants and reliable tenants for landlords.",
        icon: "🔑",
    },
    {
        id: 4,
        title: "Property Management",
        description: "End-to-end management for investors and overseas Pakistanis.",
        icon: "📋",
    },
    {
        id: 5,
        title: "Legal Documentation",
        description: "Complete documentation support for hassle-free transactions.",
        icon: "📄",
    },
    {
        id: 6,
        title: "Investment Advisory",
        description: "Data-driven insights for smart property investments.",
        icon: "📊",
    },
];

export default function Services() {
    const [isPaused, setIsPaused] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.2 }
        );

        const section = document.getElementById("services");
        if (section) observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <section id="services" className={styles.services}>
            <ParticlesBackground id="services-particles" />
            <div className="container">
                <h2 className="section-headline">
                    <span className="gradient-text">Our Services</span>
                </h2>
                <div
                    className={styles.orbitContainer}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className={styles.orbitCore}>
                        <div className={styles.coreInner}>
                            Vital<br />Estate
                        </div>
                        <div className={styles.corePulse}></div>
                    </div>
                    <div className={`${styles.orbitRing} ${isPaused ? styles.paused : ""}`}>
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                className={`${styles.orbitCard} ${isVisible ? styles.visible : ""}`}
                                style={{
                                    "--angle": `${index * 60}deg`,
                                    "--delay": `${index * 0.1}s`,
                                } as React.CSSProperties}
                            >
                                <div className={styles.cardIcon}>{service.icon}</div>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
