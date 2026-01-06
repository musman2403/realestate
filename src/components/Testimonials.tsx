"use client";

import { useState, useEffect } from "react";
import ParticlesBackground from "./ParticlesBackground";
import styles from "./Testimonials.module.css";

const testimonials = [
    {
        name: "Awais Sajid",
        role: "Happy Client",
        quote:
            "Best place to get rented your property and sale your property or wanna purchase. Staff is good, owners are also good. I like the way they deal.",
        stars: 5,
    },
    {
        name: "Nadeem Ahmad",
        role: "Satisfied Customer",
        quote:
            "Perfect place for property sales and purchase. Highly recommended for anyone looking to buy or sell property in Lahore.",
        stars: 5,
    },
    {
        name: "Ahmar Gondal",
        role: "Property Buyer",
        quote:
            "They are nice in their dealings. Professional and straightforward approach to real estate transactions.",
        stars: 5,
    },
    {
        name: "Fazalurrehman",
        role: "Business Client",
        quote:
            "Professional and cooperative attitude. Strongly recommended for guidance about real estate business.",
        stars: 5,
    },
    {
        name: "Mooed Waraich",
        role: "Property Dealer",
        quote:
            "Nice people for property dealing. Good experience working with the Real Estates team.",
        stars: 4,
    },
];

function StarRating({ stars }: { stars: number }) {
    return (
        <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((i) => (
                <span key={i}>{i <= stars ? "⭐" : "☆"}</span>
            ))}
        </div>
    );
}

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const goToNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const goToPrev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    // Auto-advance every 5 seconds
    useEffect(() => {
        const timer = setInterval(goToNext, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="testimonials" className={styles.testimonials}>
            <ParticlesBackground id="testimonials-particles" intensity="medium" />
            <div className="container">
                <h2 className="section-headline">
                    What Our <span className="gradient-text">Clients Say</span>
                </h2>
                <div className={styles.carouselWrapper}>
                    <button className={styles.navBtn} onClick={goToPrev} aria-label="Previous">
                        ←
                    </button>
                    <div className={styles.carouselContainer}>
                        <div
                            className={styles.carouselTrack}
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {testimonials.map((testimonial, index) => (
                                <article key={index} className={styles.testimonialCard}>
                                    <div className={styles.header}>
                                        <div className={styles.avatar}>
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div className={styles.info}>
                                            <h4>{testimonial.name}</h4>
                                            <span>{testimonial.role}</span>
                                        </div>
                                    </div>
                                    <StarRating stars={testimonial.stars} />
                                    <p className={styles.quote}>&quot;{testimonial.quote}&quot;</p>
                                </article>
                            ))}
                        </div>
                    </div>
                    <button className={styles.navBtn} onClick={goToNext} aria-label="Next">
                        →
                    </button>
                </div>
                <div className={styles.dots}>
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ""}`}
                            onClick={() => {
                                setIsAnimating(true);
                                setCurrentIndex(index);
                                setTimeout(() => setIsAnimating(false), 500);
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
