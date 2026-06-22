import { lazy, Suspense, useEffect, useState } from 'react'
import { CustomCursor } from './components/CustomCursor'
import { Preloader } from './components/Preloader'

// The Three.js scenes are decorative and pull in ~125KB gzip of WebGL engine.
// Lazy-load them so they never block first paint, and only mount once the
// browser is idle (see useDeferredMount) so the chunk downloads after the page
// is interactive.
const ThreeBackground = lazy(() =>
  import('./components/ThreeBackground').then((m) => ({ default: m.ThreeBackground }))
)
const ContactThreeBackground = lazy(() =>
  import('./components/ContactThreeBackground').then((m) => ({ default: m.ContactThreeBackground }))
)
import { CollabFolders } from './components/CollabFolders'
import { AutoReel } from './components/Reels'
import { Reveal } from './components/Reveal'
import { MobileAppBar } from './components/MobileAppBar'
import { translations } from './data/translations'
import './index.css'

function FAQItem({ q, a }: { q: string, a: string }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="border-b border-burgundy/10 py-6 last:border-none">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left gap-4 hover:text-burgundy transition-colors duration-300"
      >
        <h3 className="text-xl md:text-2xl font-serif italic">{q}</h3>
        <span className={`text-2xl transition-transform duration-500 ${isOpen ? 'rotate-45' : ''}`}>+</span>
      </button>
      <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isOpen ? 'max-h-[500px] mt-6 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-black-off/70 font-sans font-light leading-relaxed text-lg">
          {a}
        </p>
      </div>
    </div>
  )
}

// Flip to true once the browser is idle, so heavy decorative work (the WebGL
// backgrounds) is deferred until after the page has painted and is interactive.
function useDeferredMount(): boolean {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const ric = window.requestIdleCallback
    if (typeof ric === 'function') {
      const id = ric(() => setReady(true))
      return () => window.cancelIdleCallback(id)
    }
    const id = window.setTimeout(() => setReady(true), 200)
    return () => window.clearTimeout(id)
  }, [])
  return ready
}

