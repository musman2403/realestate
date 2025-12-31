/* ========================================
   VITAL ESTATES - ANIMATION ENGINE
   ======================================== 
   Architecture: ONE init function per animation
   Global controller for pause/resume
   IntersectionObserver only - no scroll listeners
   ======================================== */

// ===== GLOBAL ANIMATION CONTROLLER =====
const AnimationController = {
    isTabActive: true,
    reducedMotion: false,
    particlesInstance: null,
    animationFrameIds: [],

    init() {
        // Check reduced motion preference
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Tab visibility listener
        document.addEventListener('visibilitychange', () => {
            this.isTabActive = !document.hidden;
            if (document.hidden) {
                this.pauseAll();
            } else {
                this.resumeAll();
            }
        });

        // Listen for reduced motion changes
        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
            this.reducedMotion = e.matches;
            if (e.matches) {
                this.pauseAll();
            }
        });
    },

    pauseAll() {
        if (this.particlesInstance) {
            this.particlesInstance.pause();
        }
        document.querySelectorAll('.orbit-ring').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    },

    resumeAll() {
        if (this.reducedMotion) return;
        if (this.particlesInstance) {
            this.particlesInstance.play();
        }
        document.querySelectorAll('.orbit-ring').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
};

// ===== 1. HERO PARTICLE SHOWER (polygon style) =====
async function initHeroParticles() {
    if (AnimationController.reducedMotion) return;

    const isMobile = window.innerWidth <= 768;

    const config = {
        fullScreen: false,
        background: {
            color: { value: "transparent" }
        },
        fpsLimit: isMobile ? 45 : 60,
        particles: {
            number: {
                value: isMobile ? 15 : 30,
                density: {
                    enable: true,
                    area: 1000
                }
            },
            color: {
                value: ["#FFB703", "#E63946", "#2EC4B6"]
            },
            shape: {
                type: "polygon",
                polygon: {
                    sides: 5
                }
            },
            opacity: {
                value: { min: 0.3, max: 0.7 },
                animation: {
                    enable: true,
                    speed: 0.3,
                    minimumValue: 0.1,
                    sync: false
                }
            },
            size: {
                value: { min: 2, max: isMobile ? 4 : 6 },
                animation: {
                    enable: true,
                    speed: 2,
                    minimumValue: 1,
                    sync: false
                }
            },
            move: {
                enable: true,
                speed: { min: 0.3, max: 0.8 },
                direction: "bottom-right",
                random: false,
                straight: false,
                outModes: {
                    default: "out"
                },
                trail: {
                    enable: true,
                    length: 10,
                    fillColor: "#0B0F14"
                }
            },
            wobble: {
                enable: true,
                distance: 5,
                speed: 2
            },
            tilt: {
                enable: true,
                direction: "random",
                value: { min: 0, max: 360 },
                animation: {
                    enable: true,
                    speed: 5
                }
            },
            shadow: {
                enable: true,
                blur: 15,
                color: "#FFB703"
            }
        },
        interactivity: {
            detectsOn: "canvas",
            events: {
                onHover: {
                    enable: !isMobile,
                    mode: "repulse",
                    parallax: {
                        enable: true,
                        force: 20,
                        smooth: 50
                    }
                }
            },
            modes: {
                repulse: {
                    distance: 100,
                    duration: 0.4,
                    speed: 0.5
                }
            }
        },
        detectRetina: !isMobile
    };

    try {
        AnimationController.particlesInstance = await tsParticles.load("hero-particles", config);
    } catch (error) {
        console.warn('Hero particles failed to load:', error);
    }
}

