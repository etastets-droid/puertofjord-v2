import { useLang } from '@/hooks/useLang'

export default function Location() {
  const { t } = useLang()

  return (
    <section id="location" className="bg-fjord-950 py-24 lg:py-36">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Map SVG */}
          <div className="reveal order-2 lg:order-1">
            <div className="bg-fjord-900 border border-white/5 aspect-square max-w-lg mx-auto">
              <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <rect width="500" height="500" fill="#111b20"/>
                <ellipse cx="250" cy="310" rx="270" ry="130" fill="#1a2d35" opacity="0.9"/>
                <ellipse cx="70" cy="210" rx="110" ry="75" fill="#1a2d35" opacity="0.6"/>
                <path d="M0,0 L500,0 L500,190 Q430,165 385,205 Q345,245 285,225 Q225,205 185,245 Q145,285 105,265 Q65,245 0,265 Z" fill="#1e3028" opacity="0.9"/>
                <path d="M0,400 Q65,360 125,385 Q185,405 225,375 Q265,345 325,365 Q385,385 435,355 L500,345 L500,500 L0,500 Z" fill="#1e3028" opacity="0.7"/>
                <path d="M55,165 L85,105 L115,165 M145,145 L180,82 L215,145 M245,158 L270,108 L295,158" stroke="#2d5240" strokeWidth="1.5" fill="none" opacity="0.7"/>
                {/* Grid */}
                {[100,200,300,400].map(v => (
                  <g key={v}>
                    <line x1="0" y1={v} x2="500" y2={v} stroke="rgba(184,148,106,0.04)" strokeWidth="0.5"/>
                    <line x1={v} y1="0" x2={v} y2="500" stroke="rgba(184,148,106,0.04)" strokeWidth="0.5"/>
                  </g>
                ))}
                {/* Puerto Fjord marker */}
                <circle cx="195" cy="240" r="6" fill="#b8946a"/>
                <circle cx="195" cy="240" r="16" fill="none" stroke="#b8946a" strokeWidth="0.8" opacity="0.5"/>
                <circle cx="195" cy="240" r="28" fill="none" stroke="#b8946a" strokeWidth="0.4" opacity="0.25"/>
                <text x="215" y="234" fontFamily="'Cormorant Garamond', serif" fontSize="12" fill="#b8946a" fontStyle="italic">Puerto Fjord</text>
                <text x="215" y="250" fontFamily="'Jost', sans-serif" fontSize="8" fill="rgba(244,240,232,0.35)" letterSpacing="1">-51.59° S</text>
                {/* Puerto Natales */}
                <circle cx="258" cy="275" r="3.5" fill="#7a9298" opacity="0.7"/>
                <text x="268" y="278" fontFamily="'Jost', sans-serif" fontSize="8.5" fill="rgba(122,146,152,0.65)" letterSpacing="0.5">Puerto Natales</text>
                <line x1="195" y1="240" x2="258" y2="275" stroke="rgba(184,148,106,0.15)" strokeWidth="0.5" strokeDasharray="3,3"/>
                {/* Torres del Paine */}
                <text x="95" y="185" fontFamily="'Jost', sans-serif" fontSize="7.5" fill="rgba(122,146,152,0.4)" letterSpacing="0.5">Torres del Paine →</text>
                {/* Compass */}
                <g transform="translate(445,55)">
                  <circle r="18" fill="none" stroke="rgba(184,148,106,0.2)" strokeWidth="0.5"/>
                  <line x1="0" y1="-13" x2="0" y2="13" stroke="rgba(184,148,106,0.25)" strokeWidth="0.5"/>
                  <line x1="-13" y1="0" x2="13" y2="0" stroke="rgba(184,148,106,0.25)" strokeWidth="0.5"/>
                  <text x="0" y="-20" textAnchor="middle" fontFamily="'Jost', sans-serif" fontSize="8" fill="rgba(184,148,106,0.45)">N</text>
                </g>
              </svg>
            </div>
          </div>

          {/* Text */}
          <div className="reveal order-1 lg:order-2">
            <p className="section-tag mb-6">{t.location.tag}</p>
            <h2 className="display-lg text-stone-50 mb-8 whitespace-pre-line">{t.location.title}</h2>
            <div className="w-10 h-px bg-gold-500 mb-8" />
            <p className="body-lead mb-12">{t.location.body}</p>

            <div className="flex flex-col gap-0 divide-y divide-white/5">
              {t.location.items.map((item) => (
                <div key={item.label} className="flex gap-6 py-7">
                  <div className="font-display text-3xl text-gold-500 font-light w-14 shrink-0 leading-none pt-1">
                    {item.num}
                  </div>
                  <div>
                    <p className="section-tag mb-2">{item.label}</p>
                    <p className="text-sm text-stone-400 font-light leading-7">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