function App() {
  const [lang, setLang] = useState<'en' | 'ua'>('en')
  const [isLoading, setIsLoading] = useState(true)
  const showThree = useDeferredMount()
  const t = translations[lang]

  // Flatten every brand's reels into one rail (brands without media just show as names).
  const brandReels = (t as any).brands.items.flatMap((b: any) =>
    b.media.map((m: any) => ({ ...m, brand: b.name }))
  )

  return (
    <>
      {/* Preloader overlays the page while the Three.js scenes warm up underneath,
          so there's no cold-start jank when it slides away. */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      <CustomCursor />
      <MobileAppBar />

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center mix-blend-difference pointer-events-none">
        <div className="pointer-events-auto">
          <a href="#" data-cursor="hover" className="block">
            <svg className="w-8 h-10 text-nude hover:text-rose-smoke transition-colors duration-500" viewBox="0 0 40 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 46 C4 20, 20 4, 20 4 C20 4, 36 20, 36 46" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
          </a>
        </div>
        <div className="flex gap-4 pointer-events-auto font-sans text-[10px] tracking-[0.2em] uppercase text-nude">
          <button 
            onClick={() => setLang('en')}
            className={`hover:text-rose-smoke transition-colors duration-300 ${lang === 'en' ? 'opacity-100 font-medium' : 'opacity-40'}`}
          >
            {t.nav.en}
          </button>
          <span className="opacity-20">/</span>
          <button 
            onClick={() => setLang('ua')}
            className={`hover:text-rose-smoke transition-colors duration-300 ${lang === 'ua' ? 'opacity-100 font-medium' : 'opacity-40'}`}
          >
            {t.nav.ua}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="bg-black-off text-nude min-h-screen min-h-dvh flex items-center relative overflow-x-clip overflow-y-visible" style={{ backgroundColor: '#1B1B1B' }}>
        {/* Three.js Background — deferred + lazy so it never blocks first paint */}
        {showThree && (
          <Suspense fallback={null}>
            <ThreeBackground id="hero-3d-canvas" />
          </Suspense>
        )}

        {/* The Portal Arch (Logo Motif) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vh] opacity-[0.05] pointer-events-none z-30" style={{ height: '140%' }}>
          <svg className="w-full h-full text-nude" viewBox="0 0 40 140" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMin slice">
            <path d="M4 140 V46 C4 20, 20 4, 20 4 C20 4, 36 20, 36 46 V140" stroke="currentColor" strokeWidth="0.8"/>
            <path d="M8 140 V46 C8 24, 20 8, 20 8 C20 8, 32 24, 32 46 V140" stroke="currentColor" strokeWidth="0.5" opacity="0.6"/>
            <path d="M12 140 V46 C12 28, 20 12, 20 12 C20 12, 28 28, 28 46 V140" stroke="currentColor" strokeWidth="0.3" opacity="0.4"/>
          </svg>
        </div>

        {/* Gradient Glows */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] rounded-full opacity-15 will-change-transform" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)' }} />
          <div className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] rounded-full opacity-10 will-change-transform" style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)' }} />
        </div>

        {/* Spinning Sun */}
        <div className="absolute top-40 right-36 hidden lg:block z-20 will-change-transform">
          {/* Enhanced Glow - Highly Optimized */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-30 blur-[40px] pointer-events-none -z-10 will-change-[filter]" 
               style={{ background: 'radial-gradient(circle, rgba(216,167,177,0.6) 0%, transparent 70%)' }} />
          <svg className="spin-slow w-48 h-48 text-rose-smoke relative" viewBox="0 0 200 200">
            <path id="textPath" d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0" fill="none" />
            <text className="text-xs uppercase tracking-widest fill-current font-sans">
              <textPath href="#textPath" startOffset="0%">good vibes · creative energy · social media · </textPath>
            </text>
            <path d="M100 75 Q100 100 125 100 Q100 100 100 125 Q100 100 75 100 Q100 100 100 75" fill="currentColor"/>
          </svg>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24 relative z-40 w-full flex flex-col justify-start mt-10 md:mt-20">
          <div className="opacity-0 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
            <div className="mb-10 w-12 h-14 text-rose-smoke overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 40 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 46 C4 20, 20 4, 20 4 C20 4, 36 20, 36 46" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl tracking-tight mb-6 font-serif italic text-ivory drop-shadow-sm">nastion</h1>
            <div className="max-w-2xl">
              <p className="text-rose-smoke text-2xl md:text-3xl mb-6 font-sans font-light">{t.hero.tagline}</p>
              <p className="text-nude/70 text-lg font-sans font-light leading-relaxed mb-10">
                {t.hero.description}
              </p>
            </div>
          </div>
        </div>

        {/* Available Badge */}
        <div className="absolute md:bottom-62 left-0 px-8 md:px-12 flex items-end z-40 font-sans text-[10px] md:text-xs tracking-widest uppercase text-nude/60" style={{ bottom: 'calc(7rem + env(safe-area-inset-bottom))' }}>
          <div className="flex flex-col gap-3 pb-2">
            <span className="flex items-center gap-3 text-nude/80">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-smoke opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-smoke shadow-[0_0_15px_rgba(216,167,177,1)]" />
              </span>
              {t.hero.available}
            </span>
            <span className="pl-[1.35rem]">{t.hero.location}</span>
          </div>
        </div>

        {/* Social Links */}
        <div className="absolute md:bottom-10 right-0 px-8 md:px-12 flex items-end z-40 font-sans text-[10px] md:text-xs tracking-widest uppercase text-nude/60" style={{ bottom: 'calc(7rem + env(safe-area-inset-bottom))' }}>
          <div className="flex flex-col gap-3 pb-2 text-right">
            <a href="https://instagram.com/nastionnnn" target="_blank" rel="noopener" className="hover:text-rose-smoke transition-colors duration-300">Instagram</a>
            <a href="https://t.me/+380988214204" target="_blank" rel="noopener" className="hover:text-rose-smoke transition-colors duration-300">Telegram</a>
          </div>
        </div>

        {/* Scroll Indicator (hidden on mobile to avoid crowding the bottom badges) */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-3 z-40 opacity-70" style={{ bottom: 'env(safe-area-inset-bottom)' }}>
          <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-nude/50">{t.hero.discover}</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-nude/50 to-transparent" />
        </div>
      </section>

      {/* UGC / Content — visuals first, right after the hero */}
      <section id="ugc" className="bg-black-off pt-24 pb-24 md:pt-32 md:pb-40 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <Reveal className="mb-12 md:mb-20 max-w-2xl">
            <p className="text-xs text-rose-smoke tracking-[0.4em] uppercase mb-6 font-sans">{(t as any).ugc.badge}</p>
            <h2 className="text-5xl md:text-8xl font-serif italic text-nude leading-none">{(t as any).ugc.heading}</h2>
            <p className="text-nude/50 font-sans font-light leading-relaxed mt-6 text-lg">{(t as any).ugc.description}</p>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5">
            {(t as any).ugc.items.map((r: any, i: number) => (
              <div
                key={i}
                data-cursor="hover"
                className="rounded-[1.75rem] overflow-hidden border border-nude/10 shadow-2xl"
              >
                <AutoReel src={r.src} poster={r.poster} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-nude pt-24 pb-20 md:pt-40 md:pb-32 relative overflow-hidden text-black-off">
        {/* Wavy top separator */}
        <div className="absolute top-0 left-0 w-full z-20 pointer-events-none">
          <svg viewBox="0 0 1440 120" className="w-full h-[60px] md:h-[100px]" preserveAspectRatio="none">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z" fill="#1B1B1B"></path>
          </svg>
        </div>

        {/* Arch legs continuation */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vh] h-full opacity-[0.04] pointer-events-none z-10">
          <svg className="w-full h-full text-black-off" viewBox="0 0 40 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMin slice">
            <path d="M4 0 V100" stroke="currentColor" strokeWidth="0.8"/>
            <path d="M36 0 V100" stroke="currentColor" strokeWidth="0.8"/>
            <path d="M8 0 V100" stroke="currentColor" strokeWidth="0.5" opacity="0.6"/>
            <path d="M32 0 V100" stroke="currentColor" strokeWidth="0.5" opacity="0.6"/>
            <path d="M12 0 V100" stroke="currentColor" strokeWidth="0.3" opacity="0.4"/>
            <path d="M28 0 V100" stroke="currentColor" strokeWidth="0.3" opacity="0.4"/>
          </svg>
        </div>

        <div className="absolute -top-[30%] left-[20%] w-[60vw] h-[60vw] rounded-full blur-[200px] pointer-events-none z-0" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 60%)' }} />
        <div className="max-w-5xl mx-auto px-6 relative z-30">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="md:col-span-4">
              <p className="text-sm text-burgundy tracking-widest uppercase mb-4 border-b border-burgundy/30 pb-2 inline-block">{t.about.vision}</p>
            </div>
            <div className="md:col-span-8 section-fade" style={{ animationDelay: '0.1s' }}>
              <p className="text-3xl md:text-4xl leading-snug font-serif italic mb-8">
                {t.about.heading}
              </p>
              <p className="text-lg md:text-xl text-black-off/70 font-sans font-light leading-relaxed" dangerouslySetInnerHTML={{ __html: t.about.body }} />
            </div>
          </div>
        </div>
      </section>

      {/* By the Numbers */}
      <section className="bg-burgundy text-nude py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-rose-smoke/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6">
            {(t as any).numbers.map((n: any, i: number) => (
              <Reveal key={i} delay={i * 120} className="text-center">
                <div className="text-5xl md:text-7xl font-serif italic text-nude leading-none mb-3">{n.value}</div>
                <div className="text-[10px] md:text-xs tracking-[0.25em] uppercase font-sans text-nude/50">{n.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise / Services */}
      <section id="skills" className="bg-rose-smoke text-black-off py-24 md:py-40 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-32 gap-8">
            <div>
              <p className="text-xs text-burgundy tracking-[0.4em] uppercase mb-6 font-sans">{(t as any).services.badge}</p>
              <h2 className="text-6xl md:text-8xl font-serif italic text-burgundy leading-none">{t.services.heading}</h2>
            </div>
            <p className="text-sm font-sans tracking-[0.2em] uppercase opacity-60 md:text-right max-w-[250px]">
              {(t as any).services.subtitle}
            </p>
          </div>

          <div className="flex flex-col border-t border-burgundy/10">
            {t.services.items.map((service, i) => (
              <Reveal key={service.id} delay={i * 80}>
              <div
                data-cursor="hover"
                className="group relative flex flex-col md:flex-row md:items-center justify-between py-10 md:py-16 border-b border-burgundy/10 transition-colors duration-500 hover:bg-burgundy/[0.02]"
              >
                {/* Background ID (Reveal on hover) */}
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 opacity-0 group-hover:opacity-[0.03] transition-all duration-700 pointer-events-none -z-10 group-hover:left-1/3">
                  <span className="text-[12rem] font-serif italic leading-none">{service.id}</span>
                </div>

                <div className="flex items-baseline gap-8 md:gap-12 relative z-10">
                  <span className="text-xs font-sans tracking-widest text-burgundy/40 mt-2 transition-colors duration-500 group-hover:text-burgundy">{service.id}</span>
                  <h3 className="text-4xl md:text-7xl font-serif transition-all duration-700 ease-out group-hover:translate-x-6 group-hover:text-burgundy">
                    {service.title}
                  </h3>
                </div>

                <div className="mt-6 md:mt-0 md:max-w-md relative z-10">
                  <p className="text-lg md:text-xl font-sans font-light opacity-70 leading-relaxed group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-2">
                    {service.desc}
                  </p>
                  <div className="mt-8 flex gap-2 overflow-hidden h-[1px] w-full bg-burgundy/10">
                    <div className="h-full w-full bg-burgundy -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
                  </div>
                </div>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Brands / Clients */}
      <section id="work" className="bg-black-off py-24 md:py-40 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <Reveal className="text-center mb-16 md:mb-32">
            <p className="text-xs text-rose-smoke tracking-[0.4em] uppercase mb-6 font-sans">{(t as any).clients.badge}</p>
            <h2 className="text-5xl md:text-8xl font-serif italic text-nude leading-none">{(t as any).clients.heading}</h2>
          </Reveal>

          <CollabFolders
            items={(t as any).clients.items}
            labels={{
              hint: (t as any).clients.hint,
              visit: (t as any).clients.visit,
              statsLabel: (t as any).clients.statsLabel,
              galleryLabel: (t as any).clients.galleryLabel,
              mediaPlaceholder: (t as any).clients.mediaPlaceholder,
            }}
          />
        </div>
      </section>

      {/* Modeling / Brand shoots */}
      <section className="bg-rose-smoke text-black-off py-24 md:py-40 relative overflow-hidden">
        <div className="absolute -top-20 right-[10%] w-[40vw] h-[40vw] bg-soft-orchid/30 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <Reveal className="text-center mb-14 md:mb-20">
            <p className="text-xs text-burgundy tracking-[0.4em] uppercase mb-6 font-sans">{(t as any).brands.badge}</p>
            <h2 className="text-5xl md:text-7xl font-serif italic text-burgundy leading-tight">{(t as any).brands.heading}</h2>
            <p className="text-black-off/60 font-sans font-light leading-relaxed mt-6 max-w-md mx-auto text-lg">{(t as any).brands.description}</p>
          </Reveal>

          {/* Brand names as an editorial row */}
          <Reveal delay={100} className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 md:gap-x-10 mb-16 md:mb-20">
            {(t as any).brands.items.map((b: any, i: number) => (
              <span key={i} className="flex items-center gap-x-6 md:gap-x-10">
                {i > 0 && <span className="text-burgundy/30 text-xl">✦</span>}
                <span className="text-2xl md:text-4xl font-serif italic text-burgundy/80">{b.name}</span>
              </span>
            ))}
          </Reveal>
        </div>

        {/* Reels — full-screen-wide row so they're big; all fit on desktop, swipe on mobile */}
        {brandReels.length > 0 && (
          <Reveal delay={150} className="relative z-10 px-3 md:px-5">
            <div className="flex gap-3 md:gap-4 overflow-x-auto md:overflow-visible pb-2 snap-x snap-mandatory md:snap-none" style={{ scrollbarWidth: 'none' }}>
              {brandReels.map((r: any, i: number) => (
                <div
                  key={i}
                  data-cursor="hover"
                  className="snap-start shrink-0 w-[60vw] sm:w-[40vw] md:w-auto md:flex-1 md:min-w-0 group relative rounded-2xl overflow-hidden border border-black-off/5 shadow-lg"
                >
                  <AutoReel src={r.src} poster={r.poster} />
                  <span className="absolute bottom-3 left-3 text-[10px] tracking-[0.2em] uppercase font-sans text-nude bg-black-off/40 backdrop-blur-sm px-2 py-1 rounded-full">
                    {r.brand}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </section>

      {/* Niches / Industries */}
      <section className="bg-nude py-24 md:py-40 border-y border-burgundy/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-rose-smoke/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[35vw] h-[35vw] bg-soft-orchid/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          {/* Centered editorial header */}
          <Reveal className="text-center mb-16 md:mb-24">
            <p className="text-sm text-burgundy tracking-[0.3em] uppercase mb-6 font-sans font-medium">{t.niches.heading}</p>
            <h2 className="text-5xl md:text-7xl font-serif italic text-black-off leading-tight">{t.niches.subheading}</h2>
            <div className="w-20 h-[2px] bg-burgundy mx-auto mt-8" />
          </Reveal>

          {/* Flowing color-blocked tags */}
          <Reveal delay={120} className="flex flex-wrap justify-center gap-3 md:gap-4">
            {t.niches.items.map((niche, i) => {
              // Cycle through palette so the cloud reads bold and color-blocked.
              const styles = [
                'bg-burgundy text-nude border-burgundy',
                'bg-transparent text-black-off/80 border-burgundy/20',
                'bg-rose-smoke text-black-off border-rose-smoke',
                'bg-transparent text-black-off/80 border-burgundy/20',
                'bg-black-off text-nude border-black-off',
                'bg-transparent text-black-off/80 border-burgundy/20',
                'bg-soft-orchid text-black-off border-soft-orchid',
              ]
              const sizes = ['text-lg md:text-2xl', 'text-base md:text-xl', 'text-lg md:text-2xl']
              return (
                <span
                  key={i}
                  data-cursor="hover"
                  className={`group inline-flex items-baseline gap-2 rounded-full border px-6 py-3 md:px-8 md:py-4 font-serif italic transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${styles[i % styles.length]} ${sizes[i % sizes.length]}`}
                >
                  <span className="text-[9px] not-italic font-sans tracking-widest opacity-50">0{i + 1}</span>
                  {niche}
                </span>
              )
            })}
          </Reveal>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-nude py-24 md:py-40 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 relative z-30">
          <div className="mb-16 md:mb-24">
            <p className="text-sm text-burgundy tracking-widest uppercase mb-4 font-sans">{t.reviews.badge}</p>
            <h2 className="text-5xl md:text-7xl font-serif italic text-black-off">{t.reviews.heading}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {t.reviews.items.map((review, i) => (
              <div key={i} className="flex flex-col gap-8">
                <svg className="w-12 h-12 text-rose-smoke" viewBox="0 0 44 32" fill="currentColor">
                  <path d="M10.1 32c-3.1 0-5.7-1.1-7.7-3.3C.8 26.5 0 23.3 0 19.3c0-4.8 1.4-9 4.2-12.6C7 3.1 11.2.9 16.8 0l.9 3.2C13 4 10.3 5.9 9.6 8.9c-.3 1.3-.2 2.6.2 3.9 1.1-.3 2.2-.4 3.4-.4 2.8 0 5.2.8 7.1 2.5 1.9 1.7 2.9 4 2.9 7 0 3-1 5.3-3 7-2 1.7-4.5 2.5-7.5 2.5l-2.6.6zm23.1 0c-3.1 0-5.7-1.1-7.7-3.3-1.6-2.2-2.4-5.4-2.4-9.4 0-4.8 1.4-9 4.2-12.6C30.1 3.1 34.3.9 39.9 0l.9 3.2C36.1 4 33.4 5.9 32.7 8.9c-.3 1.3-.2 2.6.2 3.9 1.1-.3 2.2-.4 3.4-.4 2.8 0 5.2.8 7.1 2.5 1.9 1.7 2.9 4 2.9 7 0 3-1 5.3-3 7-2 1.7-4.5 2.5-7.5 2.5l-2.6.6z"/>
                </svg>
                <p className="text-2xl md:text-3xl font-serif italic text-black-off/80 leading-relaxed">
                  "{review.text}"
                </p>
                <div className="flex flex-col gap-1">
                  <p className="font-sans font-medium text-burgundy">{review.name}</p>
                  <p className="text-xs uppercase tracking-widest text-black-off/40">{review.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="bg-burgundy text-nude py-8 overflow-hidden relative z-20">
        <div className="flex">
          <div className="animate-marquee flex shrink-0 items-center space-x-8 text-2xl font-serif italic tracking-wider pr-8">
            {t.marquee.map((text, i) => (
              <span key={i}>{text}<span className="text-rose-smoke mx-8">✦</span></span>
            ))}
          </div>
          <div className="animate-marquee flex shrink-0 items-center space-x-8 text-2xl font-serif italic tracking-wider pr-8" aria-hidden="true">
            {t.marquee.map((text, i) => (
              <span key={i}>{text}<span className="text-rose-smoke mx-8">✦</span></span>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="bg-nude pt-24 pb-10 md:pt-40 md:pb-16 relative text-black-off">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="mb-16 md:mb-20 text-center">
            <h2 className="text-5xl md:text-6xl font-serif italic text-burgundy">{t.journey.heading}</h2>
          </div>

          <div className="space-y-8 pl-4 md:pl-0 border-l border-burgundy/20 md:border-none relative">
            {t.journey.items.map((item, i) => (
              <div key={i} className="relative md:flex gap-12 items-start p-6 md:p-8 rounded-[2rem] hover:bg-white/40 transition-all duration-300 border border-transparent hover:border-white/60 shadow-none hover:shadow-xl">
                <div className="hidden md:block w-1/4 text-right pt-2">
                  <p className={`text-sm ${i === 0 ? 'text-burgundy' : 'text-rose-smoke'} font-medium tracking-widest`}>{item.date}</p>
                </div>
                <div className={`absolute -left-[5px] md:static w-3 h-3 rounded-full ${i === 0 ? 'bg-burgundy' : 'bg-rose-smoke'} mt-2 shrink-0 md:mt-3 shadow-[0_0_0_4px_rgba(75,29,63,0.2)]`} />
                <div className="md:w-3/4 pl-6 md:pl-0">
                  <p className={`text-sm ${i === 0 ? 'text-burgundy' : 'text-rose-smoke'} font-medium tracking-widest md:hidden mb-2`}>{item.date}</p>
                  <h3 className="text-2xl font-serif mb-3">{item.title}</h3>
                  <p className="text-black-off/70 font-light font-sans">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-nude pb-24 md:pb-40">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-5xl md:text-6xl font-serif italic text-burgundy">{t.faq.heading}</h2>
            <div className="w-20 h-[1px] bg-burgundy/20 mt-6" />
          </div>
          <div className="space-y-4">
            {t.faq.items.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-burgundy text-nude py-20 md:py-32 relative overflow-hidden">
        {showThree && (
          <Suspense fallback={null}>
            <ContactThreeBackground />
          </Suspense>
        )}
        <div className="absolute -top-20 -right-20 w-[50vw] h-[50vw] rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(216,167,177,0.5) 0%, transparent 60%)' }} />
        <div className="absolute -bottom-20 -left-20 w-[40vw] h-[40vw] rounded-full opacity-15 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(27,27,27,0.4) 0%, transparent 60%)' }} />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <p className="text-sm text-rose-smoke tracking-widest uppercase mb-6 font-sans">{t.contact.badge}</p>
          <h2 className="text-5xl md:text-7xl font-serif italic mb-8">{t.contact.heading}</h2>
          <p className="text-nude/80 mb-16 max-w-lg mx-auto font-sans font-light text-lg">
            {t.contact.description}
          </p>

          <div className="flex flex-wrap justify-center gap-6 font-sans">
            <a href="https://instagram.com/nastionnnn" target="_blank" rel="noopener"
               className="group relative w-full md:w-auto px-8 py-4 bg-nude text-burgundy rounded-full overflow-hidden block md:inline-block">
              <span className="relative z-10 font-medium tracking-wide">{t.contact.links.insta}</span>
              <div className="absolute inset-0 h-full w-full bg-rose-smoke scale-x-0 group-hover:scale-x-100 transition-transform origin-left ease-out duration-300" />
            </a>
            <a href="mailto:hello@anastasia.com"
               className="group relative w-full md:w-auto px-8 py-4 border border-nude/30 rounded-full overflow-hidden block md:inline-block">
               <span className="relative z-10 text-nude group-hover:text-black-off transition-colors duration-300 tracking-wide">{t.contact.links.email}</span>
               <div className="absolute inset-0 h-full w-full bg-nude scale-x-0 group-hover:scale-x-100 transition-transform origin-left ease-out duration-300" />
            </a>
            <a href="https://t.me/+380988214204" target="_blank" rel="noopener"
               className="group relative w-full md:w-auto px-8 py-4 border border-nude/30 rounded-full overflow-hidden block md:inline-block">
               <span className="relative z-10 text-nude group-hover:text-black-off transition-colors duration-300 tracking-wide">{t.contact.links.tele}</span>
               <div className="absolute inset-0 h-full w-full bg-nude scale-x-0 group-hover:scale-x-100 transition-transform origin-left ease-out duration-300" />
            </a>
            <a href="viber://chat?number=%2B380988214204" target="_blank" rel="noopener"
               className="group relative w-full md:w-auto px-8 py-4 border border-nude/30 rounded-full overflow-hidden block md:inline-block">
               <span className="relative z-10 text-nude group-hover:text-black-off transition-colors duration-300 tracking-wide">{t.contact.links.viber}</span>
               <div className="absolute inset-0 h-full w-full bg-nude scale-x-0 group-hover:scale-x-100 transition-transform origin-left ease-out duration-300" />
            </a>
            <a href="https://wa.me/380988214204" target="_blank" rel="noopener"
               className="group relative w-full md:w-auto px-8 py-4 border border-nude/30 rounded-full overflow-hidden block md:inline-block">
               <span className="relative z-10 text-nude group-hover:text-black-off transition-colors duration-300 tracking-wide">{t.contact.links.wa}</span>
               <div className="absolute inset-0 h-full w-full bg-nude scale-x-0 group-hover:scale-x-100 transition-transform origin-left ease-out duration-300" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black-off text-nude/40 py-10 pb-[calc(7rem+env(safe-area-inset-bottom))] md:pb-[calc(2.5rem+env(safe-area-inset-bottom))]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm font-sans gap-4">
          <p className="tracking-widest uppercase text-xs">{t.footer.rights}</p>
          <svg className="w-8 h-10 text-rose-smoke opacity-50" viewBox="0 0 40 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 46 C4 20, 20 4, 20 4 C20 4, 36 20, 36 46" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          </svg>
          <p className="tracking-widest uppercase text-xs hidden md:block">{t.footer.tagline}</p>
        </div>
      </footer>
    </>
  )
}

export default App
