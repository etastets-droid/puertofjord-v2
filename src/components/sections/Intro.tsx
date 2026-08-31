import { useLang } from '@/hooks/useLang'

export default function Intro() {
  const { t } = useLang()

  return (
    <section className="bg-fjord-950 py-24 lg:py-36">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image */}
          <div className="relative reveal">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=900&q=80"
                alt="Patagonian fjord"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Accent frame */}
            <div className="absolute -bottom-6 -right-6 w-40 h-40 border border-gold-500/20 pointer-events-none hidden lg:block" />
            {/* Coordinate badge */}
            <div className="absolute top-6 left-6 bg-fjord-950/80 backdrop-blur-sm px-4 py-2">
              <p className="text-[0.6rem] tracking-[0.15em] text-gold-500">-51.591° S · -72.665° W</p>
            </div>
          </div>

          {/* Text */}
          <div className="reveal">
            <p className="section-tag mb-6">{t.intro.tag}</p>
            <h2 className="display-lg text-stone-50 mb-8 whitespace-pre-line">{t.intro.title}</h2>
            <div className="w-10 h-px bg-gold-500 mb-8" />
            <p className="body-lead mb-6">{t.intro.body1}</p>
            <p className="body-lead mb-10">{t.intro.body2}</p>
            <blockquote className="border-l border-gold-500/40 pl-6">
              <p className="font-display text-xl font-light italic text-stone-300 leading-relaxed mb-3">
                {t.intro.quote}
              </p>
              <cite className="section-tag not-italic">{t.intro.quoteAuthor}</cite>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
