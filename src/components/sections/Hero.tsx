import { useState, useEffect } from 'react'
import { useLang } from '@/hooks/useLang'

const heroImages = [
  'https://www.puertofjord.com/lovable-uploads/8f96ad03-30fd-406a-b41d-5744095159b4.png',
  'https://www.puertofjord.com/lovable-uploads/d1a96e69-1766-4e4b-8806-c2769640ce1d.png',
  'https://www.puertofjord.com/lovable-uploads/c09c8416-c052-4bd1-88cd-5cbb6ffadbd5.png',
  'https://www.puertofjord.com/lovable-uploads/7d18abe5-d372-4a27-94b7-d2a39f1d5206.png',
  'https://www.puertofjord.com/lovable-uploads/91c5ba44-ef47-4b82-99f2-d833f69dbd76.png',
]

export default function Hero() {
  const { t } = useLang()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(i => (i === heroImages.length - 1 ? 0 : i + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-screen min-h-[700px] flex items-end overflow-hidden">
      {/* Rotating background images */}
      {heroImages.map((img, i) => (
        <div
          key={img}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url('${img}')`,
            opacity: i === current ? 1 : 0,
          }}
        />
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-fjord-950/20 via-fjord-950/40 to-fjord-950/95" />

      {/* Content */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-12 pb-20 lg:pb-28 w-full">
        <div className="max-w-2xl">
          <p className="section-tag mb-8">{t.hero.tag}</p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-[5.5rem] font-light leading-[1.04] text-stone-50 mb-8 whitespace-pre-line">
            {t.hero.title}
          </h1>
          <p className="text-sm md:text-base leading-8 text-stone-300/70 font-light max-w-md mb-12">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#residences" className="btn-primary">{t.hero.cta}</a>
            <a href="#contact" className="btn-ghost">{t.hero.ctaSecondary}</a>
          </div>
        </div>
      </div>

      {/* Image indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current ? 'bg-gold-400 w-6' : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Coordinates */}
      <div className="absolute bottom-10 left-6 lg:left-12 hidden lg:block z-10">
        <p className="text-[0.6rem] tracking-[0.15em] text-stone-500">-51.591° S · -72.665° W</p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 right-12 hidden lg:flex flex-col items-center gap-3 z-10">
        <div className="w-px h-16 bg-gradient-to-b from-gold-500/60 to-transparent animate-pulse" />
        <span className="text-[0.55rem] tracking-[0.3em] uppercase text-stone-500 [writing-mode:vertical-rl]">Scroll</span>
      </div>
    </section>
  )
}
