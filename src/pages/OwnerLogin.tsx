import { useState, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useLang } from '@/hooks/useLang'

export default function OwnerLogin() {
  const { signIn } = useAuth()
  const { t } = useLang()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await signIn(email, password)
    if (error) { setError(error); setLoading(false) }
    else navigate('/owners')
  }

  return (
    <div className="min-h-screen bg-fjord-950 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <Link to="/" className="block text-center font-display text-2xl font-light tracking-[0.25em] uppercase text-stone-300 mb-16">
          Puerto Fjord
        </Link>

        <div className="w-8 h-px bg-gold-500 mx-auto mb-10" />

        <h1 className="font-display text-3xl font-light text-stone-100 text-center mb-10">
          {t.owner.login}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="form-label">{t.owner.email}</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label className="form-label">{t.owner.password}</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary text-center mt-4 disabled:opacity-50"
          >
            {loading ? '...' : t.owner.loginBtn}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link to="/" className="text-[0.6rem] tracking-[0.2em] uppercase text-stone-500 hover:text-stone-300 transition-colors">
            ← puertofjord.com
          </Link>
        </div>
      </div>
    </div>
  )
}
