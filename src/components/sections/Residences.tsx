import { useLang } from '@/hooks/useLang'
import { HOUSES } from '@/lib/houses'

export default function Residences() {
  const { t } = useLang()

  return (
    <section id="residences" className="bg-fjord-900 py-24 lg:py-36">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-20 reveal">
          <div>
            <p className="section-tag mb-6">{t.residences.tag}</p>
            <h2 className="display-lg text-stone-50 whitespace-pre-line">{t.residences.title}</h2>
          </div>
          <div className="flex items-end">
            <p className="body-lead max-w-sm">{t.residences.subtitle}</p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {HOUSES.map((house) => {
            const info = t.residences.houses[house.id as keyof typeof t.residences.houses]
            return (
              <article
                key={house.id}
                className="group relative bg-fjord-900 overflow-hidden reveal"
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={house.image}
                    alt={info.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-75 group-hover:brightness-60"
                  />
                </div>

                {/* Content */}
                <div className="p-8">
                  <p className="section-tag mb-3">{t.residences.from} USD ${house.rateFrom.toLocaleString()} {t.residences.night}</p>
                  <h3 className="font-display text-2xl font-light text-stone-100 mb-1">{info.name}</h3>
                  <p className="text-xs text-stone-400 mb-4">
                    {house.bedrooms} bd · {house.guests} {t.residences.guests}
                  </p>
                  <p className="text-sm text-stone-400/80 font-light leading-7 mb-6">{info.desc}</p>
                  <a href="#contact" className="text-[0.6rem] tracking-[0.2em] uppercase text-gold-400 hover:text-gold-300 transition-colors border-b border-gold-500/30 pb-0.5">
                    {t.residences.enquire} →
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
