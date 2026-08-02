import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import heroFull from '../assets/nomad-x1-hero-full.png'
import signature from '../assets/sathya-prakash-signature.png'
import orbitBag from '../assets/nomad-x1-orbit.png'
import frontView from '../assets/nomad-x1-front-view.webp'
import backView from '../assets/nomad-x1-back-view.webp'
import interiorView from '../assets/nomad-x1-interior-view.webp'

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

/* ─── Benefit pin SVG ─── */
const BenefitPinSVG = () => (
  <svg className="benefit-pin" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M16 3a1 1 0 0 1 .117 1.993L16 5v4.764l1.894 3.789a1 1 0 0 1 .1.331L18 14v2a1 1 0 0 1-.883.993L17 17h-4v4a1 1 0 0 1-1.993.117L11 21v-4H7a1 1 0 0 1-.993-.883L6 16v-2a1 1 0 0 1 .06-.34l.046-.107L8 9.762V5a1 1 0 0 1-.117-1.993L8 3h8Z"/>
  </svg>
)

/* ─── Product Focus gallery images ─── */
const GALLERY_IMAGES = [
  { src: frontView, alt: 'NOMAD X1 backpack shown from the front', label: 'Front view' },
  { src: backView, alt: 'NOMAD X1 backpack shown from the back with padded straps', label: 'Back view' },
  { src: interiorView, alt: 'NOMAD X1 backpack opened to show its modular interior', label: 'Interior view' },
]

export default function Home() {
  const sectionRef = useRef(null)
  const [activeImg, setActiveImg] = useState(0)
  const [changing, setChanging] = useState(false)

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
              <p className="eyebrow">NOMAD <span className="x1-normal">X1</span> / 01</p>
              <h1>Built for wherever<br />life takes you.</h1>
              <Link className="editorial-shop" to="/product" aria-label="Explore NOMAD X1">
                <span className="x1-normal">X1</span>
              </Link>
            </div>
            <p className="editorial-description">
              A modular smart backpack that organises technology, daily essentials and short journeys without compromising comfort or style.
            </p>
          </div>
          <div className="hero-word" aria-hidden="true">NOMAD</div>
          <div className="hero-product">
            <img
              className="hero-bag-image"
              src={heroFull}
              alt="Black NOMAD X1 modular backpack shown from the front"
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
              {PINS.map(pin => (
                <article key={pin.cls} className={`feature-pin ${pin.cls}`}>
                  {pin.svg}
                  <h3>{pin.title}</h3>
                  <p>{pin.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── BENEFIT ROADMAP ─── */}
      <section className="section benefit-roadmap" aria-labelledby="benefit-roadmap-title">
        <div className="container">
          <header className="benefit-roadmap-head">
            <div className="benefit-roadmap-title">
              <p className="eyebrow">Key benefits</p>
              <h2 id="benefit-roadmap-title">More capability.<br />Less disorder.</h2>
            </div>
            <aside className="benefit-roadmap-context" aria-label="NOMAD X1 benefit overview">
              <p className="benefit-roadmap-index">NOMAD <span className="x1-normal">X1</span> / SYSTEM 01—04</p>
              <p className="benefit-roadmap-summary">Four focused systems protect what matters, adapt to changing loads and keep every journey organised.</p>
              <div className="benefit-roadmap-metrics">
                <span><strong>24–32 L</strong><small>Adaptive capacity</small></span>
                <span><strong>4</strong><small>Core systems</small></span>
              </div>
            </aside>
          </header>

          <div className="benefit-path" role="list" aria-label="Four key benefits of the NOMAD X1">
            <svg className="benefit-path-line" viewBox="0 0 1000 1040" preserveAspectRatio="none" aria-hidden="true">
              <path className="benefit-path-desktop" d="M280 140 C500 140 535 305 720 345 C865 380 500 460 280 625 C170 710 510 820 720 900"/>
              <path className="benefit-path-mobile" d="M380 130 C610 145 660 280 620 380 C575 490 395 500 380 640 C365 765 540 825 620 900"/>
            </svg>

            {[
              { num: '01', title: 'Expandable Storage', desc: 'Shift from 24 litres of daily storage to 32 litres when your journey requires more.', color: 'orange' },
              { num: '02', title: 'Protected Technology', desc: 'An elevated padded compartment protects laptops and tablets from movement and impact.', color: 'blue' },
              { num: '03', title: 'Concealed Security', desc: 'Hidden rear storage keeps important documents, wallets and valuables closer to you.', color: 'purple' },
              { num: '04', title: 'Weather Resistance', desc: 'Coated fabric and protected zippers reduce exposure to light rain and accidental spills.', color: 'orange' },
            ].map((note, i) => (
              <article
                key={note.num}
                className={`benefit-note benefit-note-${i + 1} benefit-note-${note.color}`}
                role="listitem"
              >
                <div className="benefit-note-shell reveal">
                  <BenefitPinSVG />
                  <div className="benefit-note-panel">
                    <span className="benefit-note-number">{note.num}</span>
                    <h3>{note.title}</h3>
                    <p>{note.desc}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

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
