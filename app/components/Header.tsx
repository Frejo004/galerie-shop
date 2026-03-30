'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">Galerie d'Art</span>
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900 transition-colors">
              Accueil
            </Link>
            <Link href="/galerie" className="text-gray-700 hover:text-gray-900 transition-colors">
              Galerie
            </Link>
            <Link href="/a-propos" className="text-gray-700 hover:text-gray-900 transition-colors">
              L'Artiste
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-gray-900 transition-colors">
              Contact
            </Link>
            <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
              Panier (0)
            </button>
          </div>

          {/* Bouton Menu Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Mobile */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-gray-900">
                Accueil
              </Link>
              <Link href="/galerie" className="block px-3 py-2 text-gray-700 hover:text-gray-900">
                Galerie
              </Link>
              <Link href="/a-propos" className="block px-3 py-2 text-gray-700 hover:text-gray-900">
                L'Artiste
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-gray-700 hover:text-gray-900">
                Contact
              </Link>
              <button className="w-full text-left px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                Panier (0)
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
