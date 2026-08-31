import { useState, FormEvent } from 'react'
import { useLang } from '@/hooks/useLang'
import { supabase } from '@/lib/supabase'

export default function Contact() {
  const { t } = useLang()
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '',
    enquiry_type: '', guests: '', season: '', message: '',
  })

  function set(field: string, val: string) {
    setForm(f => ({ ...f, [field]: val }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const { error } = await supabase.from('pf_contact_messages').insert([{
        ...form,
        guests: form.guests ? parseInt(form.guests) : null,
        notify_email: 'gustavo@puertofjord.com',
      }])
      if (error) throw error
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="bg-fjord-900 py-24 lg:py-36">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Info */}
          <div className="reveal">
            <p className="section-tag mb-6">{t.contact.tag}</p>
            <h2 className="display-lg text-stone-50 mb-8 whitespace-pre-line">{t.contact.title}</h2>
            <div className="w-10 h-px bg-gold-500 mb-8" />
            <p className="body-lead mb-16 max-w-sm">{t.contact.body}</p>

            <div className="flex flex-col gap-0 divide-y divide-white/5">
              {Object.values(t.contact.details).map((item) => (
                <div key={item.label} className="py-6">
                  <p className="section-tag mb-2">{item.label}</p>
                  <p className="text-sm text-stone-400 font-light whitespace-pre-line leading-7">{item.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="reveal">
            {status === 'success' ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-px bg-gold-500 mx-auto mb-8" />
                  <p className="font-display text-2xl font-light text-stone-200 mb-3">{t.contact.success}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">{t.contact.firstName}</label>
                    <input className="form-input" value={form.first_name} onChange={e => set('first_name', e.target.value)} required />
                  </div>
                  <div>
                    <label className="form-label">{t.contact.lastName}</label>
                    <input className="form-input" value={form.last_name} onChange={e => set('last_name', e.target.value)} required />
                  </div>
                </div>

                <div>
                  <label className="form-label">{t.contact.email}</label>
                  <input type="email" className="form-input" value={form.email} onChange={e => set('email', e.target.value)} required />
                </div>

                <div>
                  <label className="form-label">{t.contact.enquiryType}</label>
                  <select className="form-input" value={form.enquiry_type} onChange={e => set('enquiry_type', e.target.value)} required>
                    <option value="" disabled>—</option>
                    {t.contact.enquiryOptions.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">{t.contact.guests}</label>
                    <input type="number" min="1" max="41" className="form-input" value={form.guests} onChange={e => set('guests', e.target.value)} />
                  </div>
                  <div>
                    <label className="form-label">{t.contact.season}</label>
                    <select className="form-input" value={form.season} onChange={e => set('season', e.target.value)}>
                      <option value="" disabled>—</option>
                      {t.contact.seasonOptions.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="form-label">{t.contact.message}</label>
                  <textarea className="form-input h-32 resize-none" placeholder={t.contact.messagePlaceholder} value={form.message} onChange={e => set('message', e.target.value)} />
                </div>

                {status === 'error' && (
                  <p className="text-xs text-red-400">{t.contact.error}</p>
                )}

                <button type="submit" disabled={status === 'sending'} className="btn-primary text-center mt-2 disabled:opacity-50">
                  {status === 'sending' ? t.contact.sending : t.contact.send}
                </button>

                <p className="text-[0.6rem] tracking-wide text-stone-600">{t.contact.confidential}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
