import styles from "./Listings.module.css";

const listings = [
    {
        id: 1,
        title: "Modern Villa - DHA Phase 5",
        location: "DHA Phase 5, Lahore",
        price: "PKR 4.5 Crore",
        beds: 5,
        baths: 6,
        area: "1 Kanal",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop",
        tag: "Featured",
    },
    {
        id: 2,
        title: "Luxury Apartment - Gulberg",
        location: "Gulberg III, Lahore",
        price: "PKR 2.8 Crore",
        beds: 3,
        baths: 4,
        area: "2500 sq ft",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
        tag: "New",
    },
    {
        id: 3,
        title: "Commercial Plot - Bahria Town",
        location: "Bahria Town, Lahore",
        price: "PKR 1.2 Crore",
        beds: 0,
        baths: 0,
        area: "10 Marla",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
        tag: "Investment",
    },
];

export default function Listings() {
    return (
        <section id="listings" className={styles.listings}>
            <div className="container">
                <h2 className="section-headline">
                    Featured <span className="gradient-text">Properties</span>
                </h2>
                <div className={styles.listingsGrid}>
                    {listings.map((listing) => (
                        <article key={listing.id} className={styles.listingCard}>
                            <div className={styles.imageWrapper}>
                                <img src={listing.image} alt={listing.title} loading="lazy" />
                                <span className={styles.tag}>{listing.tag}</span>
                            </div>
                            <div className={styles.content}>
                                <h3>{listing.title}</h3>
                                <p className={styles.location}>📍 {listing.location}</p>
                                <div className={styles.features}>
                                    {listing.beds > 0 && <span>🛏️ {listing.beds} Beds</span>}
                                    {listing.baths > 0 && <span>🚿 {listing.baths} Baths</span>}
                                    <span>📐 {listing.area}</span>
                                </div>
                                <p className={styles.price}>{listing.price}</p>
                                <button className={styles.cta}>
                                    <span>View Details</span>
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
