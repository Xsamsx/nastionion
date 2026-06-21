import { useEffect, useState } from 'react'
import { asset } from '../lib/asset'

type Stat = { label: string; value: string }
type Media = { type: 'image' | 'video'; src: string; poster?: string }
type Collab = {
  name: string
  url: string
  category: string
  description: string
  services?: string[]
  stats: Stat[]
  media: Media[]
}

// Hide media that hasn't been processed/compressed into public/media yet, so a
// 404 shows as nothing instead of a broken thumbnail.
const hideOnError = (e: { currentTarget: { style: { display: string } } }) => {
  e.currentTarget.style.display = 'none'
}

// Country flag from the category string (works for EN + UA). Only US & Canada
// are non-Ukraine, so everything else falls back to the Ukrainian flag.
const flagFor = (cat: string) =>
  /USA|США/i.test(cat) ? '🇺🇸' : /Canada|Канада/i.test(cat) ? '🇨🇦' : '🇺🇦'

type Labels = {
  hint: string
  visit: string
  statsLabel: string
  galleryLabel: string
  mediaPlaceholder: string
}

export function CollabFolders({ items, labels }: { items: Collab[]; labels: Labels }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const active = openIndex !== null ? items[openIndex] : null

  // Lock body scroll + allow Esc to close while the folder is open.
  useEffect(() => {
    if (openIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [openIndex])

  return (
    <>
      <p className="text-center text-[11px] text-nude/40 tracking-[0.3em] uppercase font-sans mb-12">
        {labels.hint}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7">
        {items.map((item, i) => {
          // Lead with the client's own content: poster of the first video, or first image.
          const coverItem = item.media.find((m) => m.poster || m.type === 'image')
          const coverSrc = coverItem ? (coverItem.type === 'video' ? coverItem.poster : coverItem.src) : null
          return (
            <button
              key={i}
              onClick={() => setOpenIndex(i)}
              data-cursor="hover"
              aria-label={item.name}
              className="group relative aspect-[3/4] rounded-[1.5rem] overflow-hidden text-left border border-nude/10 shadow-xl transition-transform duration-500 ease-out hover:-translate-y-1 focus:outline-none"
            >
              {/* Cover — their actual content, or a tinted fallback if no media yet */}
              {coverSrc ? (
                <img
                  src={asset(coverSrc)}
                  alt={item.name}
                  loading="lazy"
                  onError={hideOnError}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-burgundy via-burgundy/80 to-rose-smoke/40 flex items-center justify-center">
                  {/* Brand arch watermark so photo-less cards still look designed, not empty */}
                  <svg className="w-1/2 h-1/2 text-nude/10" viewBox="0 0 40 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 46 C4 20, 20 4, 20 4 C20 4, 36 20, 36 46" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                </div>
              )}

              {/* Legibility gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black-off via-black-off/40 to-transparent" />

              {/* Name + category + services, bottom (results live inside the case study) */}
              <div className="absolute bottom-0 left-0 w-full p-4 md:p-5">
                <h3 className="text-2xl md:text-3xl font-serif italic text-nude leading-tight">{item.name}</h3>
                <p className="text-[10px] text-nude/60 tracking-widest uppercase font-sans mt-1">
                  <span className="mr-1.5 not-italic">{flagFor(item.category)}</span>{item.category}
                </p>
                {item.services && item.services.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {item.services.map((s, k) => (
                      <span
                        key={k}
                        className="text-[8px] tracking-[0.15em] uppercase font-sans px-2 py-0.5 rounded-full bg-nude/15 text-nude backdrop-blur-sm"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Opened folder modal */}
      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={() => setOpenIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0 bg-black-off/80 backdrop-blur-sm animate-[fadeIn_0.3s_ease]" />

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-3xl bg-nude text-black-off shadow-2xl animate-[folderOpen_0.45s_cubic-bezier(0.16,1,0.3,1)]"
          >
            {/* Close */}
            <button
              onClick={() => setOpenIndex(null)}
              data-cursor="hover"
              aria-label="Close"
              className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-black-off/5 hover:bg-burgundy hover:text-nude transition-colors flex items-center justify-center text-xl"
            >
              ×
            </button>

            <div className="p-8 md:p-12">
              <span className="text-[11px] text-burgundy tracking-[0.3em] uppercase font-sans font-medium">
                <span className="mr-1.5">{flagFor(active.category)}</span>{active.category}
              </span>
              <h3 className="text-4xl md:text-6xl font-serif italic text-black-off mt-3 mb-4">{active.name}</h3>
              {active.services && active.services.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {active.services.map((s, k) => (
                    <span
                      key={k}
                      className="text-[10px] tracking-[0.15em] uppercase font-sans px-3 py-1 rounded-full bg-burgundy text-nude"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-black-off/70 font-sans font-light leading-relaxed text-lg max-w-xl">
                {active.description}
              </p>

              {/* Stats */}
              {active.stats.length > 0 && (
                <div className="mt-10">
                  <p className="text-[11px] text-burgundy/60 tracking-[0.3em] uppercase font-sans mb-4">{labels.statsLabel}</p>
                  <div
                    className="grid gap-4"
                    style={{ gridTemplateColumns: `repeat(${Math.min(active.stats.length, 3)}, minmax(0, 1fr))` }}
                  >
                    {active.stats.map((s, j) => (
                      <div key={j} className="rounded-2xl bg-white/50 border border-burgundy/5 px-4 py-6 text-center">
                        <div className="text-3xl md:text-4xl font-serif text-burgundy">{s.value}</div>
                        <div className="text-[10px] md:text-xs text-black-off/50 tracking-widest uppercase font-sans mt-2">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Media gallery — only shown when the case actually has media */}
              {active.media.length > 0 && (
                <div className="mt-10">
                  <p className="text-[11px] text-burgundy/60 tracking-[0.3em] uppercase font-sans mb-4">{labels.galleryLabel}</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {active.media.map((m, j) =>
                      m.type === 'video' ? (
                        <video
                          key={j}
                          src={asset(m.src)}
                          poster={m.poster ? asset(m.poster) : undefined}
                          controls
                          playsInline
                          preload="none"
                          onError={hideOnError}
                          className="aspect-[3/4] w-full object-cover rounded-2xl bg-black-off/5"
                        />
                      ) : (
                        <img
                          key={j}
                          src={asset(m.src)}
                          alt={`${active.name} ${j + 1}`}
                          loading="lazy"
                          onError={hideOnError}
                          className="aspect-[3/4] w-full object-cover rounded-2xl bg-black-off/5"
                        />
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Visit link — only when the case has a public URL */}
              {active.url && (
                <a
                  href={active.url}
                  target="_blank"
                  rel="noopener"
                  data-cursor="hover"
                  className="inline-flex items-center gap-3 mt-10 px-7 py-4 rounded-full bg-black-off text-nude hover:bg-burgundy transition-colors font-sans text-sm tracking-[0.2em] uppercase"
                >
                  {labels.visit}
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
