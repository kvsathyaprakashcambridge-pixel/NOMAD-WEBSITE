import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import arcImg from '../assets/nomad-arc.webp'
import vectorImg from '../assets/nomad-vector.webp'
import ridgeImg from '../assets/nomad-ridge.webp'
import obsidianImg from '../assets/nomad-x1-obsidian-uploaded.png'
import armorImg from '../assets/x1-armor.png'
import facetImg from '../assets/x1-facet.png'
import layerImg from '../assets/x1-layer.png'
import moduleImg from '../assets/x1-module.png'
import rollImg from '../assets/x1-roll.png'
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

export default function Product() {
  const navigate = useNavigate()

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
                    <strong>{p.price}</strong>
                    <Link to="/contact?type=Purchase%20enquiry" aria-label={`Enquire about ${p.name}`}>+</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── X1 Lineup ─── */}
      <section className="section x1-lineup" style={{ paddingTop: '2rem' }} aria-labelledby="x1-lineup-title">
        <div className="container">
          <header className="best-sellers-head">
            <div>
              <p className="eyebrow">NOMAD / Curated carry</p>
              <h2 id="x1-lineup-title" className="best-sellers-logo-title">NOMAD</h2>
            </div>
            <p className="best-sellers-lede">Six distinct silhouettes. One standard of purposeful carry.</p>
          </header>

          <div className="best-sellers-grid x1-lineup-grid" role="list" aria-label="NOMAD X1 Obsidian variants">
            {X1_LINEUP.map(p => (
              <article key={p.name} className={`best-seller-card x1-lineup-card ${p.cls} reveal`} role="listitem">
                <div className="best-seller-visual">
                  <span className="best-seller-index">{p.index}</span>
                  <span className="best-seller-watermark" aria-hidden="true">NOMAD</span>
                  <img src={p.img} alt={p.alt} />
                </div>
                <div className="best-seller-info">
                  <div>
                    <span className="best-seller-series">{p.series}</span>
                    <h3><span className="x1-normal">{p.name}</span></h3>
                    <span className="best-seller-colour">{p.colour}</span>
                  </div>
                  <div className="best-seller-buy">
                    <span className="x1-lineup-action-label">Explore</span>
                    <Link to="/contact?type=Product%20question" aria-label={`Explore ${p.name}`}>+</Link>
                  </div>
                </div>
              </article>
            ))}
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
