"use client";

import { useEffect, useState } from "react";
import styles from "./Navigation.module.css";

const navItems = [
    { id: "hero", tooltip: "Home" },
    { id: "why-us", tooltip: "Why Us" },
    { id: "services", tooltip: "Services" },
    { id: "listings", tooltip: "Listings" },
    { id: "testimonials", tooltip: "Reviews" },
    { id: "about", tooltip: "About" },
    { id: "lead-capture", tooltip: "Contact" },
];

export default function Navigation() {
    const [activeSection, setActiveSection] = useState("hero");
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 500);

        const handleScroll = () => {
            const sections = navItems.map((item) => document.getElementById(item.id));
            const scrollY = window.scrollY + window.innerHeight / 2;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && scrollY >= section.offsetTop) {
                    setActiveSection(navItems[i].id);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav className={`${styles.iconNav} ${isVisible ? styles.visible : ""}`}>
            <div className={styles.brand}>
                <span className={styles.brandV}>V</span>
                <span className={styles.brandE}>E</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.navItems}>
                {/* Home */}
                <button
                    className={`${styles.navIcon} ${activeSection === "hero" ? styles.active : ""}`}
                    onClick={() => scrollToSection("hero")}
                    aria-label="Home"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    <span className={styles.tooltip}>Home</span>
                </button>

                {/* Star - Why Us */}
                <button
                    className={`${styles.navIcon} ${activeSection === "why-us" ? styles.active : ""}`}
                    onClick={() => scrollToSection("why-us")}
                    aria-label="Why Us"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className={styles.tooltip}>Why Us</span>
                </button>

                {/* Gear - Services */}
                <button
                    className={`${styles.navIcon} ${activeSection === "services" ? styles.active : ""}`}
                    onClick={() => scrollToSection("services")}
                    aria-label="Services"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                    </svg>
                    <span className={styles.tooltip}>Services</span>
                </button>

                {/* Grid - Listings */}
                <button
                    className={`${styles.navIcon} ${activeSection === "listings" ? styles.active : ""}`}
                    onClick={() => scrollToSection("listings")}
                    aria-label="Listings"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                    </svg>
                    <span className={styles.tooltip}>Listings</span>
                </button>

                {/* Chat - Testimonials */}
                <button
                    className={`${styles.navIcon} ${activeSection === "testimonials" ? styles.active : ""}`}
                    onClick={() => scrollToSection("testimonials")}
                    aria-label="Reviews"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
                    </svg>
                    <span className={styles.tooltip}>Reviews</span>
                </button>

                {/* Info - About */}
                <button
                    className={`${styles.navIcon} ${activeSection === "about" ? styles.active : ""}`}
                    onClick={() => scrollToSection("about")}
                    aria-label="About"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                    <span className={styles.tooltip}>About</span>
                </button>

                {/* Mail - Contact */}
                <button
                    className={`${styles.navIcon} ${activeSection === "lead-capture" ? styles.active : ""}`}
                    onClick={() => scrollToSection("lead-capture")}
                    aria-label="Contact"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span className={styles.tooltip}>Contact</span>
                </button>
            </div>
        </nav>
    );
}
