import { CustomCursor } from './components/CustomCursor'
import './index.css'

const services = [
  { id: '01', title: 'SMM', desc: 'Strategy, content planning, and authentic community engagement.', color: 'bg-nude' },
  { id: '02', title: 'Targeting', desc: 'Precise audience mapping and high-conversion ad campaigns.', color: 'bg-burgundy text-nude' },
  { id: '03', title: 'Content', desc: 'Photography, aesthetic reels, and cohesive brand storytelling.', color: 'bg-black-off text-nude' }
]

function App() {
  return (
    <>
      <CustomCursor />

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center mix-blend-difference pointer-events-none">
        <div className="pointer-events-auto">
          <svg className="w-8 h-10 text-nude hover:text-rose-smoke transition-colors duration-500" viewBox="0 0 40 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 46 C4 20, 20 4, 20 4 C20 4, 36 20, 36 46" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          </svg>
        </div>
        <div className="flex gap-4 pointer-events-auto font-sans text-[10px] tracking-[0.2em] uppercase text-nude">
          <button className="hover:text-rose-smoke transition-colors duration-300 opacity-100 font-medium">EN</button>
          <span className="opacity-20">/</span>
          <button className="hover:text-rose-smoke transition-colors duration-300 opacity-40">UA</button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-black-off text-nude min-h-screen min-h-dvh flex items-center relative overflow-x-clip overflow-y-visible" style={{ backgroundColor: '#1B1B1B' }}>
        {/* Gradient Glows */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] rounded-full opacity-25" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 60%)' }} />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.4) 0%, transparent 65%)' }} />
          <div className="absolute top-[20%] right-[10%] w-[50vw] h-[50vw] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, rgba(216,167,177,0.35) 0%, transparent 55%)' }} />
        </div>

        {/* Geometric Shapes */}
        <div className="absolute inset-0 pointer-events-none z-[5] overflow-hidden hidden md:block">
          <div className="absolute top-[15%] left-[5%] w-48 h-48 border-2 border-rose-smoke/40 rounded-full animate-spin" style={{ animationDuration: '25s' }} />
          <div className="absolute top-[60%] left-[10%] w-32 h-32 border border-soft-orchid/30 rounded-full animate-spin" style={{ animationDuration: '18s', animationDirection: 'reverse' }} />
          <div className="absolute bottom-[15%] left-[15%] w-24 h-24 border border-nude/25 rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute top-[30%] left-[30%] w-64 h-64 border-2 border-rose-smoke/35 rounded-full animate-spin" style={{ animationDuration: '30s' }} />
          <div className="absolute top-[20%] right-[10%] w-40 h-40 border-2 border-soft-orchid/35 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
          <div className="absolute top-[50%] right-[5%] w-28 h-28 border border-rose-smoke/30 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
        </div>

        {/* Spinning Sun */}
        <div className="absolute top-40 right-36 hidden lg:block z-20">
          <div className="absolute inset-0 w-48 h-48 rounded-full opacity-60" style={{ background: 'radial-gradient(circle, rgba(216,167,177,0.5) 0%, rgba(229,209,217,0.3) 40%, transparent 70%)' }} />
          <svg className="spin-slow w-48 h-48 text-rose-smoke relative" viewBox="0 0 200 200">
            <path id="textPath" d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0" fill="none" />
            <text className="text-xs uppercase tracking-widest fill-current font-sans">
              <textPath href="#textPath" startOffset="0%">good vibes · creative energy · social media · </textPath>
            </text>
            <path d="M100 75 Q100 100 125 100 Q100 100 100 125 Q100 100 75 100 Q100 100 100 75" fill="currentColor"/>
          </svg>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24 relative z-20 w-full flex flex-col justify-start mt-10 md:mt-20">
          <div className="opacity-0 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
            <div className="mb-10 w-12 h-14 text-rose-smoke overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 40 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 46 C4 20, 20 4, 20 4 C20 4, 36 20, 36 46" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl tracking-tight mb-6 font-serif italic text-ivory drop-shadow-sm">nastion</h1>
            <div className="max-w-2xl">
              <p className="text-rose-smoke text-2xl md:text-3xl mb-6 font-sans font-light">SMM · Target · Content · UGC · Model</p>
              <p className="text-nude/70 text-lg font-sans font-light leading-relaxed mb-10">
                Допомагаю бізнесам будувати сильний візуал, розвивати соцмережі та залучати нову аудиторію. Понад 2 роки у digital-маркетингу.
              </p>
            </div>
          </div>
        </div>

        {/* Available Badge */}
        <div className="absolute md:bottom-62 left-0 px-8 md:px-12 flex items-end z-20 font-sans text-[10px] md:text-xs tracking-widest uppercase text-nude/60" style={{ bottom: 'calc(7rem + env(safe-area-inset-bottom))' }}>
          <div className="flex flex-col gap-3 pb-2">
            <span className="flex items-center gap-3 text-nude/80">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-smoke opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-smoke shadow-[0_0_15px_rgba(216,167,177,1)]" />
              </span>
              Available for projects
            </span>
            <span className="pl-[1.35rem]">Kyiv, Ukraine</span>
          </div>
        </div>

        {/* Social Links */}
        <div className="absolute md:bottom-10 right-0 px-8 md:px-12 flex items-end z-20 font-sans text-[10px] md:text-xs tracking-widest uppercase text-nude/60" style={{ bottom: 'calc(7rem + env(safe-area-inset-bottom))' }}>
          <div className="flex flex-col gap-3 pb-2 text-right">
            <a href="https://instagram.com/nastionnnn" target="_blank" rel="noopener" className="hover:text-rose-smoke transition-colors duration-300">Instagram</a>
            <a href="https://t.me/+380988214204" target="_blank" rel="noopener" className="hover:text-rose-smoke transition-colors duration-300">Telegram</a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 opacity-70" style={{ bottom: 'env(safe-area-inset-bottom)' }}>
          <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-nude/50">Discover</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-nude/50 to-transparent" />
        </div>
      </section>

      {/* About */}
      <section className="bg-nude pt-24 pb-20 md:pt-40 md:pb-32 relative overflow-hidden text-black-off">
        <div className="absolute -top-[30%] left-[20%] w-[60vw] h-[60vw] rounded-full blur-[200px] pointer-events-none z-0" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 60%)' }} />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="md:col-span-4">
              <p className="text-sm text-burgundy tracking-widest uppercase mb-4 border-b border-burgundy/30 pb-2 inline-block">The Vision</p>
            </div>
            <div className="md:col-span-8 section-fade" style={{ animationDelay: '0.1s' }}>
              <p className="text-3xl md:text-4xl leading-snug font-serif italic mb-8">
                Creating meaningful digital presence for brands and individuals.
              </p>
              <p className="text-lg md:text-xl text-black-off/70 font-sans font-light leading-relaxed">
                Specializing in social media strategy, targeted advertising, and lifestyle content that <span className="text-burgundy font-medium italic">connects</span> deeply with modern audiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-rose-smoke text-black-off py-20 md:py-32 relative">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-5xl md:text-6xl font-serif italic text-burgundy">Expertise</h2>
            <div className="w-24 h-[1px] bg-burgundy/30 mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {services.map((service) => (
              <div key={service.id} data-cursor="hover" className={`p-8 md:p-10 rounded-[2rem] rounded-tl-none ${service.color} transition-all duration-300 shadow-xl shadow-black-off/5 hover:-translate-y-2 hover:shadow-2xl`}>
                <span className="text-sm font-sans tracking-widest opacity-70 mb-8 block">{service.id}</span>
                <h3 className="text-3xl font-serif mb-4">{service.title}</h3>
                <p className="font-sans font-light opacity-90">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="bg-black-off py-24 md:py-40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-32 gap-8">
            <div>
              <h2 className="text-7xl md:text-9xl font-serif italic text-nude leading-none opacity-20 absolute -top-10 -left-4 md:-top-20 md:-left-10 select-none">Selection</h2>
              <h2 className="text-5xl md:text-7xl font-serif italic text-rose-smoke relative z-10">Selected Works</h2>
            </div>
            <p className="text-nude/50 font-sans font-light tracking-widest uppercase text-xs md:text-right max-w-[200px]">
              A curated collection of digital aesthetics and strategic growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
            {/* Work 1 */}
            <div className="md:col-span-7 group" data-cursor="hover">
              <div className="relative overflow-hidden rounded-[2.5rem] bg-burgundy aspect-[4/5] md:aspect-auto md:h-[700px]">
                <div className="absolute inset-0 bg-gradient-to-t from-black-off/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-nude/10 text-9xl font-serif italic rotate-12 group-hover:rotate-0 transition-transform duration-700">Aesthetic</span>
                </div>
                <div className="absolute bottom-10 left-10 text-nude transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-xs tracking-widest uppercase font-sans mb-3 block opacity-70">Photography / Art Direction</span>
                  <h3 className="text-4xl md:text-5xl font-serif italic mb-4">The Kinfolk Vision</h3>
                  <p className="text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 max-w-sm">
                    Visual storytelling for a boutique lifestyle brand, focusing on organic textures and natural light.
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col gap-12">
              {/* Work 2 */}
              <div className="group" data-cursor="hover">
                <div className="relative overflow-hidden rounded-[2.5rem] bg-rose-smoke aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-t from-burgundy/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-burgundy/10 text-7xl font-serif italic -rotate-12 group-hover:rotate-0 transition-transform duration-700">Strategy</span>
                  </div>
                  <div className="absolute bottom-8 left-8 text-black-off transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-xs tracking-widest uppercase font-sans mb-2 block opacity-70">SMM / Growth</span>
                    <h3 className="text-3xl font-serif italic">Moonlight Label</h3>
                  </div>
                </div>
              </div>

              {/* Work 3 */}
              <div className="group" data-cursor="hover">
                <div className="relative overflow-hidden rounded-[2.5rem] bg-nude aspect-video">
                  <div className="absolute inset-0 bg-gradient-to-t from-black-off/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-black-off/10 text-8xl font-serif italic group-hover:scale-110 transition-transform duration-1000">Motion</span>
                  </div>
                  <div className="absolute bottom-8 left-8 text-black-off transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-xs tracking-widest uppercase font-sans mb-2 block opacity-70">Content / Reels</span>
                    <h3 className="text-3xl font-serif italic">Summer Noir Series</h3>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-black-off/20 flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500">
                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-black-off border-b-[8px] border-b-transparent ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 md:mt-32 text-center">
            <a href="https://instagram.com/nastionnnn" target="_blank" className="group inline-flex items-center gap-4 text-rose-smoke hover:text-nude transition-colors duration-300">
              <span className="text-sm tracking-[0.3em] uppercase font-sans">See All Chronicles</span>
              <div className="w-12 h-[1px] bg-rose-smoke/30 group-hover:w-20 group-hover:bg-nude transition-all duration-500" />
            </a>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="bg-burgundy text-nude py-8 overflow-hidden relative z-20">
        <div className="flex">
          <div className="animate-marquee flex shrink-0 items-center space-x-8 text-2xl font-serif italic tracking-wider pr-8">
            {['CONTENT STRATEGY', 'BRAND IDENTITY', 'TARGETED ADS', 'AESTHETIC REELS', 'COMMUNITY BUILDING'].map((text, i) => (
              <span key={i}>{text}<span className="text-rose-smoke mx-8">✦</span></span>
            ))}
          </div>
          <div className="animate-marquee flex shrink-0 items-center space-x-8 text-2xl font-serif italic tracking-wider pr-8" aria-hidden="true">
            {['CONTENT STRATEGY', 'BRAND IDENTITY', 'TARGETED ADS', 'AESTHETIC REELS', 'COMMUNITY BUILDING'].map((text, i) => (
              <span key={i}>{text}<span className="text-rose-smoke mx-8">✦</span></span>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="bg-nude pt-24 pb-20 md:pt-40 md:pb-32 relative text-black-off">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="mb-16 md:mb-20 text-center">
            <h2 className="text-5xl md:text-6xl font-serif italic text-burgundy">Journey</h2>
          </div>

          <div className="space-y-8 pl-4 md:pl-0 border-l border-burgundy/20 md:border-none relative">
            <div className="relative md:flex gap-12 items-start p-6 md:p-8 rounded-[2rem] hover:bg-white/40 transition-all duration-300 border border-transparent hover:border-white/60 shadow-none hover:shadow-xl">
              <div className="hidden md:block w-1/4 text-right pt-2">
                <p className="text-sm text-burgundy font-medium tracking-widest">2023 — Present</p>
              </div>
              <div className="absolute -left-[5px] md:static w-3 h-3 rounded-full bg-burgundy mt-2 shrink-0 md:mt-3 shadow-[0_0_0_4px_rgba(75,29,63,0.2)]" />
              <div className="md:w-3/4 pl-6 md:pl-0">
                <p className="text-sm text-burgundy font-medium tracking-widest md:hidden mb-2">2023 — Present</p>
                <h3 className="text-2xl font-serif mb-3">Freelance SMM & Content Creator</h3>
                <p className="text-black-off/70 font-light font-sans">Working with lifestyle brands, personal brands, and small businesses to elevate their digital footprint through organic aesthetics.</p>
              </div>
            </div>

            <div className="relative md:flex gap-12 items-start p-6 md:p-8 rounded-[2rem] hover:bg-white/40 transition-all duration-300 border border-transparent hover:border-white/60 shadow-none hover:shadow-xl">
              <div className="hidden md:block w-1/4 text-right pt-2">
                <p className="text-sm text-rose-smoke font-medium tracking-widest">2022 — 2023</p>
              </div>
              <div className="absolute -left-[5px] md:static w-3 h-3 rounded-full bg-rose-smoke mt-2 shrink-0 md:mt-3 shadow-[0_0_0_4px_rgba(216,167,177,0.2)]" />
              <div className="md:w-3/4 pl-6 md:pl-0">
                <p className="text-sm text-rose-smoke font-medium tracking-widest md:hidden mb-2">2022 — 2023</p>
                <h3 className="text-2xl font-serif mb-3">Social Media Manager</h3>
                <p className="text-black-off/70 font-light font-sans">Brand collaboration, campaign management, and establishing visual identity for emerging labels.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-burgundy text-nude py-20 md:py-32 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-[50vw] h-[50vw] rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(216,167,177,0.5) 0%, transparent 60%)' }} />
        <div className="absolute -bottom-20 -left-20 w-[40vw] h-[40vw] rounded-full opacity-15 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(27,27,27,0.4) 0%, transparent 60%)' }} />

        <div className="absolute top-16 left-16 w-24 h-24 rounded-full border border-nude/20 hidden md:block animate-spin" style={{ animationDuration: '20s' }} />
        <div className="absolute bottom-24 right-20 w-32 h-32 rounded-full border-2 border-soft-orchid/25 hidden md:block animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }}>
          <div className="absolute inset-4 rounded-full border border-nude/15" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <p className="text-sm text-rose-smoke tracking-widest uppercase mb-6 font-sans">Співпраця</p>
          <h2 className="text-5xl md:text-7xl font-serif italic mb-8">Let's Create Magic</h2>
          <p className="text-nude/80 mb-16 max-w-lg mx-auto font-sans font-light text-lg">
            Open to collaborations, brand partnerships, and new creative projects that push boundaries.
          </p>

          <div className="flex flex-wrap justify-center gap-6 font-sans">
            <a href="https://instagram.com/nastionnnn" target="_blank" rel="noopener"
               className="group relative w-full md:w-auto px-8 py-4 bg-nude text-burgundy rounded-full overflow-hidden block md:inline-block">
              <span className="relative z-10 font-medium tracking-wide">Instagram</span>
              <div className="absolute inset-0 h-full w-full bg-rose-smoke scale-x-0 group-hover:scale-x-100 transition-transform origin-left ease-out duration-300" />
            </a>
            <a href="mailto:hello@anastasia.com"
               className="group relative w-full md:w-auto px-8 py-4 border border-nude/30 rounded-full overflow-hidden block md:inline-block">
               <span className="relative z-10 text-nude group-hover:text-black-off transition-colors duration-300 tracking-wide">Email</span>
               <div className="absolute inset-0 h-full w-full bg-nude scale-x-0 group-hover:scale-x-100 transition-transform origin-left ease-out duration-300" />
            </a>
            <a href="https://t.me/+380988214204" target="_blank" rel="noopener"
               className="group relative w-full md:w-auto px-8 py-4 border border-nude/30 rounded-full overflow-hidden block md:inline-block">
               <span className="relative z-10 text-nude group-hover:text-black-off transition-colors duration-300 tracking-wide">Telegram</span>
               <div className="absolute inset-0 h-full w-full bg-nude scale-x-0 group-hover:scale-x-100 transition-transform origin-left ease-out duration-300" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black-off text-nude/40 py-10" style={{ paddingBottom: 'calc(2.5rem + env(safe-area-inset-bottom))' }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm font-sans gap-4">
          <p className="tracking-widest uppercase text-xs">© 2026 Anastasia. All rights reserved.</p>
          <svg className="w-8 h-10 text-rose-smoke opacity-50" viewBox="0 0 40 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 46 C4 20, 20 4, 20 4 C20 4, 36 20, 36 46" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          </svg>
          <p className="tracking-widest uppercase text-xs hidden md:block">Designed with Intention</p>
        </div>
      </footer>
    </>
  )
}

export default App
