import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
  useMemo,
} from 'react'
import { gsap } from 'gsap'

const NOMAD_WORDS = ['NOMAD', 'SYSTEM', 'DESIGN', 'EXPLORE', 'MOVE']

/**
 * WordLoader
 *
 * Exposes { enter(), exit() } via ref — both return Promises.
 *
 * variant="full"  — full-viewport dark screen, full word cycle (page transitions)
 * variant="light" — subtle semi-transparent overlay, 1 word, faster (local transitions)
 */
const WordLoader = forwardRef(function WordLoader(
  { words = NOMAD_WORDS, variant = 'full', className = '' },
  ref
) {
  const containerRef = useRef(null)
  const wordElRef = useRef(null)
  const tlRef = useRef(null)
  const prefersReduced = useRef(
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  // Split a word string into individual character spans
  const splitChars = (word) =>
    word.split('').map((ch, i) => (
      <span key={i} className="wl-char" style={{ display: 'inline-block' }}>
        {ch === ' ' ? '\u00A0' : ch}
      </span>
    ))

  const wordList = useMemo(() => (variant === 'light' ? [words[0]] : words), [words, variant])

  // Expose imperative API
  useImperativeHandle(ref, () => ({
    enter() {
      return new Promise((resolve) => {
        if (!containerRef.current) { resolve(); return }

        // Kill any running timeline
        if (tlRef.current) { tlRef.current.kill(); tlRef.current = null }

        gsap.set(containerRef.current, { autoAlpha: 0, scale: 1 })

        if (prefersReduced.current) {
          gsap.to(containerRef.current, {
            autoAlpha: 1, duration: 0.15, ease: 'none',
            onComplete: resolve,
          })
          return
        }

        const tl = gsap.timeline({ onComplete: resolve })
        tlRef.current = tl

        // Fade container in
        tl.to(containerRef.current, {
          autoAlpha: 1, duration: variant === 'light' ? 0.07 : 0.09, ease: 'power2.out',
        })

        // Cycle through each word
        wordList.forEach((word, wi) => {
          const chars = containerRef.current.querySelectorAll(
            `.wl-word[data-index="${wi}"] .wl-char`
          )
          const hold = variant === 'light' ? 0.05 : 0.08
          const staggerAmt = variant === 'light' ? 0.012 : 0.018
          const dur = variant === 'light' ? 0.08 : 0.13

          // Show word el
          tl.set(`.wl-word[data-index="${wi}"]`, { autoAlpha: 1 }, '>')

          // Characters enter
          tl.fromTo(
            chars,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: dur, ease: 'power2.out', stagger: staggerAmt },
            '<'
          )

          // Hold
          tl.to({}, { duration: hold })

          // Characters exit (not on last word — the container exit handles it)
          if (wi < wordList.length - 1) {
            tl.to(chars, {
              opacity: 0, y: -4, duration: dur * 0.7, ease: 'power2.in', stagger: staggerAmt * 0.4,
            })
            tl.set(`.wl-word[data-index="${wi}"]`, { autoAlpha: 0 }, '>')
          }
        })

      })
    },

    exit() {
      return new Promise((resolve) => {
        if (!containerRef.current) { resolve(); return }

        if (prefersReduced.current) {
          gsap.to(containerRef.current, {
            autoAlpha: 0, duration: 0.15, ease: 'none',
            onComplete: resolve,
          })
          return
        }

        // Kill cycling timeline (entrance already resolved; this just kills any lingering tween)
        if (tlRef.current) { tlRef.current.kill(); tlRef.current = null }

        gsap.to(containerRef.current, {
          autoAlpha: 0,
          scale: 1.012,
          duration: variant === 'light' ? 0.14 : 0.22,
          ease: 'power2.inOut',
          onComplete: resolve,
        })
      })
    },
  }))

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (tlRef.current) { tlRef.current.kill(); tlRef.current = null }
      if (containerRef.current) gsap.killTweensOf(containerRef.current)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`word-loader word-loader--${variant} ${className}`}
      style={{ visibility: 'hidden', opacity: 0 }}
      aria-hidden="true"
      aria-live="off"
    >
      <div ref={wordElRef} className="wl-stage">
        {wordList.map((word, wi) => (
          <p
            key={wi}
            className="wl-word"
            data-index={wi}
            style={{ visibility: 'hidden', position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {splitChars(word)}
          </p>
        ))}
      </div>
    </div>
  )
})

export default WordLoader
