import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import Header from "@/components/layout/Header";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://galerie.art'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GALERIE — Plateforme Artistique Haut de Gamme",
    template: "%s | GALERIE",
  },
  description:
    "Espace exclusif d'œuvres authentiques et tirages d'art. Minimalisme cinématique.",
  keywords: ['art contemporain', 'galerie en ligne', 'oeuvres originales', 'tirages fine art', 'achat art'],
  authors: [{ name: 'GALERIE' }],
  creator: 'GALERIE',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteUrl,
    siteName: 'GALERIE',
    title: 'GALERIE — Plateforme Artistique Haut de Gamme',
    description: "Espace exclusif d'œuvres authentiques et tirages d'art.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GALERIE — Plateforme Artistique Haut de Gamme',
    description: "Espace exclusif d'œuvres authentiques et tirages d'art.",
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-sans antialiased text-[#f5f5f5] bg-[#0a0a0a]">
        <Header />
        <main>{children}</main>
        <footer className="mt-20 sm:mt-32 py-16 sm:py-20 border-t border-border/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row justify-between items-start gap-10 sm:gap-12">
            <div className="space-y-6 max-w-sm">
              <Link href="/" className="font-serif text-xl tracking-[0.1em] uppercase">GALERIE</Link>
              <p className="text-muted-foreground text-sm leading-relaxed tracking-wide">
                Une vision artistique contemporaine, mêlant émotion brute et raffinement cinématique.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 text-xs uppercase tracking-widest">
              <div className="flex flex-col gap-4">
                <span className="text-white/50 mb-2">Explore</span>
                <Link href="/galerie" className="hover:text-primary">Galerie</Link>
                <Link href="/collections" className="hover:text-primary">Collections</Link>
                <Link href="/blog" className="hover:text-primary">Journal</Link>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-white/50 mb-2">Contact</span>
                <Link href="/contact" className="hover:text-primary">Inquiry</Link>
                <Link href="/shipping" className="hover:text-primary">Livraison</Link>
                <Link href="/legal" className="hover:text-primary">Légal</Link>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-white/50 mb-2">Social</span>
                <a href="#" className="hover:text-primary">Instagram</a>
                <a href="#" className="hover:text-primary">Vimeo</a>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mt-12 sm:mt-20 pt-8 border-t border-white/5 text-[10px] tracking-widest text-white/30 uppercase flex flex-col sm:flex-row justify-between gap-2">
            <span>© 2024 GALERIE. TOUS DROITS RÉSERVÉS.</span>
            <span>DESIGNED BY ANTIGRAVITY</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
