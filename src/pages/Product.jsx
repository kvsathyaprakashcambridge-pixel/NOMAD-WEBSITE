import { useEffect, useRef, useState, useLayoutEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import ProductPrice from '../components/ProductPrice'

import arcImg from '../assets/replace arc.webp'
import vectorImg from '../assets/replace vector.webp'
import ridgeImg from '../assets/replace ridge.webp'
import obsidianImg from '../assets/nomad-x1-obsidian-uploaded.webp'
import armorImg from '../assets/x1-armor.webp'
import facetImg from '../assets/x1-facet.webp'
import layerImg from '../assets/x1-layer.webp'
import moduleImg from '../assets/x1-module.webp'
import rollImg from '../assets/x1-roll.webp'
import frontViewImg from '../assets/nomad-x1-front-view.webp'
import backViewImg from '../assets/nomad-x1-back-view.webp'
import interiorViewImg from '../assets/nomad-x1-interior-view.webp'

const BEST_SELLERS = [
  { index: '01 / CITY',  series: 'Minimal everyday carry',    name: 'NOMAD ARC',    colour: 'Sandstone', price: '₹3,999', img: arcImg,    alt: 'NOMAD ARC minimalist sandstone backpack',          cls: 'best-seller-card-arc' },
  { index: '02 / TECH',  series: 'Structured tech carry',     name: 'NOMAD VECTOR', colour: 'Midnight',  price: '₹5,499', img: vectorImg, alt: 'NOMAD VECTOR midnight blue technology backpack',     cls: 'best-seller-card-vector' },
  { index: '03 / TRAIL', series: 'Trail-ready utility',       name: 'NOMAD RIDGE',  colour: 'Moss',      price: '₹6,299', img: ridgeImg,  alt: 'NOMAD RIDGE moss green expedition backpack',         cls: 'best-seller-card-ridge' },
]

const X1_LINEUP = [
  { index: '01 / ORIGINAL', series: 'Original modular carry', name: 'NOMAD X1', colour: 'Obsidian Black', img: obsidianImg, alt: 'NOMAD X1 Original backpack in Obsidian Black', cls: 'best-seller-card-arc' },
  { index: '02 / ARMOR', series: 'Impact-shield carry', name: 'X1 ARMOR', colour: 'Obsidian Black', img: armorImg, alt: 'NOMAD X1 Armor hard-shell backpack in Obsidian Black', cls: 'best-seller-card-arc' },
  { index: '03 / FACET', series: 'Sculpted tech shell', name: 'X1 FACET', colour: 'Obsidian Black', img: facetImg, alt: 'NOMAD X1 Facet sculpted tech backpack in Obsidian Black', cls: 'best-seller-card-arc' },
  { index: '04 / LAYER', series: 'Multi-compartment carry', name: 'X1 LAYER', colour: 'Obsidian Black', img: layerImg, alt: 'NOMAD X1 Layer multi-compartment backpack in Obsidian Black', cls: 'best-seller-card-arc' },
  { index: '05 / MODULE', series: 'Expandable utility system', name: 'X1 MODULE', colour: 'Obsidian Black', img: moduleImg, alt: 'NOMAD X1 Module utility backpack in Obsidian Black', cls: 'best-seller-card-arc' },
  { index: '06 / ROLL', series: 'Flexible roll-top carry', name: 'X1 ROLL', colour: 'Obsidian Black', img: rollImg, alt: 'NOMAD X1 Roll flexible roll-top backpack in Obsidian Black', cls: 'best-seller-card-arc' },
]

function formatProductName(name) {
  if (name.startsWith('X1 ')) {
    return (
      <span className="x1-product-name">
        <span className="x1-plain-prefix">X1</span>
        <span className="x1-product-name-rest">{name.substring(2)}</span>
      </span>
    )
  }
  return <span className="x1-product-name"><span className="x1-product-name-rest">{name}</span></span>
}

export default function Product() {
  const navigate = useNavigate()

  // Horizontal Scroll Gallery State & Refs
  const sectionRef = useRef(null)
  const stickyViewportRef = useRef(null)
  const trackRef = useRef(null)
  const galleryViewportRef = useRef(null)

  const [scrollRange, setScrollRange] = useState(0)
  const [stickyHeight, setStickyHeight] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false)
  const lastActiveIndexRef = useRef(0)

  // Measure track for horizontal travel
  const updateMeasurements = () => {
    if (trackRef.current && galleryViewportRef.current && stickyViewportRef.current) {
      const trackWidth = trackRef.current.scrollWidth
      const galleryWidth = galleryViewportRef.current.clientWidth
      const travel = Math.max(0, trackWidth - galleryWidth)
      setScrollRange(travel)
      setStickyHeight(stickyViewportRef.current.clientHeight)
    }
    setIsDesktop(window.matchMedia('(min-width: 1100px)').matches)
    setShouldReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }

  useLayoutEffect(() => {
    updateMeasurements()
    window.requestAnimationFrame(updateMeasurements)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(updateMeasurements)
    }

    const observer = new ResizeObserver(() => {
      window.requestAnimationFrame(updateMeasurements)
    })
    
    if (trackRef.current) observer.observe(trackRef.current)
    if (galleryViewportRef.current) observer.observe(galleryViewportRef.current)
    if (stickyViewportRef.current) observer.observe(stickyViewportRef.current)
    
    const mediaQueryDesktop = window.matchMedia('(min-width: 1100px)')
    const handleDesktopChange = (e) => {
      setIsDesktop(e.matches)
      updateMeasurements()
    }
    mediaQueryDesktop.addEventListener('change', handleDesktopChange)

    const mediaQueryMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleMotionChange = (e) => {
      setShouldReduceMotion(e.matches)
      updateMeasurements()
    }
    mediaQueryMotion.addEventListener('change', handleMotionChange)

    return () => {
      observer.disconnect()
      mediaQueryDesktop.removeEventListener('change', handleDesktopChange)
      mediaQueryMotion.removeEventListener('change', handleMotionChange)
    }
  }, [])

  // Desktop sticky motion mapping
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  })

  const translateX = useTransform(scrollYProgress, [0, 1], [0, -scrollRange])

  // Desktop active index calculation
  useMotionValueEvent(translateX, "change", (latestX) => {
    if (!isDesktop || shouldReduceMotion || !trackRef.current || !galleryViewportRef.current) return
    
    const visibleViewportCenter = Math.abs(latestX) + galleryViewportRef.current.clientWidth / 2
    let closestIndex = 0
    let minDistance = Infinity
    
    const cards = trackRef.current.children
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i]
      const cardCenter = card.offsetLeft + card.offsetWidth / 2
      const distance = Math.abs(cardCenter - visibleViewportCenter)
      if (distance < minDistance) {
        minDistance = distance
        closestIndex = i
      }
    }
    
    closestIndex = Math.max(0, Math.min(5, closestIndex))
    if (closestIndex !== lastActiveIndexRef.current) {
      lastActiveIndexRef.current = closestIndex
      setActiveIndex(closestIndex)
    }
  })

  // Native scroll active index calculation (Tablet/Mobile)
  const handleNativeScroll = () => {
    if (isDesktop && !shouldReduceMotion) return 
    if (!galleryViewportRef.current || !trackRef.current) return

    window.requestAnimationFrame(() => {
      const scrollLeft = galleryViewportRef.current.scrollLeft
      const visibleViewportCenter = scrollLeft + galleryViewportRef.current.clientWidth / 2
      
      let closestIndex = 0
      let minDistance = Infinity
      
      const cards = trackRef.current.children
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i]
        const cardCenter = card.offsetLeft + card.offsetWidth / 2
        const distance = Math.abs(cardCenter - visibleViewportCenter)
        if (distance < minDistance) {
          minDistance = distance
          closestIndex = i
        }
      }
      
      closestIndex = Math.max(0, Math.min(5, closestIndex))
      if (closestIndex !== lastActiveIndexRef.current) {
        lastActiveIndexRef.current = closestIndex
        setActiveIndex(closestIndex)
      }
    })
  }

  const shouldUseStickyMotion = isDesktop && !shouldReduceMotion
  const desktopMotionStyle = shouldUseStickyMotion ? { x: translateX } : undefined
  const sectionHeight = shouldUseStickyMotion && scrollRange > 0 ? `${stickyHeight + scrollRange}px` : (shouldUseStickyMotion ? '100vh' : 'auto')
  const activeVariant = X1_LINEUP[activeIndex] || X1_LINEUP[0]

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
      }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <main>
      {/* ─── Best Sellers ─── */}
      <section className="section best-sellers product-catalog" style={{ paddingTop: 110, paddingBottom: '2rem' }} aria-labelledby="best-sellers-title">
        <div className="container">
          <header className="best-sellers-head">
            <div>
              <p className="eyebrow">NOMAD / Curated carry</p>
              <h1 id="best-sellers-title" className="best-sellers-logo-title">NOMAD</h1>
            </div>
            <p className="best-sellers-lede">Three distinct silhouettes. One standard of purposeful carry.</p>
          </header>

          <div className="best-sellers-grid" role="list" aria-label="NOMAD best-selling backpacks">
            {BEST_SELLERS.map(p => (
              <article 
                key={p.name} 
                className={`best-seller-card ${p.cls} reveal`} 
                role="listitem"
                onClick={() => navigate(`/features#nomad-${p.name.split(' ')[1].toLowerCase()}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="best-seller-visual">
                  <span className="best-seller-index">{p.index}</span>
                  <span className="best-seller-watermark" aria-hidden="true">NOMAD</span>
                  <img src={p.img} alt={p.alt} />
                </div>
                <div className="best-seller-info">
                  <div>
                    <span className="best-seller-series">{p.series}</span>
                    <h2>{p.name}</h2>
                    <span className="best-seller-colour">{p.colour}</span>
                  </div>
                  <div className="best-seller-buy">
                    <strong><ProductPrice priceString={p.price} /></strong>
                    <Link to="/contact?type=Purchase%20enquiry" aria-label={`Enquire about ${p.name}`}>+</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── X1 Lineup ─── */}
      <section ref={sectionRef} className={`section x1-lineup ${shouldUseStickyMotion ? 'is-desktop' : ''}`} style={shouldUseStickyMotion ? { height: sectionHeight, paddingTop: 0, paddingBottom: 0 } : {}} aria-labelledby="x1-lineup-title">
        <div ref={stickyViewportRef} className="x1-sticky-viewport">
          <div className="x1-scroll-layout">
            <aside className="x1-scroll-editorial">
              <header className="best-sellers-head">
                <div>
                  <p className="eyebrow">NOMAD / Curated carry</p>
                  <h2 className="x1-scroll-title">
                    <span>BUILT FOR</span>
                    <span>DIFFERENT</span>
                    <span>ROUTES.</span>
                  </h2>
                </div>
                <p className="best-sellers-lede">Six distinct silhouettes. One standard of purposeful carry.</p>
              </header>
              <div className="x1-scroll-progress-ui">
                <div className="x1-scroll-counter">
                  <span>0{activeIndex + 1}</span> / 06
                </div>
                <div className="x1-scroll-active-name">{formatProductName(activeVariant.name)}</div>
                <div className="x1-scroll-progress-track">
                  <motion.div 
                    className="x1-scroll-progress-fill" 
                    style={shouldUseStickyMotion ? { scaleX: scrollYProgress, transformOrigin: 'left' } : { scaleX: (activeIndex + 1) / 6, transformOrigin: 'left', transition: 'transform 0.3s ease' }} 
                  />
                </div>
              </div>
            </aside>

            <div
              ref={galleryViewportRef}
              className="x1-gallery-viewport"
              onScroll={handleNativeScroll}
            >
              <motion.div
                ref={trackRef}
                className="x1-horizontal-track"
                style={desktopMotionStyle}
              >
                {X1_LINEUP.map((p, i) => (
                  <article key={p.name} className={`best-seller-card x1-lineup-card ${p.cls} ${i === activeIndex ? 'is-active' : ''} reveal`} role="listitem">
                    <div className="best-seller-visual">
                      <span className="best-seller-index">{p.index}</span>
                      <span className="best-seller-watermark" aria-hidden="true">NOMAD</span>
                      <img src={p.img} alt={p.alt} loading={i === 0 ? "eager" : "lazy"} decoding="async" />
                    </div>
                    <div className="best-seller-info">
                      <div>
                        <span className="best-seller-series">{p.series}</span>
                        <h3><span className="x1-normal">{formatProductName(p.name)}</span></h3>
                        <span className="best-seller-colour">{p.colour}</span>
                      </div>
                      <div className="best-seller-buy">
                        <span className="x1-lineup-action-label">Explore</span>
                        <Link to="/contact?type=Product%20question" aria-label={`Explore ${p.name}`}>+</Link>
                      </div>
                    </div>
                  </article>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Gallery (dark) ─── */}
      <section className="section section-dark">
        <div className="container">
          <p className="eyebrow">Product gallery</p>
          <h2>Inside the system.</h2>
          <div className="visual-grid">
            {[
              { label: 'Exterior silhouette', img: obsidianImg },
              { label: 'Interior organisation', img: interiorViewImg },
              { label: 'Laptop compartment', img: frontViewImg },
              { label: 'Hidden rear pocket', img: backViewImg },
              { label: 'Expansion & support', img: obsidianImg },
            ].map(({ label, img }) => (
              <div
                key={label}
                className="visual"
                data-label={label}
                style={{ backgroundImage: `url(${img})` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── What's included ─── */}
      <section className="section">
        <div className="container">
          <p className="eyebrow">What is included</p>
          <h2>A complete everyday system.</h2>
          <div className="cards-4">
            {['NOMAD X1 backpack', 'Detachable organiser', 'Cable pouch', 'Rain cover + product guide'].map(item => (
              <article key={item} className="card"><h3>{item}</h3></article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Who it's for ─── */}
      <section className="section section-soft">
        <div className="container">
          <p className="eyebrow">Who it is for</p>
          <div className="profiles cards-4">
            {[
              { title: 'Students', desc: 'Separates laptops, books and chargers without adding bulk.' },
              { title: 'Professionals', desc: 'Keeps documents and technology organised through the commute.' },
              { title: 'Creators', desc: 'Reconfigures around compact cameras, audio gear and cables.' },
              { title: 'Short-distance travellers', desc: 'Expands for clothing and essentials on one-to-two-day trips.' },
            ].map(({ title, desc }) => (
              <article key={title} className="card">
                <h3>{title}</h3>
                <p className="light-copy">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section cta">
        <div className="container">
          <div>
            <h2>Make NOMAD <span className="x1-normal">X1</span> part of your everyday movement.</h2>
          </div>
          <div className="actions">
            <Link className="btn" to="/contact?type=Purchase%20enquiry">Submit Purchase Enquiry</Link>
            <Link className="btn btn-dark" to="/contact?type=Product%20question">Ask a Product Question</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
