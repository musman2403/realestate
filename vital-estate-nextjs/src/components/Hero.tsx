"use client";

import { useEffect, useState } from "react";
import ParticlesBackground from "./ParticlesBackground";
import styles from "./Hero.module.css";

export default function Hero() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section id="hero" className={styles.hero}>
            <ParticlesBackground id="hero-particles" intensity="high" />
            <div className={`${styles.content} ${isVisible ? styles.visible : ""}`}>
                <div className={styles.brand}>
                    <span className={styles.brandText}>
                        Vital <span className="gradient-text">Estate</span>
                    </span>
                </div>
                <p className={styles.tagline}>Documentation-First Real Estate</p>
                <h1 className={styles.headline}>
                    Sell Faster.
                    <br />
                    <span className="gradient-text">Buy Smarter.</span>
                </h1>
                <p className={styles.subheadline}>
                    Own real value in Lahore with trusted property advisors who put
                    transparency first.
                </p>
                <div className={styles.cta}>
                    <a href="#lead-capture" className="btn btn-primary">
                        Get Free Consultation
                    </a>
                    <a href="#services" className="btn btn-secondary">
                        Our Services
                    </a>
                </div>
                <div className={styles.proof}>
                    <span className={styles.proofIcon}>✓</span>
                    <span>Trusted by 500+ families in Lahore</span>
                </div>
            </div>
            <div className={styles.scrollIndicator}>
                <div className={styles.scrollLine} />
            </div>
        </section>
    );
}
