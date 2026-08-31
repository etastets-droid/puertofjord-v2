import { useLang } from '@/hooks/useLang'

export default function Experiences() {
  const { t } = useLang()

  return (
    <section id="experiences" className="bg-fjord-800">
      <div className="grid lg:grid-cols-[1fr_1.3fr]">

        {/* Left */}
        <div className="py-24 lg:py-36 px-6 lg:px-16 flex flex-col justify-center reveal">
          <p className="section-tag mb-6">{t.experiences.tag}</p>
          <h2 className="display-md text-stone-50 mb-8 whitespace-pre-line">{t.experiences.title}</h2>
          <div className="w-10 h-px bg-gold-500 mb-8" />
          <p className="body-lead max-w-sm mb-12">{t.experiences.body}</p>

          <ul className="divide-y divide-white/5">
            {t.experiences.list.map((exp) => (
              <li key={exp.name} className="flex items-center justify-between py-4 gap-4">
                <span className="text-sm text-stone-300 font-light">{exp.name}</span>
                <span className={`text-[0.55rem] tracking-[0.15em] uppercase shrink-0 px-2 py-1 border ${
                  exp.type === 'included'
                    ? 'border-gold-500/40 text-gold-400'
                    : 'border-stone-500/30 text-stone-500'
                }`}>
                  {exp.type === 'included' ? t.experiences.included : t.experiences.tailored}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — full-bleed image */}
        <div className="relative min-h-[500px] lg:min-h-0">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80"
            alt="Patagonian wilderness"
            className="absolute inset-0 w-full h-full object-cover brightness-60"
          />
          {/* Guide card */}
          <div className="absolute bottom-10 left-10 right-10 lg:right-16">
            <div className="bg-fjord-950/80 backdrop-blur-sm p-6 border-l-2 border-gold-500">
              <p className="font-display text-lg italic text-stone-200 leading-relaxed mb-3">
                "His knowledge extends to every wrangler, park ranger, and guide in Patagonia — since memory began."
              </p>
              <p className="section-tag">Patagonia Discovery · Est. 2003</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
