import HeroSection from "./components/HeroSection";
import EditorialZoom from "./components/EditorialZoom";
import NavButton from "./components/NavButton";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <div className="relative z-10 flex flex-col bg-[var(--color-cream)]">
        <NavButton />
        <HeroSection />
        <EditorialZoom />
      </div>
      {/* Transparent spacer — matches fullscreen footer */}
      <div className="h-screen" />
      <Footer />
    </>
  );
}
