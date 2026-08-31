import { Link } from 'react-router-dom'
import { useLang } from '@/hooks/useLang'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="bg-fjord-950 border-t border-white/5 py-10">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="font-display text-base font-light tracking-[0.25em] uppercase text-stone-400">
          Puerto Fjord
        </Link>
        <p className="text-[0.6rem] tracking-wide text-stone-600 text-center">{t.footer.copy}</p>
        <p className="text-[0.6rem] tracking-wide text-gold-600">{t.footer.coords}</p>
      </div>
    </footer>
  )
}
