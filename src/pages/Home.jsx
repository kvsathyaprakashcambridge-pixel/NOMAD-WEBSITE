import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import heroFull from '../assets/nomad-x1-hero-full.png'
import signature from '../assets/sathya-prakash-signature.png'
import orbitBag from '../assets/nomad-x1-orbit.png'
import ConfigurationSystem from '../components/ConfigurationSystem'
import frontView from '../assets/nomad-x1-front-view.webp'
import backView from '../assets/nomad-x1-back-view.webp'
import interiorView from '../assets/nomad-x1-interior-view.webp'

const MotionLink = motion.create ? motion.create(Link) : motion(Link);

/* ─── Feature pins data ─── */
const PINS = [
  {
    cls: 'pin-weather',
    title: 'Weather Resistant',
    desc: 'Coated exterior',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
        <path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/>
      </svg>
    ),
  },
  {
    cls: 'pin-comfort',
    title: 'Balanced Comfort',
    desc: 'Padded support',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3v18"/>
        <path d="m19 8 3 8a5 5 0 0 1-6 0zV7"/>
        <path d="M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1"/>
        <path d="m5 8 3 8a5 5 0 0 1-6 0zV7"/>
        <path d="M7 21h10"/>
      </svg>
    ),
  },
  {
    cls: 'pin-expand',
    title: 'Expandable Storage',
    desc: '24–32 litres',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m15 15 6 6"/><path d="m15 9 6-6"/>
        <path d="M21 16v5h-5"/><path d="M21 8V3h-5"/>
        <path d="M3 16v5h5"/><path d="m3 21 6-6"/>
        <path d="M3 8V3h5"/><path d="M9 9 3 3"/>
      </svg>
    ),
  },
  {
    cls: 'pin-durable',
    title: 'Durable Material',
    desc: 'Abrasion-ready shell',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    ),
  },
  {
    cls: 'pin-modular',
    title: 'Modular Organisation',
    desc: 'Detachable layouts',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="18" height="18" x="3" y="3" rx="2"/>
        <path d="M3 9h18"/><path d="M9 21V9"/>
      </svg>
    ),
  },
  {
    cls: 'pin-laptop',
    title: 'Laptop Protection',
    desc: 'Up to 16 inches',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z"/>
        <path d="M20.054 15.987H3.946"/>
      </svg>
    ),
  },
  {
    cls: 'pin-light',
    title: 'Lightweight Build',
    desc: 'Just 1.2 kg',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14.086 18.412A2 2 0 0 1 12.67 19H5v-7.672a2 2 0 0 1 .586-1.414L11.75 3.75a6 6 0 1 1 8.49 8.49z"/>
        <path d="M16 8 2 22"/><path d="M17.488 15H9"/>
      </svg>
    ),
  },
  {
    cls: 'pin-security',
    title: 'Concealed Security',
    desc: 'Hidden rear pocket',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="16" r="1"/>
        <rect x="3" y="10" width="18" height="12" rx="2"/>
        <path d="M7 10V7a5 5 0 0 1 10 0v3"/>
      </svg>
    ),
  },
  {
    cls: 'pin-luggage',
    title: 'Luggage Sleeve',
    desc: 'Stable travel fit',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 12h.01"/>
        <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        <path d="M22 13a18.15 18.15 0 0 1-20 0"/>
        <rect width="20" height="14" x="2" y="6" rx="2"/>
      </svg>
    ),
  },
  {
    cls: 'pin-access',
    title: 'Quick Access',
    desc: 'Essentials in reach',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15.914 4a1.5 1.5 0 0 0-2.474-1.561l-9 9A1.5 1.5 0 0 0 5.5 14h4.002a.5.5 0 0 1 .471.666L8.086 20a1.5 1.5 0 0 0 2.475 1.56l9-9A1.5 1.5 0 0 0 18.5 10h-3.997a.5.5 0 0 1-.472-.667z"/>
      </svg>
    ),
  },
]