// ===== 2. FALLING METEOR ANIMATION (Canvas-based) =====
function initFallingMeteors() {
    if (AnimationController.reducedMotion) return;

    const canvas = document.getElementById('meteor-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const isMobile = window.innerWidth <= 768;

    // Resize canvas to window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Meteor class
    class Meteor {
        constructor() {
            this.reset();
        }

        reset() {
            // Start from top-left quadrant, random position
            this.x = Math.random() * canvas.width * 0.5;
            this.y = -20 - Math.random() * 100;

            // Speed - slower meteors
            this.speed = 1 + Math.random() * 1.5;

            // Angle - falling diagonally (top-left to bottom-right)
            this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3; // ~45 degrees with variance

            // Tail length
            this.tailLength = 30 + Math.random() * 50;

            // Size of glowing head (smaller for subtlety)
            this.headSize = 1.5 + Math.random() * 2;

            // Color - amber/red/cyan
            const colors = ['#FFB703', '#E63946', '#2EC4B6'];
            this.color = colors[Math.floor(Math.random() * colors.length)];

            // Opacity (low for subtlety)
            this.opacity = 0.15 + Math.random() * 0.2;
        }

        update() {
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;

            // Reset if out of bounds
            if (this.y > canvas.height + 50 || this.x > canvas.width + 50) {
                this.reset();
            }
        }

        draw() {
            // Calculate tail end position
            const tailX = this.x - Math.cos(this.angle) * this.tailLength;
            const tailY = this.y - Math.sin(this.angle) * this.tailLength;

            // Draw tail (gradient from transparent to head color)
            const gradient = ctx.createLinearGradient(tailX, tailY, this.x, this.y);
            gradient.addColorStop(0, 'transparent');
            gradient.addColorStop(0.7, this.color + '40');
            gradient.addColorStop(1, this.color);

            ctx.beginPath();
            ctx.moveTo(tailX, tailY);
            ctx.lineTo(this.x, this.y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.5;
            ctx.globalAlpha = this.opacity;
            ctx.stroke();

            // Draw glowing head
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.headSize, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 8;
            ctx.shadowColor = this.color;
            ctx.fill();

            // Reset shadow
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
        }
    }

    // Create meteors
    const meteorCount = isMobile ? 30 : 60;
    const meteors = [];
    for (let i = 0; i < meteorCount; i++) {
        const meteor = new Meteor();
        // Stagger initial positions
        meteor.y = Math.random() * canvas.height;
        meteor.x = Math.random() * canvas.width;
        meteors.push(meteor);
    }

    // Animation loop
    let animationId;
    function animate() {
        if (!AnimationController.isTabActive) {
            animationId = requestAnimationFrame(animate);
            return;
        }

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw meteors
        meteors.forEach(meteor => {
            meteor.update();
            meteor.draw();
        });

        animationId = requestAnimationFrame(animate);
    }

    animate();

    // Store animation ID for cleanup
    AnimationController.animationFrameIds.push(animationId);
}

// ===== 3. MARKET GRID REVEAL =====
function initMarketGrid() {
    if (AnimationController.reducedMotion) {
        document.querySelectorAll('.market-grid-svg').forEach(svg => {
            svg.classList.add('revealed');
        });
        return;
    }

    const gridObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const svg = entry.target.querySelector('.market-grid-svg');
                if (svg) {
                    svg.classList.add('revealed');
                }

                // Reveal value cards with stagger
                const cards = entry.target.querySelectorAll('.value-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('revealed');
                    }, 200 + (index * 150));
                });
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '-50px'
    });

    const whyUsSection = document.querySelector('.why-us');
    if (whyUsSection) {
        gridObserver.observe(whyUsSection);
    }
}

// ===== 3. SERVICES ORBITING CARDS =====
function initOrbitingServices() {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        initMobileCarousel();
        return;
    }

    // Desktop orbit animation is handled via CSS in styles.css
    // including pause-on-hover and counter-rotation for readability
}

// Mobile carousel with touch inertia
function initMobileCarousel() {
    const carousel = document.querySelector('.services-carousel-mobile');
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const cards = carousel.querySelectorAll('.service-card-mobile');
    const dotsContainer = carousel.querySelector('.carousel-dots');

    if (!track || cards.length === 0) return;

    let currentIndex = 0;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let startTime = 0;

    // Create dots
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.dot');

    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, cards.length - 1));
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    // Touch events
    track.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        startTime = Date.now();
        track.style.transition = 'none';
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        const offset = -currentIndex * 100 + (diff / track.offsetWidth) * 100;
        track.style.transform = `translateX(${offset}%)`;
    }, { passive: true });

    track.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;

        const diff = currentX - startX;
        const timeDiff = Date.now() - startTime;
        const velocity = Math.abs(diff / timeDiff);

        track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';

        // Inertia: if fast swipe, go further
        if (velocity > 0.5) {
            if (diff > 0) {
                goToSlide(currentIndex - 1);
            } else {
                goToSlide(currentIndex + 1);
            }
        } else if (Math.abs(diff) > 50) {
            if (diff > 0) {
                goToSlide(currentIndex - 1);
            } else {
                goToSlide(currentIndex + 1);
            }
        } else {
            goToSlide(currentIndex);
        }

        startX = 0;
        currentX = 0;
    });
}

