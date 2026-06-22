import { useEffect, useState } from 'react'

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [isExit, setIsExit] = useState(false)

  useEffect(() => {
    // Dismiss as soon as the page is actually paint-ready (fonts loaded),
    // keeping a brief brand flash and a hard cap so it never hangs. This
    // replaces the old fixed ~2.3s fake timer.
    const MIN = 400  // minimum brand flash so it doesn't blink awkwardly
    const CAP = 1500 // never block longer than this, even if fonts stall
    const start = performance.now()

    let ready = false
    const fontsReady = (document as Document & { fonts?: FontFaceSet }).fonts?.ready
    if (fontsReady) {
      fontsReady.then(() => { ready = true })
    } else {
      ready = true
    }

    let raf = 0
    const tick = (now: number) => {
      const elapsed = now - start
      setProgress(Math.min(100, (elapsed / CAP) * 100))
      if ((ready && elapsed >= MIN) || elapsed >= CAP) {
        setProgress(100)
        setIsExit(true)
        setTimeout(onComplete, 700) // matches the exit transition (duration-700)
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(raf)
  }, [onComplete])

  return (
    <div className={`fixed inset-0 z-[9999] bg-[#1B1B1B] flex items-center justify-center transition-transform duration-700 ease-in-out ${isExit ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="flex flex-col items-center gap-12 max-w-xs w-full px-6">
        {/* Branded Arch Logo */}
        <div className="w-16 h-20 text-rose-smoke animate-pulse">
          <svg className="w-full h-full" viewBox="0 0 40 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 46 C4 20, 20 4, 20 4 C20 4, 36 20, 36 46" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          </svg>
        </div>

        {/* Progress Container */}
        <div className="w-full flex flex-col gap-4">
          <div className="flex justify-between items-end font-serif italic text-nude/60 text-sm">
            <span className="tracking-widest uppercase text-[10px] not-italic font-sans">Initializing Experience</span>
            <span>{Math.round(progress)}%</span>
          </div>
          
          <div className="w-full h-[1px] bg-nude/10 relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-rose-smoke transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Brand Name */}
        <div className="overflow-hidden">
          <span className="block text-nude font-serif italic text-2xl tracking-tighter animate-fade-up">nastion</span>
        </div>
      </div>
    </div>
  )
}
