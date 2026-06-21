import { useEffect, useState } from 'react'

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [isExit, setIsExit] = useState(false)

  useEffect(() => {
    // Simulate loading progress
    const duration = 2000 // 2 seconds
    const interval = 20
    const step = 100 / (duration / interval)

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + step
      })
    }, interval)

    const timeout = setTimeout(() => {
      setIsExit(true)
      setTimeout(onComplete, 800) // Wait for exit animation
    }, duration + 500)

    return () => {
      clearInterval(timer)
      clearTimeout(timeout)
    }
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
