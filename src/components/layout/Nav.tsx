import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLang } from '@/hooks/useLang'
import { useAuth } from '@/hooks/useAuth'

export default function Nav() {
  const { lang, setLang, t } = useLang()
  const { user } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navBg = scrolled || !isHome
    ? 'bg-fjord-950/95 backdrop-blur-md border-b border-white/5'
    : 'bg-transparent'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="font-display text-lg font-light tracking-[0.25em] uppercase text-stone-100">
          Puerto Fjord
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-10">
          <li><a href="#residences" className="nav-link">{t.nav.residences}</a></li>
          <li><a href="#experiences" className="nav-link">{t.nav.experiences}</a></li>
          <li><a href="#location" className="nav-link">{t.nav.location}</a></li>
          <li><a href="#contact" className="nav-link">{t.nav.contact}</a></li>
          <li>
            <Link to={user ? (useAuth as any).role === 'admin' ? '/admin' : '/owners' : '/owners/login'}
              className="nav-link text-gold-400/70 hover:text-gold-400">
              {t.nav.ownerPortal}
            </Link>
          </li>
        </ul>

        {/* Right cluster */}
        <div className="flex items-center gap-6">
          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
            className="text-[0.6rem] tracking-[0.2em] uppercase text-stone-400 hover:text-gold-400 transition-colors"
          >
            {lang === 'en' ? 'ES' : 'EN'}
          </button>

          <a href="#contact" className="hidden lg:inline-block btn-primary py-2.5 px-6">
            {t.nav.enquire}
          </a>

          {/* Mobile burger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`block w-6 h-px bg-stone-300 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-px bg-stone-300 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-stone-300 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-fjord-950/98 backdrop-blur-md border-t border-white/5 px-6 py-8 flex flex-col gap-6">
          <a href="#residences" className="nav-link text-base" onClick={() => setMenuOpen(false)}>{t.nav.residences}</a>
          <a href="#experiences" className="nav-link text-base" onClick={() => setMenuOpen(false)}>{t.nav.experiences}</a>
          <a href="#location" className="nav-link text-base" onClick={() => setMenuOpen(false)}>{t.nav.location}</a>
          <a href="#contact" className="nav-link text-base" onClick={() => setMenuOpen(false)}>{t.nav.contact}</a>
          <Link to="/owners/login" className="nav-link text-base text-gold-400/70" onClick={() => setMenuOpen(false)}>{t.nav.ownerPortal}</Link>
          <a href="#contact" className="btn-primary text-center mt-2" onClick={() => setMenuOpen(false)}>{t.nav.enquire}</a>
        </div>
      )}
    </nav>
  )
}
