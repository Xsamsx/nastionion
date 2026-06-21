import { useEffect, useState } from 'react'

type Item = { id: string; label: string; icon: 'home' | 'skills' | 'work' }

const NAV: Item[] = [
  { id: 'top', label: 'Home', icon: 'home' },
  { id: 'skills', label: 'Skills', icon: 'skills' },
  { id: 'work', label: 'Work', icon: 'work' },
]

function Icon({ name }: { name: Item['icon'] }) {
  const common = {
    className: 'w-[22px] h-[22px]',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  if (name === 'home')
    // The arch logo, doubling as the home glyph.
    return (
      <svg {...common}>
        <path d="M4 21 V11 C4 6, 12 3, 12 3 C12 3, 20 6, 20 11 V21" />
      </svg>
    )
  if (name === 'skills')
    return (
      <svg {...common}>
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
      </svg>
    )
  // work / folder
  return (
    <svg {...common}>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  )
}

export function MobileAppBar() {
  const [active, setActive] = useState('top')
  const [hidden, setHidden] = useState(false)

  // Track which section owns the viewport to light up the matching tab.
  useEffect(() => {
    const ids = [...NAV.map((n) => n.id), 'contact']
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: '-20% 0px -45% 0px' }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Hide the bar while scrolling up near the very top (hero owns the screen there).
  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY < 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav
      aria-label="Section navigation"
      className={`md:hidden fixed left-1/2 -translate-x-1/2 z-[90] transition-all duration-500 ${
        hidden ? 'translate-y-24 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
      style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
    >
      <div className="flex items-center gap-1 rounded-full border border-nude/15 bg-black-off/70 backdrop-blur-xl px-2 py-2 shadow-[0_8px_40px_rgba(0,0,0,0.45)]">
        {NAV.map((item) => {
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              aria-label={item.label}
              aria-current={isActive ? 'true' : undefined}
              className={`relative flex items-center gap-2 rounded-full px-3.5 py-2.5 transition-all duration-400 ${
                isActive ? 'bg-nude text-black-off' : 'text-nude/60'
              }`}
            >
              <Icon name={item.icon} />
              {/* Label slides in only for the active tab — keeps the bar compact. */}
              <span
                className={`overflow-hidden whitespace-nowrap font-sans text-xs font-medium tracking-wide transition-all duration-400 ${
                  isActive ? 'max-w-[80px] opacity-100' : 'max-w-0 opacity-0'
                }`}
              >
                {item.label}
              </span>
            </button>
          )
        })}

        {/* Primary contact CTA — always glowing rose-smoke */}
        <button
          onClick={() => go('contact')}
          aria-label="Contact"
          className={`flex items-center justify-center w-11 h-11 rounded-full bg-rose-smoke text-black-off shadow-[0_0_20px_rgba(216,167,177,0.6)] transition-transform duration-300 active:scale-90 ${
            active === 'contact' ? 'ring-2 ring-nude/60' : ''
          }`}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-8.9 8.36L4 21l1.14-3.1A8.5 8.5 0 1 1 21 11.5z" />
          </svg>
        </button>
      </div>
    </nav>
  )
}
