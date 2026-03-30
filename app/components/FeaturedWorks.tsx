export default function FeaturedWorks() {
  const works = [
    {
      id: 1,
      title: "Éclats de rêve",
      category: "Tableau",
      price: "450€",
      image: "/placeholder-art-1.jpg"
    },
    {
      id: 2,
      title: "Métamorphose urbaine",
      category: "T-shirt",
      price: "35€",
      image: "/placeholder-art-2.jpg"
    },
    {
      id: 3,
      title: "Silences colorés",
      category: "Dessin",
      price: "180€",
      image: "/placeholder-art-3.jpg"
    },
    {
      id: 4,
      title: "Vibrations cosmiques",
      category: "Tableau",
      price: "620€",
      image: "/placeholder-art-4.jpg"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Œuvres en vedette
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une sélection de créations qui représentent l'esprit et la diversité 
            de mon travail artistique.
          </p>
        </div>

        {/* Grille d'œuvres */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {works.map((work) => (
            <div key={work.id} className="group cursor-pointer">
              {/* Image container */}
              <div className="aspect-square bg-linear-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden mb-4 relative group-hover:shadow-xl transition-shadow duration-300">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-white rounded-full mx-auto mb-3 flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm">Image bientôt disponible</p>
                  </div>
                </div>
                
                {/* Overlay au survol */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <button className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-6 py-2 rounded-lg font-medium transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    Voir détails
                  </button>
                </div>
              </div>

              {/* Informations */}
              <div>
                <span className="text-sm text-purple-600 font-medium">
                  {work.category}
                </span>
                <h3 className="text-lg font-semibold text-gray-900 mt-1 mb-2">
                  {work.title}
                </h3>
                <p className="text-xl font-bold text-gray-900">
                  {work.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bouton voir tout */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            Voir toute la galerie
          </button>
        </div>
      </div>
    </section>
  );
}
