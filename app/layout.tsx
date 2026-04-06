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
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <footer className="mt-20 sm:mt-32 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20 flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="space-y-5 max-w-xs">
              <Link href="/" className="font-serif text-2xl tracking-[0.08em] text-foreground">GALERIE</Link>
              <div className="divider" />
              <p className="text-muted-foreground text-sm leading-relaxed">
                Une vision artistique contemporaine,<br />mêlant émotion brute et raffinement.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 sm:gap-16">
              <div className="flex flex-col gap-3">
                <span className="label-category mb-1">Explorer</span>
                <Link href="/galerie" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Galerie</Link>
                <Link href="/collections" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Collections</Link>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Journal</Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="label-category mb-1">Contact</span>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Demande</Link>
                <Link href="/shipping" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Livraison</Link>
                <Link href="/legal" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Mentions légales</Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="label-category mb-1">Suivre</span>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Instagram</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Vimeo</a>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 border-t border-border flex flex-col sm:flex-row justify-between gap-2 text-xs text-muted-foreground">
            <span>© 2024 GALERIE. Tous droits réservés.</span>
            <span>Designed by Antigravity</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
