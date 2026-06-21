import Header from "@/components/Header";
import ScrollReveal from "@/components/ScrollReveal";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Menu from "@/components/Menu";
import Gallery from "@/components/Gallery";
import Ambiance from "@/components/Ambiance";
import Location from "@/components/Location";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <ScrollReveal><Hero /></ScrollReveal>
        <ScrollReveal><About /></ScrollReveal>
        <ScrollReveal><Menu /></ScrollReveal>
        <ScrollReveal><Gallery /></ScrollReveal>
        <ScrollReveal><Ambiance /></ScrollReveal>
        <ScrollReveal><Location /></ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
