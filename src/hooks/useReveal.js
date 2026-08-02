import { useEffect, useRef } from 'react'

export default function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          io.unobserve(entry.target)
        }
      },
      { threshold: 0.12 }
    )
    const targets = el.querySelectorAll ? el.querySelectorAll('.reveal') : []
    targets.forEach(t => io.observe(t))
    // also observe the element itself if it has reveal
    if (el.classList.contains('reveal')) io.observe(el)
    return () => io.disconnect()
  }, [])

  return ref
}
