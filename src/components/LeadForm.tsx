"use client";

import { useState } from "react";
import ParticlesBackground from "./ParticlesBackground";
import styles from "./LeadForm.module.css";

export default function LeadForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        interest: "buy",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("success");
        setTimeout(() => setStatus("idle"), 3000);
        setFormData({ name: "", email: "", phone: "", interest: "buy", message: "" });
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="lead-capture" className={styles.leadCapture}>
            <ParticlesBackground id="contact-particles" intensity="medium" />
            <div className="container">
                <h2 className="section-headline">
                    Ready to Find
                    <br />
                    <span className="gradient-text">Your Next Property?</span>
                </h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <input
                                type="tel"
                                name="phone"
                                required
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <select
                                name="interest"
                                value={formData.interest}
                                onChange={handleChange}
                            >
                                <option value="buy">I want to Buy</option>
                                <option value="sell">I want to Sell</option>
                                <option value="rent">I want to Rent</option>
                                <option value="invest">Investment Advisory</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <textarea
                            name="message"
                            placeholder="Tell us more about your requirements..."
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Get Free Consultation
                    </button>
                    {status === "success" && (
                        <p className={styles.success}>
                            ✓ Thank you! We&apos;ll contact you within 24 hours.
                        </p>
                    )}
                </form>
            </div>
        </section>
    );
}
