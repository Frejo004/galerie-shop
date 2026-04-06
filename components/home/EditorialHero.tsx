'use client'

import React from 'react'
import { motion } from 'framer-motion'
import ArtworkCarousel from './ArtworkCarousel'

interface Props {
  artworks: any[]
}

export default function EditorialHero({ artworks }: Props) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-48 pb-20 overflow-hidden bg-[#f0f4f8]">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.8)_0%,_transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,_transparent_70%,_#f0f4f8_100%)]" />
      </div>

      {/* Main Title Background */}
      <div className="relative w-full text-center mb-[-3vw] sm:mb-[-4vw] md:mb-[-5vw] z-0">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="text-[22vw] sm:text-[26vw] md:text-[28vw] font-bold tracking-tighter leading-none text-black/[0.04] select-none"
        >
          GALERIE
        </motion.h1>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
            <span className="text-[10px] tracking-[1.2em] font-black uppercase text-black/40">The Work of Artist</span>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="relative z-10 flex flex-wrap justify-center gap-4 mb-24 animate-in fade-in slide-in-from-top-4 duration-1000">
         {['SHOP', 'EVENTS', 'EXHIBITIONS', 'ABOUT', 'VISIT US'].map((item) => (
           <button 
            key={item}
            className="px-6 py-2 rounded-full border border-black/5 bg-white/40 backdrop-blur-md text-[10px] font-black tracking-widest uppercase hover:bg-black hover:text-white transition-all duration-500 shadow-sm"
           >
             {item}
           </button>
         ))}
      </div>

      {/* Interactive 3D Carousel */}
      <div className="relative z-20 w-full max-w-7xl">
         <ArtworkCarousel artworks={artworks} />
      </div>

    </section>
  )
}
