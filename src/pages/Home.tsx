import { useEffect } from 'react'
import Hero from '@/components/sections/Hero'
import Intro from '@/components/sections/Intro'
import Residences from '@/components/sections/Residences'
import Experiences from '@/components/sections/Experiences'
import Location from '@/components/sections/Location'
import Contact from '@/components/sections/Contact'

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          observer.unobserve(e.target)
        }
      }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Hero />
      <Intro />
      <Residences />
      <Experiences />
      <Location />
      <Contact />
    </>
  )
}
