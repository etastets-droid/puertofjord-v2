import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useLang } from '@/hooks/useLang'
import { supabase } from '@/lib/supabase'
import { format } from 'date-fns'

type Property = { id: string; name: string; slug: string }
type Reservation = {
  id: string; property_id: string; guest_name: string
  check_in: string; check_out: string; guests: number
  total_usd: number; status: string; nights: number
}

export default function OwnerDashboard() {
  const { user, role, signOut, loading } = useAuth()
  const { t } = useLang()
  const navigate = useNavigate()
  const [properties, setProperties] = useState<Property[]>([])
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    if (!loading && (!user || role === 'admin')) {
      if (!user) navigate('/owners/login')
      else if (role === 'admin') navigate('/admin')
    }
  }, [user, role, loading, navigate])

  useEffect(() => {
    if (!user) return
    async function load() {
      const { data: props } = await supabase
        .from('pf_properties')
        .select('id, name, slug')
        .eq('owner_user_id', user!.id)

      setProperties(props ?? [])

      if (props && props.length > 0) {
        const ids = props.map(p => p.id)
        const { data: res } = await supabase
          .from('pf_reservations')
          .select('*')
          .in('property_id', ids)
          .order('check_in', { ascending: true })
        setReservations(res ?? [])
      }
      setFetching(false)
    }
    load()
  }, [user])

  const upcoming = reservations.filter(r =>
    new Date(r.check_in) >= new Date() && r.status !== 'cancelled'
  )

  const totalRevenue = reservations
    .filter(r => r.status === 'confirmed')
    .reduce((s, r) => s + (r.total_usd ?? 0), 0)

  const totalNights = reservations
    .filter(r => r.status === 'confirmed')
    .reduce((s, r) => s + (r.nights ?? 0), 0)

  const statusColor = (s: string) =>
    s === 'confirmed' ? 'text-emerald-400' :
    s === 'pending'   ? 'text-amber-400' : 'text-stone-500'

  const statusLabel = (s: string) =>
    t.owner.status[s as keyof typeof t.owner.status] ?? s

  if (loading || fetching) {
    return (
      <div className="min-h-screen bg-fjord-950 flex items-center justify-center">
        <div className="w-px h-16 bg-gold-500 animate-pulse" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-fjord-950">
      {/* Header */}
      <header className="border-b border-white/5 px-6 lg:px-12 h-18 flex items-center justify-between py-5">
        <Link to="/" className="font-display text-lg font-light tracking-[0.25em] uppercase text-stone-300">
          Puerto Fjord
        </Link>
        <div className="flex items-center gap-8">
          <span className="text-xs text-stone-500">{user?.email}</span>
          <button onClick={signOut} className="text-[0.6rem] tracking-[0.2em] uppercase text-stone-500 hover:text-stone-300 transition-colors">
            {t.owner.logout}
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 lg:px-12 py-16">
        <div className="mb-12">
          <p className="section-tag mb-3">{t.owner.myProperties}</p>
          <h1 className="font-display text-4xl font-light text-stone-100">{t.owner.dashboard}</h1>
        </div>

        {/* Properties */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {properties.map(p => (
            <div key={p.id} className="bg-fjord-900 border border-white/5 p-6">
              <p className="section-tag mb-2">{t.owner.myProperties}</p>
              <h3 className="font-display text-2xl font-light text-stone-100">{p.name}</h3>
            </div>
          ))}
          {properties.length === 0 && (
            <p className="text-sm text-stone-500 col-span-3">—</p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-px bg-white/5 mb-16">
          {[
            { label: t.owner.reservations, val: reservations.filter(r => r.status === 'confirmed').length },
            { label: t.owner.nights, val: totalNights },
            { label: `${t.owner.revenue} (USD)`, val: `$${totalRevenue.toLocaleString()}` },
          ].map(s => (
            <div key={s.label} className="bg-fjord-950 p-8 text-center">
              <p className="font-display text-4xl font-light text-gold-400 mb-2">{s.val}</p>
              <p className="section-tag">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Upcoming reservations */}
        <div>
          <h2 className="font-display text-2xl font-light text-stone-200 mb-6">{t.owner.upcoming}</h2>
          {upcoming.length === 0 ? (
            <p className="text-sm text-stone-500">{t.owner.noReservations}</p>
          ) : (
            <div className="flex flex-col gap-px bg-white/5">
              {upcoming.map(r => {
                const prop = properties.find(p => p.id === r.property_id)
                return (
                  <div key={r.id} className="bg-fjord-900 px-6 py-5 grid grid-cols-4 items-center gap-4">
                    <div>
                      <p className="text-xs text-stone-400 mb-0.5">{prop?.name ?? '—'}</p>
                      <p className="text-sm text-stone-200 font-light">{r.guest_name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-stone-500 mb-0.5">{t.owner.reservations}</p>
                      <p className="text-sm text-stone-300 font-light">
                        {format(new Date(r.check_in), 'MMM d')} – {format(new Date(r.check_out), 'MMM d, yyyy')}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-stone-500 mb-0.5">{t.owner.guests}</p>
                      <p className="text-sm text-stone-300">{r.guests}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs font-medium ${statusColor(r.status)}`}>
                        {statusLabel(r.status)}
                      </p>
                      {r.total_usd && (
                        <p className="text-sm text-gold-400 font-light">${r.total_usd.toLocaleString()}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