// ===== 4. LISTINGS DEPTH STACK =====
function initDepthStack() {
    const listingsContainer = document.getElementById('listingsStack');
    if (!listingsContainer) return;

    // Sample listings data (CMS-ready schema with scarcity)
    const listings = [
        {
            title: "10 Marla Plot - DHA Phase 6",
            location: "DHA Phase 6, Lahore",
            price: 35000000,
            type: "Plot",
            scarcity: "Transfer-Ready",
            image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop"
        },
        {
            title: "5 Marla House - Bahria Town",
            location: "Bahria Town, Lahore",
            price: 18500000,
            type: "House",
            scarcity: "Hot Area",
            image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop"
        },
        {
            title: "Commercial Plaza - Model Town",
            location: "Model Town, Lahore",
            price: 95000000,
            type: "Commercial",
            scarcity: null,
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop"
        },
        {
            title: "1 Kanal Plot - Engineers Town",
            location: "Engineers Town, Lahore",
            price: 42000000,
            type: "Plot",
            scarcity: "2 Plots Left",
            image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop"
        },
        {
            title: "10 Marla House - DHA Phase 5",
            location: "DHA Phase 5, Lahore",
            price: 55000000,
            type: "House",
            scarcity: "Verified",
            image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop"
        },
        {
            title: "Shop for Sale - Gulberg III",
            location: "Gulberg III, Lahore",
            price: 28000000,
            type: "Commercial",
            scarcity: "High Demand",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
        }
    ];

    // Render listings
    listings.forEach((listing, index) => {
        const card = document.createElement('div');
        card.className = 'listing-card';
        card.style.transitionDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <div class="listing-image">
                <img src="${listing.image}" alt="${listing.title}" loading="lazy">
                <span class="listing-type-badge">${listing.type}</span>
                ${listing.scarcity ? `<span class="listing-scarcity-badge">${listing.scarcity}</span>` : ''}
            </div>
            <div class="listing-content">
                <h3 class="listing-title">${listing.title}</h3>
                <p class="listing-location">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    ${listing.location}
                </p>
                <p class="listing-price">PKR ${formatPrice(listing.price)}</p>
                <button class="listing-cta" onclick="requestInfo('${listing.title}')">
                    <span>Request Info</span>
                </button>
            </div>
        `;

        listingsContainer.appendChild(card);
    });

    // Intersection observer for reveal animation
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');

                // Animate price counter
                const priceEl = entry.target.querySelector('.listing-price');
                if (priceEl && !priceEl.dataset.animated) {
                    priceEl.dataset.animated = 'true';
                    // Price is already formatted, no counter animation needed
                }
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px'
    });

    document.querySelectorAll('.listing-card').forEach(card => {
        cardObserver.observe(card);
    });

    // Mobile: tap progression
    if (window.innerWidth <= 768) {
        const cards = document.querySelectorAll('.listing-card');
        let currentCardIndex = 0;

        cards.forEach((card, index) => {
            if (index !== 0) {
                card.style.opacity = '0.5';
                card.style.transform = 'scale(0.95)';
            }

            card.addEventListener('click', () => {
                if (index === currentCardIndex && currentCardIndex < cards.length - 1) {
                    // Move to next card
                    card.style.opacity = '0.5';
                    card.style.transform = 'scale(0.9)';
                    currentCardIndex++;
                    cards[currentCardIndex].style.opacity = '1';
                    cards[currentCardIndex].style.transform = 'scale(1)';
                    cards[currentCardIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        });
    }
}

// Format price in PKR
function formatPrice(price) {
    if (price >= 10000000) {
        return (price / 10000000).toFixed(1) + ' Cr';
    } else if (price >= 100000) {
        return (price / 100000).toFixed(1) + ' Lac';
    }
    return price.toLocaleString('en-PK');
}

// Request info action
function requestInfo(propertyTitle) {
    const leadSection = document.getElementById('lead-capture');
    if (leadSection) {
        leadSection.scrollIntoView({ behavior: 'smooth' });
        // Pre-fill message
        const messageField = document.getElementById('message');
        if (messageField) {
            messageField.value = `I'm interested in: ${propertyTitle}`;
            messageField.focus();
        }
    }
}

