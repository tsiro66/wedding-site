import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "./components/smooth-scroll";
import { GsapProvider } from "./components/gsap-provider";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "I Am Silk — Bespoke Bridal Couture",
  description: "Handcrafted bridal gowns designed to move with you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <GsapProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </GsapProvider>
      </body>
    </html>
  );
}
