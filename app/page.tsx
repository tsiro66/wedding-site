import HeroSection from "./components/HeroSection";
import NavButton from "./components/NavButton";

export default function Home() {
  return (
    <div className="flex flex-col">
      <NavButton />
      <HeroSection />
    </div>
  );
}