// ===== 5. TESTIMONIALS TRUST WAVE =====
function initTrustWave() {
    const waveContainer = document.getElementById('testimonialsWave');
    if (!waveContainer) return;

    // Sample testimonials (Pakistani names, specific outcomes with context)
    const testimonials = [
        {
            name: "Ahmed Raza",
            role: "Property Investor",
            quote: "Closed my Engineers Town plot transfer in 6 days. No hidden charges, no delays. Vital Estates handled everything professionally.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            context: { location: "Engineers Town", property: "10 Marla Plot", timeline: "6 days" }
        },
        {
            name: "Fatima Malik",
            role: "First-time Buyer",
            quote: "Bought my first home in DHA Phase 5. The team guided me through every document. Completely transparent process.",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
            context: { location: "DHA Phase 5", property: "10 Marla House", timeline: "14 days" }
        },
        {
            name: "Bilal Hassan",
            role: "Commercial Investor",
            quote: "Sold my Gulberg commercial property at 15% above market rate. Their ROI analysis was spot-on. Highly recommend.",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
            context: { location: "Gulberg III", property: "Commercial Shop", timeline: "21 days" }
        },
        {
            name: "Ayesha Khan",
            role: "Overseas Pakistani",
            quote: "Managing property from abroad seemed impossible until I found Vital Estates. They handled my Bahria Town investment end-to-end.",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
            context: { location: "Bahria Town", property: "5 Marla Plot", timeline: "Remote" }
        },
        {
            name: "Usman Tariq",
            role: "Plot Developer",
            quote: "Purchased 5 plots through Vital Estates over 2 years. Their market insights helped me maximize returns every time.",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
            context: { location: "Multiple Areas", property: "5 Plots", timeline: "2 years" }
        }
    ];

    // Render testimonials
    testimonials.forEach((testimonial, index) => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        if (index === 0) card.classList.add('active');

        card.innerHTML = `
            <div class="testimonial-header">
                <div class="testimonial-avatar">
                    <img src="${testimonial.image}" alt="${testimonial.name}" loading="lazy">
                </div>
                <div class="testimonial-info">
                    <h4>${testimonial.name}</h4>
                    <span>${testimonial.role}</span>
                </div>
            </div>
            <p class="testimonial-quote">${testimonial.quote}</p>
            <div class="testimonial-context">
                <span>📍 ${testimonial.context.location}</span>
                <span>🏠 ${testimonial.context.property}</span>
                <span>⏱ ${testimonial.context.timeline}</span>
            </div>
        `;

        waveContainer.appendChild(card);
    });

    // Wave animation - active card tracking
    const cards = waveContainer.querySelectorAll('.testimonial-card');

    // Scroll-based active state
    waveContainer.addEventListener('scroll', () => {
        const containerCenter = waveContainer.scrollLeft + waveContainer.offsetWidth / 2;

        cards.forEach(card => {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const distance = Math.abs(containerCenter - cardCenter);

            if (distance < card.offsetWidth / 2) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    });

    // Auto-scroll wave animation
    if (!AnimationController.reducedMotion) {
        let scrollDirection = 1;
        let autoScrollInterval;

        const startAutoScroll = () => {
            autoScrollInterval = setInterval(() => {
                if (!AnimationController.isTabActive) return;

                const maxScroll = waveContainer.scrollWidth - waveContainer.offsetWidth;

                if (waveContainer.scrollLeft >= maxScroll - 10) {
                    scrollDirection = -1;
                } else if (waveContainer.scrollLeft <= 10) {
                    scrollDirection = 1;
                }

                waveContainer.scrollLeft += scrollDirection * 1;
            }, 30);
        };

        // Start auto-scroll when section is visible
        const waveObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAutoScroll();
                } else {
                    clearInterval(autoScrollInterval);
                }
            });
        }, { threshold: 0.3 });

        waveObserver.observe(document.querySelector('.testimonials'));

        // Pause on hover/touch
        waveContainer.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
        waveContainer.addEventListener('mouseleave', startAutoScroll);
        waveContainer.addEventListener('touchstart', () => clearInterval(autoScrollInterval), { passive: true });
    }
}

