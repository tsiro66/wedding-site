import { Nav } from "./components/nav";
import { Hero } from "./components/hero";
import { Philosophy } from "./components/philosophy";
import { ImageBand } from "./components/image-band";
import { Atelier } from "./components/atelier";
import { Footer } from "./components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Philosophy />
      <ImageBand />
      <Atelier />
      <Footer />
    </>
  );
}
