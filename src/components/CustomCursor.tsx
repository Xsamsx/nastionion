import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const outlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) return
    if (window.matchMedia("(pointer: coarse)").matches) return

    const dot = dotRef.current
    const outline = outlineRef.current
    if (!dot || !outline) return

    let mouseX = -100
    let mouseY = -100
    let dotX = -100
    let dotY = -100
    let outlineX = -100
    let outlineY = -100

    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const onMouseLeave = () => {
      dot.style.opacity = '0'
      outline.style.opacity = '0'
    }

    const onMouseEnter = () => {
      dot.style.opacity = '1'
      outline.style.opacity = '1'
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    let animationId: number

    const animate = () => {
      dotX = lerp(dotX, mouseX, 0.6)
      dotY = lerp(dotY, mouseY, 0.6)
      outlineX = lerp(outlineX, mouseX, 0.25)
      outlineY = lerp(outlineY, mouseY, 0.25)

      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`
      outline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0)`

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const interactables = document.querySelectorAll('a, button, [data-cursor="hover"]')

    const onEnter = () => {
      outline.classList.add('cursor-hover')
      dot.style.opacity = '0'
    }

    const onLeave = () => {
      outline.classList.remove('cursor-hover')
      dot.style.opacity = '1'
    }

    interactables.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      cancelAnimationFrame(animationId)
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" style={{ opacity: 0 }} />
      <div ref={outlineRef} className="cursor-outline hidden md:block" style={{ opacity: 0 }} />
    </>
  )
}
