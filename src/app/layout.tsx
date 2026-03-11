import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Elixir — Pure Luxury Juices",
  description: "Cold-pressed, botanical luxury juices crafted at the intersection of nature and refinement.",
  keywords: "luxury juice, cold-pressed, botanical, natural, premium",
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: "Elixir — Pure Luxury Juices",
    description: "Cold-pressed, botanical luxury juices crafted at the intersection of nature and refinement.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
