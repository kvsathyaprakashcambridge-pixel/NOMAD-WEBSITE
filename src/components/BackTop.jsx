import { useState, useEffect } from 'react'

export default function BackTop() {
  const [show, setShow] = useState(false)
  const [isOverDark, setIsOverDark] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 600)
      
      const darkSection = document.querySelector('.config-system-wrapper');
      if (darkSection) {
        const rect = darkSection.getBoundingClientRect();
        const buttonY = window.innerHeight - 47; 
        setIsOverDark(rect.top <= buttonY && rect.bottom >= buttonY);
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      className={`back-top${show ? ' show' : ''}${isOverDark ? ' over-dark' : ''}`}
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      ↑
    </button>
  )
}
