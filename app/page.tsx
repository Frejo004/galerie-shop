import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedWorks from './components/FeaturedWorks';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <FeaturedWorks />
        
        {/* Section À propos */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  L'Artiste
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Passionné par les couleurs et les émotions, je crée des œuvres 
                  qui capturent l'essence du monde contemporain. Mon travail explore 
                  les frontières entre l'art traditionnel et les nouvelles formes 
                  d'expression, notamment à travers le design textile.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Chaque pièce est unique, qu'il s'agisse d'un tableau original, 
                  d'un dessin minutieux ou d'une création spécialement conçue 
                  pour les t-shirts. Mon objectif est de rendre l'art accessible 
                  tout en préservant son authenticité.
                </p>
                <button className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
                  En savoir plus
                </button>
              </div>
              <div className="aspect-square bg-linear-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 font-medium">Portrait de l'artiste</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