// ===== 6. MICRO-INTERACTIONS =====
function initMicroInteractions() {
    // Magnetic buttons
    document.querySelectorAll('.magnetic').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            if (AnimationController.reducedMotion) return;

            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // Counter animation for stats
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const countEl = entry.target;
                const target = parseInt(countEl.dataset.count);
                const duration = 2000;
                const start = performance.now();

                const animate = (currentTime) => {
                    const elapsed = currentTime - start;
                    const progress = Math.min(elapsed / duration, 1);

                    // Easing
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(eased * target);

                    countEl.textContent = current + (countEl.dataset.count === '98' ? '%' : '+');

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                };

                if (!AnimationController.reducedMotion) {
                    requestAnimationFrame(animate);
                } else {
                    countEl.textContent = target + (countEl.dataset.count === '98' ? '%' : '+');
                }

                statObserver.unobserve(countEl);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(stat => {
        statObserver.observe(stat);
    });
}

// ===== 7. FORM HANDLING =====
function initFormHandling() {
    const form = document.getElementById('leadForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.querySelector('span').textContent;

        // Loading state
        submitBtn.querySelector('span').textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Success state with particle burst
        submitBtn.querySelector('span').textContent = 'Sent Successfully!';
        submitBtn.style.background = 'linear-gradient(135deg, #2EC4B6, #10B981)';

        // Particle burst effect
        if (!AnimationController.reducedMotion) {
            createParticleBurst(submitBtn);
        }

        // Reset form
        setTimeout(() => {
            form.reset();
            submitBtn.querySelector('span').textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    });
}

// Particle burst on submit
function createParticleBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: ${['#FFB703', '#E63946', '#2EC4B6'][Math.floor(Math.random() * 3)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${centerX}px;
            top: ${centerY}px;
        `;

        document.body.appendChild(particle);

        const angle = (Math.PI * 2 / 20) * i;
        const velocity = 100 + Math.random() * 100;
        const endX = Math.cos(angle) * velocity;
        const endY = Math.sin(angle) * velocity;

        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${endX}px, ${endY}px) scale(0)`, opacity: 0 }
        ], {
            duration: 600 + Math.random() * 400,
            easing: 'cubic-bezier(0, 0.5, 0.5, 1)'
        }).onfinish = () => particle.remove();
    }
}

// ===== ICON NAVIGATION =====
function initIconNav() {
    const navIcons = document.querySelectorAll('.nav-icon');
    const sections = document.querySelectorAll('section[id]');

    if (!navIcons.length || !sections.length) return;

    // Smooth scroll on click
    navIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = icon.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // IntersectionObserver for active section tracking
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Trigger when section is in middle-ish of viewport
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;

                // Remove active from all icons
                navIcons.forEach(icon => icon.classList.remove('active'));

                // Add active to matching icon
                const activeIcon = document.querySelector(`.nav-icon[data-section="${sectionId}"]`);
                if (activeIcon) {
                    activeIcon.classList.add('active');
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize global controller first
    AnimationController.init();

    // Initialize navigation
    initIconNav();

    // Initialize animations
    initHeroParticles();      // Polygon shower for hero section
    initFallingMeteors();     // Canvas meteors for whole page (except footer)
    initMarketGrid();
    initOrbitingServices();
    initDepthStack();
    initTrustWave();
    initMicroInteractions();
    initFormHandling();

    console.log('✨ Vital Estates animations initialized');
});

// Handle resize for responsive adjustments
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Reinitialize orbit for breakpoint changes
        if (window.innerWidth <= 768) {
            initMobileCarousel();
        }
    }, 250);
});
