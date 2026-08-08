import { useEffect, useRef, useState, useLayoutEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import ProductPrice from '../components/ProductPrice'
import { useCart } from '../context/CartContext'

import arcImg from '../assets/replace arc.webp'
import vectorImg from '../assets/replace vector.webp'
import ridgeImg from '../assets/replace ridge.webp'
import obsidianImg from '../assets/nomad-x1-obsidian-uploaded.webp'

function flyToManifest(sourceEl, targetEl, onComplete) {
  const start = sourceEl.getBoundingClientRect();
  const end = targetEl.getBoundingClientRect();
  const clone = document.createElement('div');
  clone.className = 'fly-clone';
  Object.assign(clone.style, {
    position: 'fixed', 
    left: (start.left + start.width/2 - 12) + 'px', 
    top: (start.top + start.height/2 - 12) + 'px',
    width: '24px', height: '24px',
    background: '#E26D3F', borderRadius: '50%',
    transition: 'all 0.9s cubic-bezier(0.22,1,0.36,1)', zIndex: 999,
    pointerEvents: 'none'
  });
  document.body.appendChild(clone);
  requestAnimationFrame(() => {
    Object.assign(clone.style, {
      left: (end.left + end.width/2 - 12) + 'px',
      top: (end.top + end.height/2 - 12) + 'px',
      opacity: '0.15', transform: 'scale(0.5)'
    });
  });
  setTimeout(() => {
    clone.remove();
    if (onComplete) onComplete();
  }, 900);
}
import armorImg from '../assets/x1-armor.webp'
import facetImg from '../assets/x1-facet.webp'
import layerImg from '../assets/x1-layer.webp'
import moduleImg from '../assets/x1-module.webp'
import rollImg from '../assets/x1-roll.webp'
import frontViewImg from '../assets/nomad-x1-front-view.webp'
import backViewImg from '../assets/nomad-x1-back-view.webp'
import interiorViewImg from '../assets/nomad-x1-interior-view.webp'

// Gallery — original PNGs preserved in assets/ (not bundled; WebP variants used)

// Gallery — optimised WebP variants
import galleryExterior480 from '../assets/nomad-x1-gallery-01-exterior-480.webp'
import galleryExterior800 from '../assets/nomad-x1-gallery-01-exterior-800.webp'
import galleryExterior1200 from '../assets/nomad-x1-gallery-01-exterior-1200.webp'
import galleryInterior480 from '../assets/nomad-x1-gallery-02-interior-480.webp'
import galleryInterior800 from '../assets/nomad-x1-gallery-02-interior-800.webp'
import galleryInterior1200 from '../assets/nomad-x1-gallery-02-interior-1200.webp'
import galleryLaptop480 from '../assets/nomad-x1-gallery-03-laptop-480.webp'
import galleryLaptop800 from '../assets/nomad-x1-gallery-03-laptop-800.webp'
import galleryLaptop1200 from '../assets/nomad-x1-gallery-03-laptop-1200.webp'
import galleryRear480 from '../assets/nomad-x1-gallery-04-rear-support-480.webp'
import galleryRear800 from '../assets/nomad-x1-gallery-04-rear-support-800.webp'
import galleryRear1200 from '../assets/nomad-x1-gallery-04-rear-support-1200.webp'
import galleryExpansion480 from '../assets/nomad-x1-gallery-05-expansion-480.webp'
import galleryExpansion800 from '../assets/nomad-x1-gallery-05-expansion-800.webp'
import galleryExpansion1200 from '../assets/nomad-x1-gallery-05-expansion-1200.webp'

const BEST_SELLERS = [
  { index: '01 / CITY',  series: 'Minimal everyday carry',    name: 'NOMAD ARC',    colour: 'Sandstone', price: 3999, img: arcImg,    alt: 'NOMAD ARC minimalist sandstone backpack',          cls: 'best-seller-card-arc' },
  { index: '02 / TECH',  series: 'Structured tech carry',     name: 'NOMAD VECTOR', colour: 'Midnight',  price: 5499, img: vectorImg, alt: 'NOMAD VECTOR midnight blue technology backpack',     cls: 'best-seller-card-vector' },
  { index: '03 / TRAIL', series: 'Trail-ready utility',       name: 'NOMAD RIDGE',  colour: 'Moss',      price: 6299, img: ridgeImg,  alt: 'NOMAD RIDGE moss green expedition backpack',         cls: 'best-seller-card-ridge' },
]

const X1_LINEUP = [
  { index: '01 / ORIGINAL', series: 'Original modular carry',       name: 'NOMAD X1',   colour: 'Obsidian Black', price: 8999,  img: obsidianImg, alt: 'NOMAD X1 Original backpack in Obsidian Black',        cls: 'best-seller-card-arc' },
  { index: '02 / ARMOR',    series: 'Impact-shield carry',          name: 'X1 ARMOR',   colour: 'Obsidian Black', price: 11499, img: armorImg,    alt: 'NOMAD X1 Armor hard-shell backpack in Obsidian Black', cls: 'best-seller-card-arc' },
  { index: '03 / FACET',    series: 'Sculpted tech shell',          name: 'X1 FACET',   colour: 'Obsidian Black', price: 10299, img: facetImg,    alt: 'NOMAD X1 Facet sculpted tech backpack in Obsidian Black', cls: 'best-seller-card-arc' },
  { index: '04 / LAYER',    series: 'Multi-compartment carry',      name: 'X1 LAYER',   colour: 'Obsidian Black', price: 9499,  img: layerImg,    alt: 'NOMAD X1 Layer multi-compartment backpack in Obsidian Black', cls: 'best-seller-card-arc' },
  { index: '05 / MODULE',   series: 'Expandable utility system',    name: 'X1 MODULE',  colour: 'Obsidian Black', price: 12999, img: moduleImg,   alt: 'NOMAD X1 Module utility backpack in Obsidian Black',   cls: 'best-seller-card-arc' },
  { index: '06 / ROLL',     series: 'Flexible roll-top carry',      name: 'X1 ROLL',    colour: 'Obsidian Black', price: 9999,  img: rollImg,     alt: 'NOMAD X1 Roll flexible roll-top backpack in Obsidian Black', cls: 'best-seller-card-arc' },
]

const ROUTINES = [
  {
    id: 'study',
    number: '01',
    title: 'STUDY',
    desc: 'Laptop, books, chargers and everyday campus essentials organised in one adaptable carry system.',
    tags: ['LAPTOP', 'BOOKS', 'CABLES', 'DAILY ESSENTIALS']
  },
  {
    id: 'work',
    number: '02',
    title: 'WORK',
    desc: 'Technology, documents and organised everyday carry for changing professional routines.',
    tags: ['TECHNOLOGY', 'DOCUMENTS', 'CHARGERS', 'QUICK ACCESS']
  },
  {
    id: 'create',
    number: '03',
    title: 'CREATE',
    desc: 'Camera equipment, accessories, cables and creative tools arranged for controlled access.',
    tags: ['CAMERA', 'ACCESSORIES', 'CABLES', 'CREATIVE TOOLS']
  },
  {
    id: 'short-trip',
    number: '04',
    title: 'SHORT TRIP',
    desc: 'Clothing, technology and essential items organised for a brief journey.',
    tags: ['CLOTHING', 'TECHNOLOGY', 'TOILETRIES', 'TRAVEL ESSENTIALS']
  }
]

const SYSTEM_GALLERY = [
  {
    id: 'exterior',
    number: '01',
    shortTitle: 'EXTERIOR',
    title: 'EXTERIOR SILHOUETTE',
    description: 'Structured everyday form with protected front access.',
    selectorCaption: 'Form and front access',
    detailHeading: 'STRUCTURED FOR EVERYDAY MOVEMENT',
    detailBody:
      'The exterior view highlights the X1’s controlled silhouette, protected front-access area and balanced everyday profile.',
    highlights: [
      'Structured upright form',
      'Protected front access',
      'Balanced carry profile',
    ],
    image: galleryExterior1200,
    srcSet: `${galleryExterior480} 480w, ${galleryExterior800} 800w, ${galleryExterior1200} 1200w`,
    alt: 'NOMAD X1 exterior silhouette',
  },
  {
    id: 'interior',
    number: '02',
    shortTitle: 'INTERIOR',
    title: 'INTERIOR ORGANISATION',
    description: 'Divided storage for technology, accessories and daily essentials.',
    selectorCaption: 'Divided storage layout',
    detailHeading: 'ORGANISATION WITHOUT THE CLUTTER',
    detailBody:
      'The open interior reveals how the main space is divided between larger essentials, technology accessories and smaller daily items.',
    highlights: [
      'Separated storage zones',
      'Accessible organiser areas',
      'Clearer everyday packing',
    ],
    image: galleryInterior1200,
    srcSet: `${galleryInterior480} 480w, ${galleryInterior800} 800w, ${galleryInterior1200} 1200w`,
    alt: 'NOMAD X1 interior organisation',
  },
  {
    id: 'laptop',
    number: '03',
    shortTitle: 'LAPTOP',
    title: 'LAPTOP COMPARTMENT',
    description: 'Protected storage designed around the dedicated laptop compartment.',
    selectorCaption: 'Protected technology storage',
    detailHeading: 'PROTECTION CLOSE TO THE BODY',
    detailBody:
      'The laptop view shows a dedicated technology area positioned close to the rear panel and separated from the main storage space.',
    highlights: [
      'Dedicated laptop area',
      'Close-to-body placement',
      'Separated from main storage',
    ],
    image: galleryLaptop1200,
    srcSet: `${galleryLaptop480} 480w, ${galleryLaptop800} 800w, ${galleryLaptop1200} 1200w`,
    alt: 'NOMAD X1 laptop compartment',
  },
  {
    id: 'rear',
    number: '04',
    shortTitle: 'REAR SUPPORT',
    title: 'REAR SUPPORT',
    description: 'Padded body-side support with discreet storage for smaller valuables.',
    selectorCaption: 'Padding and secure storage',
    detailHeading: 'BUILT AROUND CARRY COMFORT',
    detailBody:
      'The rear view focuses on the padded back structure, shoulder-strap geometry and discreet body-side storage area.',
    highlights: [
      'Padded rear structure',
      'Contoured shoulder straps',
      'Discreet body-side access',
    ],
    image: galleryRear1200,
    srcSet: `${galleryRear480} 480w, ${galleryRear800} 800w, ${galleryRear1200} 1200w`,
    alt: 'NOMAD X1 padded rear support',
  },
  {
    id: 'expansion',
    number: '05',
    shortTitle: 'EXPANSION',
    title: 'EXPANSION AND SUPPORT',
    description: 'Expandable capacity supported by a structured side profile.',
    selectorCaption: 'Additional carrying depth',
    detailHeading: 'MORE SPACE WHEN THE DAY CHANGES',
    detailBody:
      'The expanded side profile reveals the increase in carrying depth while retaining the structured shape of the system.',
    highlights: [
      'Expandable carrying depth',
      'Structured side profile',
      'Adaptable daily capacity',
    ],
    image: galleryExpansion1200,
    srcSet: `${galleryExpansion480} 480w, ${galleryExpansion800} 800w, ${galleryExpansion1200} 1200w`,
    alt: 'NOMAD X1 expanded side profile',
  },
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
  const { dispatch } = useCart()

  // Horizontal Scroll Gallery State & Refs
  const sectionRef = useRef(null)
  const stickyViewportRef = useRef(null)
  const trackRef = useRef(null)
  const galleryViewportRef = useRef(null)

  const [scrollRange, setScrollRange] = useState(0)
  const [stickyHeight, setStickyHeight] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false)
  const lastActiveIndexRef = useRef(0)
  const [selectedRoutineIndex, setSelectedRoutineIndex] = useState(0)
  const [activeGalleryItem, setActiveGalleryItem] = useState('exterior')
  const [galleryVisible, setGalleryVisible] = useState(false)
  const galleryRef = useRef(null)
  const preloadedUrls = useRef(new Set())

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
    setIsTablet(window.matchMedia('(min-width: 768px) and (max-width: 1099px)').matches)
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

    const mediaQueryTablet = window.matchMedia('(min-width: 768px) and (max-width: 1099px)')
    const handleTabletChange = (e) => {
      setIsTablet(e.matches)
      updateMeasurements()
    }
    mediaQueryTablet.addEventListener('change', handleTabletChange)

    const mediaQueryMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleMotionChange = (e) => {
      setShouldReduceMotion(e.matches)
      updateMeasurements()
    }
    mediaQueryMotion.addEventListener('change', handleMotionChange)

    return () => {
      observer.disconnect()
      mediaQueryDesktop.removeEventListener('change', handleDesktopChange)
      mediaQueryTablet.removeEventListener('change', handleTabletChange)
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
      <section className="section best-sellers product-catalog" aria-labelledby="best-sellers-title">
        <div className="container">
          <header className="product-page-section-head best-sellers-custom-head">
            <div>
              <p className="eyebrow">NOMAD / CURATED CARRY</p>
              <h2 id="best-sellers-title" className="product-editorial-title">
                <span>THREE ROUTES.</span>
                <span>THREE DISTINCT</span>
                <span>CARRY SYSTEMS.</span>
              </h2>
            </div>
            <p className="product-editorial-lede best-sellers-custom-lede">
              From restrained city carry to structured technology organisation and trail-ready utility, each profile is built around a different routine.
            </p>
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
                  <img src={p.img} alt={p.alt} loading="lazy" decoding="async" />
                </div>
                <div className="best-seller-info">
                  <div>
                    <span className="best-seller-series">{p.series}</span>
                    <h2>{p.name}</h2>
                    <span className="best-seller-colour">{p.colour}</span>
                  </div>
                  <div className="best-seller-buy" style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                    <strong><ProductPrice priceString={p.price} /></strong>
                    <button 
                      aria-label={`Add to Manifest for ${p.name}`}
                      onClick={(e) => {
                        e.preventDefault()
                        dispatch({ type: 'ADD_ITEM', payload: { id: p.name, name: p.name, variant: p.colour, price: p.price, img: p.img } })
                        const btn = e.currentTarget
                        const nav = document.getElementById('manifest-nav-icon')
                        if (nav) flyToManifest(btn, nav, () => dispatch({ type: 'TOGGLE_PANEL', payload: true }))
                      }}
                    >
                      +
                    </button>
                    <Link to="/contact?type=Purchase%20enquiry" aria-label={`Enquire about ${p.name}`} style={{ fontSize: '12px', textDecoration: 'underline', color: 'rgba(17, 19, 18, 0.6)' }}>
                      Product enquiry
                    </Link>
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
              <header className="product-page-section-head" style={{ display: 'block', margin: 0, paddingBottom: '30px' }}>
                <div>
                  <p className="eyebrow">NOMAD <span className="x1-plain-prefix">X1</span> / DESIGN SERIES</p>
                  <h2 className="x1-scroll-title">
                    <span>ONE SYSTEM.</span>
                    <span>SIX DISTINCT</span>
                    <span>EXPRESSIONS.</span>
                  </h2>
                </div>
                <p className="product-editorial-lede" style={{ marginTop: '24px' }}>Six interpretations of the <span className="x1-plain-prefix">X1</span> platform, each shaped around a different visual and functional character.</p>
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
                      <div className="best-seller-buy" style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                        <strong><ProductPrice priceString={p.price} /></strong>
                        <button 
                          aria-label={`Add to Manifest for ${p.name}`}
                          onClick={(e) => {
                            e.preventDefault()
                            dispatch({ type: 'ADD_ITEM', payload: { id: p.name, name: p.name, variant: p.colour, price: p.price, img: p.img } })
                            const btn = e.currentTarget
                            const nav = document.getElementById('manifest-nav-icon')
                            if (nav) flyToManifest(btn, nav, () => dispatch({ type: 'TOGGLE_PANEL', payload: true }))
                          }}
                        >
                          +
                        </button>
                        <Link to="/contact?type=Product%20question" aria-label={`Explore ${p.name}`} style={{ fontSize: '12px', textDecoration: 'underline', color: 'rgba(17, 19, 18, 0.6)' }}>
                          Product enquiry
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* ─── X1 Interactive Gallery ─── */}
      <section className="section section-dark x1-system-gallery">
        <div className="x1-system-gallery__inner">

          <div className="x1-system-gallery__header">
            <div>
              <span className="eyebrow">
                PRODUCT GALLERY
              </span>

              <h2>
                ENGINEERED FROM WITHIN.
              </h2>
            </div>

            <p>
              Five focused views reveal how X1 handles access,
              organisation, protection and expansion.
            </p>
          </div>

          <div className="x1-system-viewer">

            <div className="x1-system-viewer__media">
              <AnimatePresence mode="wait" initial={false}>
                {(() => {
                  const activeSystemItem =
                    SYSTEM_GALLERY.find(
                      (item) => item.id === activeGalleryItem
                    ) ?? SYSTEM_GALLERY[0]
                  
                  return (
                    <motion.img
                      key={activeSystemItem.id}
                      src={activeSystemItem.image}
                      srcSet={activeSystemItem.srcSet}
                      sizes="(max-width: 767px) 90vw, (max-width: 1099px) min(560px, 100%), 45vw"
                      alt={activeSystemItem.alt}
                      className="x1-system-viewer__image"
                      width={1200}
                      height={1490}
                      loading="lazy"
                      decoding="async"
                      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.99 }}
                      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.985 }}
                      transition={{ 
                        duration: shouldReduceMotion ? 0.15 : 0.24, 
                        ease: shouldReduceMotion ? 'linear' : [0.22, 1, 0.36, 1] 
                      }}
                      onPointerEnter={() => preloadGalleryUrl(activeSystemItem.image)}
                    />
                  )
                })()}
              </AnimatePresence>

              {(() => {
                const activeSystemItem =
                  SYSTEM_GALLERY.find(
                    (item) => item.id === activeGalleryItem
                  ) ?? SYSTEM_GALLERY[0]
                return (
                  <div className="x1-system-viewer__info">
                    <span>
                      {activeSystemItem.number} / 05
                    </span>

                    <h3>
                      {activeSystemItem.title}
                    </h3>

                    <p>
                      {activeSystemItem.description}
                    </p>
                  </div>
                )
              })()}
            </div>

            <div className="x1-system-viewer__index">
              <div
                className="x1-system-viewer__selectors"
                aria-label="NOMAD X1 product views"
              >
                {SYSTEM_GALLERY.map((item) => {
                  const isActive = activeGalleryItem === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`x1-system-viewer__selector ${isActive ? 'is-active' : ''}`}
                      aria-pressed={isActive}
                      onClick={() => setActiveGalleryItem(item.id)}
                      onPointerEnter={() => preloadGalleryUrl(item.image)}
                      onFocus={() => preloadGalleryUrl(item.image)}
                    >
                      <span className="x1-system-viewer__selector-number">
                        {item.number}
                      </span>
                      <span className="x1-system-viewer__selector-copy">
                        <strong>{item.title}</strong>
                        <span className="x1-system-viewer__selector-caption">
                          {item.selectorCaption}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>

              {(() => {
                const activeSystemItem =
                  SYSTEM_GALLERY.find((item) => item.id === activeGalleryItem) ?? SYSTEM_GALLERY[0]
                return (
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={activeSystemItem.id}
                      className="x1-system-viewer__breakdown"
                      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                      transition={
                        shouldReduceMotion
                          ? { duration: 0.12 }
                          : { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
                      }
                    >
                      <span className="x1-system-viewer__breakdown-label">VIEW BREAKDOWN</span>
                      <h3>{activeSystemItem.detailHeading}</h3>
                      <p>{activeSystemItem.detailBody}</p>
                      <ul>
                        {activeSystemItem.highlights.map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                      </ul>
                    </motion.div>
                  </AnimatePresence>
                )
              })()}
            </div>

          </div>
        </div>
      </section>

      {/* ─── X1 Loadout Ledger ─── */}
      <section className="section x1-loadout-ledger">
        <div className="container">
          <header className="loadout-intro">
            <p className="eyebrow">NOMAD X1 / LOADOUT LEDGER</p>
            <h2 className="loadout-title">
              ONE SYSTEM. BUILT AROUND YOUR ROUTINE.
            </h2>
            <p className="loadout-desc">
              From focused study sessions to complex creative assignments, 
              the X1 adapts its internal architecture to protect and organise 
              the tools your day demands.
            </p>
          </header>

          <div className="loadout-interactive reveal">
            <div className="loadout-routine-index">
              {ROUTINES.map((routine, index) => {
                const isActive = selectedRoutineIndex === index
                return (
                  <button 
                    key={routine.id}
                    type="button"
                    className={`routine-btn ${isActive ? 'active' : ''}`}
                    aria-pressed={isActive}
                    onClick={() => setSelectedRoutineIndex(index)}
                  >
                    <span className="routine-btn-num">{routine.number}</span>
                    <span className="routine-btn-title">{routine.title}</span>
                  </button>
                )
              })}
            </div>
            
            <div className="loadout-display">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedRoutineIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="loadout-active-content"
                >
                  <p className="loadout-active-desc">
                    {ROUTINES[selectedRoutineIndex].desc}
                  </p>
                  <ul className="loadout-tags" aria-label="Routine tags">
                    {ROUTINES[selectedRoutineIndex].tags.map((tag) => (
                      <li key={tag} className="loadout-tag-pill">{tag}</li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
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
