export default function Hero() {
  return (
    <section className="relative bg-linear-to-br from-gray-50 to-gray-100 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contenu texte */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Découvrez des{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600">
                œuvres uniques
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Explorez une collection exceptionnelle de tableaux, dessins originaux 
              et créations sur t-shirts. Chaque pièce est une invitation à voyager 
              dans un univers artistique contemporain.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
                Explorer la galerie
              </button>
              <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Découvrir l&apos;artiste
              </button>
            </div>
          </div>

          {/* Image placeholder */}
          <div className="relative">
            <div className="aspect-square bg-linear-to-br from-purple-200 to-pink-200 rounded-2xl shadow-2xl flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-gray-600 font-medium">Collection 2024</p>
                <p className="text-sm text-gray-500 mt-2">Tableaux & Créations</p>
              </div>
            </div>
            
            {/* Éléments décoratifs */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-purple-300 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-pink-300 rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
