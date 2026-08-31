import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useLang } from '@/hooks/useLang'
import { supabase } from '@/lib/supabase'
import { format } from 'date-fns'

type Reservation = {
  id: string; property_id: string; guest_name: string; guest_email: string
  check_in: string; check_out: string; guests: number
  total_usd: number; status: string; nights: number
  pf_properties?: { name: string }
}
type Message = {
  id: string; first_name: string; last_name: string; email: string
  enquiry_type: string; message: string; read: boolean; created_at: string
}

type Tab = 'reservations' | 'messages'

export default function AdminDashboard() {
  const { user, role, signOut, loading } = useAuth()
  const { t } = useLang()
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('reservations')
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    if (!loading && role !== 'admin') navigate('/owners/login')
  }, [role, loading, navigate])

  useEffect(() => {
    if (role !== 'admin') return
    async function load() {
      const [{ data: res }, { data: msgs }] = await Promise.all([
        supabase.from('pf_reservations').select('*, pf_properties(name)').order('check_in', { ascending: false }),
        supabase.from('pf_contact_messages').select('*').order('created_at', { ascending: false }),
      ])
      setReservations(res ?? [])
      setMessages(msgs ?? [])
      setFetching(false)
    }
    load()
  }, [role])

  async function updateStatus(id: string, status: string) {
    await supabase.from('pf_reservations').update({ status }).eq('id', id)
    setReservations(r => r.map(res => res.id === id ? { ...res, status } : res))
  }

  async function markRead(id: string) {
    await supabase.from('pf_contact_messages').update({ read: true }).eq('id', id)
    setMessages(m => m.map(msg => msg.id === id ? { ...msg, read: true } : msg))
  }

  const statusColor = (s: string) =>
    s === 'confirmed' ? 'text-emerald-400' :
    s === 'pending'   ? 'text-amber-400' : 'text-stone-500'

  const unreadCount = messages.filter(m => !m.read).length

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
      <header className="border-b border-white/5 px-6 lg:px-12 flex items-center justify-between py-5">
        <Link to="/" className="font-display text-lg font-light tracking-[0.25em] uppercase text-stone-300">
          Puerto Fjord
        </Link>
        <div className="flex items-center gap-8">
          <span className="text-xs text-stone-500">{user?.email}</span>
          <button onClick={signOut} className="text-[0.6rem] tracking-[0.2em] uppercase text-stone-500 hover:text-stone-300 transition-colors">
            {t.admin.logout}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 lg:px-12 py-16">
        {/* Title */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="section-tag mb-3">Admin</p>
            <h1 className="font-display text-4xl font-light text-stone-100">{t.admin.dashboard}</h1>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-px bg-white/5 mb-12">
          {[
            { label: 'Confirmed', val: reservations.filter(r => r.status === 'confirmed').length },
            { label: 'Pending', val: reservations.filter(r => r.status === 'pending').length },
            { label: 'Total Revenue', val: `$${reservations.filter(r => r.status === 'confirmed').reduce((s, r) => s + (r.total_usd || 0), 0).toLocaleString()}` },
            { label: 'Unread Enquiries', val: unreadCount },
          ].map(s => (
            <div key={s.label} className="bg-fjord-950 p-6 text-center">
              <p className="font-display text-3xl font-light text-gold-400 mb-1">{s.val}</p>
              <p className="section-tag">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-white/5 mb-10">
          {(['reservations', 'messages'] as Tab[]).map(tb => (
            <button
              key={tb}
              onClick={() => setTab(tb)}
              className={`text-[0.65rem] tracking-[0.2em] uppercase pb-4 border-b-2 transition-colors ${
                tab === tb
                  ? 'border-gold-500 text-gold-400'
                  : 'border-transparent text-stone-500 hover:text-stone-300'
              }`}
            >
              {tb === 'reservations' ? t.admin.allReservations : t.admin.messages}
              {tb === 'messages' && unreadCount > 0 && (
                <span className="ml-2 bg-gold-500 text-fjord-950 text-[0.5rem] px-1.5 py-0.5 rounded-sm font-bold">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Reservations table */}
        {tab === 'reservations' && (
          <div className="flex flex-col gap-px bg-white/5">
            {/* Header row */}
            <div className="bg-fjord-900 px-6 py-3 grid grid-cols-5 gap-4">
              {[t.admin.property, t.admin.guestName, t.admin.dates, t.admin.revenue, t.admin.status].map(h => (
                <p key={h} className="section-tag">{h}</p>
              ))}
            </div>
            {reservations.map(r => (
              <div key={r.id} className="bg-fjord-950 px-6 py-4 grid grid-cols-5 gap-4 items-center hover:bg-fjord-900 transition-colors">
                <p className="text-sm text-stone-300 font-light">{(r.pf_properties as any)?.name ?? '—'}</p>
                <div>
                  <p className="text-sm text-stone-200 font-light">{r.guest_name}</p>
                  <p className="text-xs text-stone-500">{r.guest_email}</p>
                </div>
                <p className="text-sm text-stone-400 font-light">
                  {format(new Date(r.check_in), 'MMM d')} – {format(new Date(r.check_out), 'MMM d, yy')}
                </p>
                <p className="text-sm text-gold-400">{r.total_usd ? `$${r.total_usd.toLocaleString()}` : '—'}</p>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium ${statusColor(r.status)}`}>{r.status}</span>
                  {r.status === 'pending' && (
                    <button
                      onClick={() => updateStatus(r.id, 'confirmed')}
                      className="text-[0.55rem] tracking-[0.1em] uppercase text-emerald-400 border border-emerald-400/30 px-2 py-1 hover:bg-emerald-400/10 transition-colors"
                    >
                      {t.admin.confirm}
                    </button>
                  )}
                  {r.status !== 'cancelled' && (
                    <button
                      onClick={() => updateStatus(r.id, 'cancelled')}
                      className="text-[0.55rem] tracking-[0.1em] uppercase text-stone-500 border border-stone-500/20 px-2 py-1 hover:bg-white/5 transition-colors"
                    >
                      {t.admin.cancel}
                    </button>
                  )}
                </div>
              </div>
            ))}
            {reservations.length === 0 && (
              <div className="bg-fjord-950 px-6 py-12 text-center">
                <p className="text-sm text-stone-500">No reservations yet.</p>
              </div>
            )}
          </div>
        )}

        {/* Messages */}
        {tab === 'messages' && (
          <div className="flex flex-col gap-px bg-white/5">
            {messages.map(m => (
              <div key={m.id} className={`px-6 py-5 transition-colors ${m.read ? 'bg-fjord-950' : 'bg-fjord-900'}`}>
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="text-sm text-stone-200 font-light">{m.first_name} {m.last_name}</p>
                      <p className="text-xs text-stone-500">{m.email}</p>
                      {!m.read && <span className="text-[0.55rem] tracking-[0.1em] uppercase text-gold-400 border border-gold-500/30 px-2 py-0.5">{t.admin.unread}</span>}
                    </div>
                    <p className="section-tag mb-2">{m.enquiry_type}</p>
                    <p className="text-sm text-stone-400 font-light leading-7">{m.message}</p>
                    <p className="text-xs text-stone-600 mt-2">{format(new Date(m.created_at), 'MMM d, yyyy · HH:mm')}</p>
                  </div>
                  {!m.read && (
                    <button
                      onClick={() => markRead(m.id)}
                      className="text-[0.55rem] tracking-[0.1em] uppercase text-stone-500 hover:text-stone-300 shrink-0 mt-1 transition-colors"
                    >
                      {t.admin.markRead}
                    </button>
                  )}
                </div>
              </div>
            ))}
            {messages.length === 0 && (
              <div className="bg-fjord-950 px-6 py-12 text-center">
                <p className="text-sm text-stone-500">No messages yet.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
