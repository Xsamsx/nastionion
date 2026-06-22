import { useEffect, useRef, useState } from 'react'
import { asset, bestVideo } from '../lib/asset'

/**
 * A vertical reel that autoplays muted + looping only while it's in view, and
 * pauses when it scrolls away — so a wall of reels never hammers the browser.
 * Falls back to its poster, and hides itself if the media isn't there yet.
 */
export function AutoReel({
  src,
  poster,
  className = '',
}: {
  src: string
  poster?: string
  className?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [broken, setBroken] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (broken) return null

  return (
    <video
      ref={ref}
      src={bestVideo(src)}
      poster={poster ? asset(poster) : undefined}
      muted
      loop
      playsInline
      preload="none"
      onError={() => setBroken(true)}
      className={`w-full aspect-[9/16] object-cover bg-black-off/20 ${className}`}
    />
  )
}
