import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import Services from "@/components/Services";
import Listings from "@/components/Listings";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <WhyUs />
        <Services />
        <Listings />
        <Testimonials />
        <About />
        <LeadForm />
        <Footer />
      </main>
    </>
  );
}