/* ─── Product Focus gallery images ─── */
const GALLERY_IMAGES = [
  { src: frontView, alt: 'NOMAD X1 backpack shown from the front', label: 'Front view' },
  { src: backView, alt: 'NOMAD X1 backpack shown from the back with padded straps', label: 'Back view' },
  { src: interiorView, alt: 'NOMAD X1 backpack opened to show its modular interior', label: 'Interior view' },
]

export default function Home() {
  const [activeImg, setActiveImg] = useState(0)
  const [changing, setChanging] = useState(false)
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState(0)
  const [hoveredFeatureIndex, setHoveredFeatureIndex] = useState(null)
  
  const displayedFeatureIndex = hoveredFeatureIndex ?? selectedFeatureIndex
  const hasHover = typeof window !== 'undefined' ? window.matchMedia("(hover: hover) and (pointer: fine)").matches : false
  
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  
  const shouldReduceMotion = useReducedMotion();
  const tScale = isMobile ? 0.7 : 1;

  const wordVariants = shouldReduceMotion ? {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.15 } }
  } : {
    hidden: { opacity: 0, x: "-50%", y: "calc(-50% + 20px)", filter: 'blur(6px)' },
    visible: { opacity: 1, x: "-50%", y: "-50%", filter: 'blur(0px)', transition: { delay: 0.1 * tScale, duration: 0.7 * tScale, ease: [0.22, 1, 0.36, 1] } }
  };

  const labelVariants = shouldReduceMotion ? {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.15 } }
  } : {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.18 * tScale, duration: 0.5 * tScale, ease: [0.22, 1, 0.36, 1] } }
  };

  const headingVariants = shouldReduceMotion ? {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.15 } }
  } : {
    hidden: { opacity: 0, y: isMobile ? 18 : 28 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.26 * tScale, duration: 0.65 * tScale, ease: [0.22, 1, 0.36, 1] } }
  };

  const pVariants = shouldReduceMotion ? {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.15 } }
  } : {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.38 * tScale, duration: 0.55 * tScale, ease: [0.22, 1, 0.36, 1] } }
  };

  const btnVariants = shouldReduceMotion ? {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.15 } }
  } : {
    hidden: { opacity: 0, y: 14, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { delay: 0.48 * tScale, duration: 0.5 * tScale, ease: [0.22, 1, 0.36, 1] } }
  };

  const btnHover = shouldReduceMotion ? {} : {
    y: -2, scale: 1.02, transition: { duration: 0.18 }
  };
  const btnTap = shouldReduceMotion ? {} : {
    scale: 0.97, transition: { duration: 0.1 }
  };

  const bagVariants = shouldReduceMotion ? {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.15 } }
  } : {
    hidden: { opacity: 0, x: "-50%", y: isMobile ? 20 : 36, scale: 0.94, filter: 'drop-shadow(0px 22px 27px rgba(0,0,0,0.16)) blur(5px)' },
    visible: { opacity: 1, x: "-50%", y: 0, scale: 1, filter: 'drop-shadow(0px 22px 27px rgba(0,0,0,0.16)) blur(0px)', transition: { delay: 0.32 * tScale, duration: 0.9 * tScale, ease: [0.16, 1, 0.3, 1] } }
  };

  /* Reveal observer */
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

  const handleDot = (i) => {
    if (i === activeImg || changing) return
    setChanging(true)
    setTimeout(() => {
      setActiveImg(i)
      setChanging(false)
    }, 140)
  }

  return (
    <main>
      {/* ─── HERO ─── */}
      <section className="editorial-hero" aria-label="NOMAD X1 hero">
        <div className="container editorial-hero-inner">
          <div className="editorial-copy">
            <div className="editorial-intro">
              <motion.p className="eyebrow" initial="hidden" animate="visible" variants={labelVariants}>NOMAD <span className="x1-normal">X1</span> / 01</motion.p>
              <motion.h1 initial="hidden" animate="visible" variants={headingVariants}>Built for wherever<br />life takes you.</motion.h1>
              <MotionLink 
                className="editorial-shop" 
                to="/product" 
                aria-label="Explore NOMAD X1"
                initial="hidden" animate="visible" variants={btnVariants}
                whileHover={btnHover}
                whileTap={btnTap}
                style={{ transition: 'background 0.25s, color 0.25s' }}
              >
                <span className="x1-normal">X1</span>
              </MotionLink>
            </div>
            <motion.p className="editorial-description" initial="hidden" animate="visible" variants={pVariants}>
              A modular smart backpack that organises technology, daily essentials and short journeys without compromising comfort or style.
            </motion.p>
          </div>
          <motion.div className="hero-word" aria-hidden="true" initial="hidden" animate="visible" variants={wordVariants}>NOMAD</motion.div>
          <div className="hero-product">
            <motion.img
              className="hero-bag-image"
              src={heroFull}
              alt="Black NOMAD X1 modular backpack shown from the front"
              initial="hidden" animate="visible" variants={bagVariants}
            />
          </div>
        </div>
      </section>



      {/* ─── FEATURE SHOWCASE ─── */}
      <section className="section feature-showcase" aria-labelledby="feature-showcase-title">
        <div className="container">
          <header className="feature-showcase-head">
            <p className="eyebrow">NOMAD <span className="x1-normal">X1</span> / Designed into every detail</p>
            <h2 id="feature-showcase-title">One bag. Ten purposeful advantages.</h2>
            <p className="lede">Every feature is positioned around one adaptable carry system for study, work and short journeys.</p>
          </header>

          <div className="feature-orbit-layout">
            <div className="feature-info-panel-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={displayedFeatureIndex}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 7 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] } }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -5, transition: { duration: 0.13 } }}
                >
                  <p className="feature-panel-label eyebrow">ACTIVE FEATURE</p>
                  <p className="feature-panel-num">
                    {(displayedFeatureIndex + 1).toString().padStart(2, '0')} / {PINS.length}
                  </p>
                  <h3 className="feature-panel-title">{PINS[displayedFeatureIndex].title}</h3>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="feature-orbit-center">
              <div className="feature-orbit">
                <figure className="feature-product">
                  <span className="feature-product-halo" aria-hidden="true" />
                  <img
                    className="feature-product-bag"
                    src={orbitBag}
                    alt="NOMAD X1 modular backpack shown from the front"
                  />
                </figure>

                <div className="feature-ring" aria-label="Rotating NOMAD X1 feature highlights">
                  {PINS.map((pin, index) => {
                    const isActive = index === selectedFeatureIndex;
                    const isPreviewed = index === hoveredFeatureIndex;
                    const isDisplayed = isActive || isPreviewed;
                    
                    return (
                      <article key={pin.cls} className={`feature-pin ${pin.cls} ${isDisplayed ? 'is-active' : ''}`}>
                        <button 
                          type="button" 
                          className="feature-pin-control"
                          aria-pressed={isActive}
                          onPointerEnter={() => hasHover && setHoveredFeatureIndex(index)}
                          onPointerLeave={() => hasHover && setHoveredFeatureIndex(null)}
                          onClick={() => setSelectedFeatureIndex(index)}
                        >
                          {pin.svg}
                          <h3>{pin.title}</h3>
                          <p>{pin.desc}</p>
                        </button>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="feature-info-panel-right">
              <AnimatePresence mode="wait">
                <motion.div
                  key={displayedFeatureIndex}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 7 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] } }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -5, transition: { duration: 0.13 } }}
                >
                  <p className="feature-panel-label eyebrow">SYSTEM DETAIL</p>
                  <p className="feature-panel-detail">{PINS[displayedFeatureIndex].desc}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="feature-mobile-layout">
            <img
              className="feature-mobile-bag"
              src={orbitBag}
              alt="NOMAD X1 modular backpack shown from the front"
            />
            
            <div className="feature-mobile-grid">
              {PINS.map((pin, index) => {
                const isActive = index === selectedFeatureIndex;
                return (
                  <button 
                    key={`mobile-pin-${index}`}
                    type="button" 
                    className={`feature-mobile-button ${isActive ? 'is-active' : ''}`}
                    aria-pressed={isActive}
                    aria-label={pin.title}
                    onClick={() => setSelectedFeatureIndex(index)}
                  >
                    {pin.svg}
                  </button>
                );
              })}
            </div>

            <div className="feature-mobile-panel" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedFeatureIndex}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4, transition: { duration: 0.12 } }}
                  className="feature-mobile-panel-content"
                >
                  <p className="feature-mobile-panel-num eyebrow">
                    {(selectedFeatureIndex + 1).toString().padStart(2, '0')} / {PINS.length}
                  </p>
                  <h3 className="feature-mobile-panel-title">{PINS[selectedFeatureIndex].title}</h3>
                  <p className="feature-mobile-panel-detail">{PINS[selectedFeatureIndex].desc}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONFIGURATION SYSTEM ─── */}
      <ConfigurationSystem />

      {/* ─── PRODUCT FOCUS ─── */}
      <section className="section product-focus" aria-labelledby="product-focus-title">
        <div className="container">
          <div className="product-focus-card reveal">
            <div className="product-focus-gallery">
              <div className="product-focus-image-shell">
                <span className="product-focus-code"><span className="x1-normal">X1</span> / OBSIDIAN</span>
                <img
                  id="product-focus-image"
                  src={GALLERY_IMAGES[activeImg].src}
                  alt={GALLERY_IMAGES[activeImg].alt}
                  className={changing ? 'is-changing' : ''}
                />
              </div>
              <div className="product-focus-gallery-footer">
                <div className="product-focus-dots" role="group" aria-label="Choose a NOMAD X1 product view">
                  {GALLERY_IMAGES.map((img, i) => (
                    <button
                      key={i}
                      className={`product-focus-dot${activeImg === i ? ' active' : ''}`}
                      type="button"
                      aria-pressed={activeImg === i}
                      aria-label={`Show ${img.label}`}
                      onClick={() => handleDot(i)}
                    />
                  ))}
                </div>
                <span id="product-focus-view-label" aria-live="polite">
                  {GALLERY_IMAGES[activeImg].label}
                </span>
              </div>
            </div>

            <article className="product-focus-panel">
              <p className="product-focus-kicker">Modular smart backpack</p>
              <h2 id="product-focus-title">One system.<br />Configured around you.</h2>
              <p className="product-focus-price">₹4,999</p>
              <div className="product-focus-description">
                <span>Description</span>
                <p>NOMAD <span className="x1-normal">X1</span> adapts from daily carry to short-journey mode, with protected technology storage and modular organisation throughout.</p>
              </div>
              <div className="product-focus-options">
                <div>
                  <small>Colour</small>
                  <span className="product-focus-colour">
                    <i aria-hidden="true" />
                    Obsidian
                  </span>
                </div>
                <div>
                  <small>Capacity</small>
                  <strong>24–32 L</strong>
                </div>
                <div>
                  <small>Laptop</small>
                  <strong>Up to 16″</strong>
                </div>
              </div>
              <div className="product-focus-actions">
                <Link className="product-focus-action product-focus-action-outline" to="/features">
                  Explore Features
                </Link>
                <Link className="product-focus-action product-focus-action-primary" to="/product">
                  View Product
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ─── PRINCIPLES ─── */}
      <section className="section">
        <div className="container">
          <div className="intro-head">
            <h2>Nothing added without a purpose.</h2>
            <p className="lede">Every pocket, material and fastening system is designed to reduce friction. NOMAD <span className="x1-normal">X1</span> avoids unnecessary decoration and focuses on organisation, durability and movement.</p>
          </div>
          <div className="principles reveal">
            <div>Purpose before decoration</div>
            <div>Adaptability without complexity</div>
            <div>Durability for everyday movement</div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section cta">
        <div className="container">
          <div>
            <h2>Carry less chaos.</h2>
            <p>Discover how NOMAD <span className="x1-normal">X1</span> can organise the tools, technology and essentials that move with you.</p>
          </div>
          <Link className="btn" to="/product">Explore NOMAD <span className="x1-normal">X1</span></Link>
        </div>
      </section>
    </main>
  )
}
