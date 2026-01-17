import { SmoothScroll } from "@/components/SmoothScroll";
import { MainNavbar } from "@/components/navbar/MainNavbar";
import { ModalProvider } from "@/context/ModalContext";
import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google"; // Import Space_Grotesk
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AUTONOVA | System Intelligence",
  description: "AI Automation & Systems. Real work, real outcomes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${spaceGrotesk.variable} antialiased`}>
        <ModalProvider>
          <MainNavbar />
          <SmoothScroll>{children}</SmoothScroll>
        </ModalProvider>
      </body>
    </html>
  );
}
