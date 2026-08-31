import { useLang } from '@/hooks/useLang'

export default function Hero() {
  const { t } = useLang()

  return (
    <section className="relative h-screen min-h-[700px] flex items-end overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, rgba(10,17,21,0.15) 0%, rgba(10,17,21,0.5) 60%, rgba(10,17,21,0.95) 100%),
            url('https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1800&q=85')
          `,
        }}
      />

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

      {/* Scroll indicator */}
      <div className="absolute bottom-10 right-12 hidden lg:flex flex-col items-center gap-3">
        <div className="w-px h-16 bg-gradient-to-b from-gold-500/60 to-transparent animate-pulse" />
        <span className="text-[0.55rem] tracking-[0.3em] uppercase text-stone-500 [writing-mode:vertical-rl]">Scroll</span>
      </div>

      {/* Coordinates */}
      <div className="absolute bottom-10 left-6 lg:left-12 hidden lg:block">
        <p className="text-[0.6rem] tracking-[0.15em] text-stone-500">-51.591° S · -72.665° W</p>
      </div>
    </section>
  )
}
