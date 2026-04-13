import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Header from "@/components/layout/Header";
import CustomCursor from "@/components/ui/CustomCursor";
import RevealObserver from "@/components/ui/RevealObserver";
import { ToastProvider } from "@/components/ui/ToastProvider";
import { ArrowUpRight } from "lucide-react";

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
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
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
  icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
};

const NAV_FOOTER = [
  {
    title: 'Explorer',
    links: [
      { label: 'Galerie',      href: '/galerie' },
      { label: 'Collections',  href: '/collections' },
      { label: 'Journal',      href: '/blog' },
    ],
  },
  {
    title: 'Infos',
    links: [
      { label: 'À propos',         href: '/about' },
      { label: 'Contact',          href: '/contact' },
      { label: 'Livraison',        href: '/shipping' },
    ],
  },
  {
    title: 'Légal',
    links: [
      { label: 'Mentions légales', href: '/legal' },
      { label: 'Confidentialité',  href: '/privacy' },
      { label: 'CGV',              href: '/cgv' },
    ],
  },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <ToastProvider>
        <CustomCursor />
        <RevealObserver />
        <Header />
        <main>{children}</main>

        {/* ── Footer ──────────────────────────────────────────── */}
        <footer className="bg-[hsl(24,12%,9%)] text-[hsl(40,10%,75%)]">

          {/* Corps du footer */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

              {/* Brand */}
              <div className="lg:col-span-2 space-y-5">
                <Link href="/" className="font-serif text-2xl font-light text-[hsl(40,10%,94%)] hover:text-[hsl(28,90%,60%)] transition-colors">
                  GALERIE
                </Link>
                <p className="text-sm text-[hsl(40,10%,52%)] leading-relaxed max-w-xs">
                  Une sélection d'œuvres contemporaines pour les collectionneurs exigeants. Art original et tirages de qualité muséale.
                </p>
                {/* Social */}
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href="#"
                    className="w-9 h-9 rounded-full border border-[hsl(40,10%,22%)] flex items-center justify-center text-[hsl(40,10%,55%)] hover:border-[hsl(28,90%,55%)] hover:text-[hsl(28,90%,60%)] transition-all duration-200"
                    aria-label="Instagram"
                  >
                    {/* Instagram SVG inline */}
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 rounded-full border border-[hsl(40,10%,22%)] flex items-center justify-center text-[hsl(40,10%,55%)] text-[0.6rem] font-bold hover:border-[hsl(28,90%,55%)] hover:text-[hsl(28,90%,60%)] transition-all duration-200"
                    aria-label="Vimeo"
                  >
                    V
                  </a>
                </div>
              </div>

              {/* Colonnes nav */}
              {NAV_FOOTER.map(({ title, links }) => (
                <div key={title} className="space-y-4">
                  <span className="label-category text-[hsl(40,10%,38%)]">{title}</span>
                  <ul className="space-y-2.5">
                    {links.map(({ label, href }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className="text-sm text-[hsl(40,10%,52%)] hover:text-[hsl(40,10%,88%)] transition-colors flex items-center gap-1 group"
                        >
                          {label}
                          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Barre inférieure */}
          <div className="border-t border-[hsl(40,10%,14%)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between gap-3 text-[0.7rem] text-[hsl(40,10%,38%)]">
              <span>© {new Date().getFullYear()} GALERIE. Tous droits réservés.</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Tous les systèmes opérationnels</span>
              </div>
            </div>
          </div>
        </footer>
        </ToastProvider>
      </body>
    </html>
  );
}
