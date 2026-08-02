import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BagViewsCarousel } from '../components/BagViewsCarousel'

import arcFront from '../assets/FONT VIEW.png';
import arcInterior from '../assets/INTERIER VIEW.png';
import arcBack from '../assets/BACK VIEW.png';

import vectorFront from '../assets/VECTOR FRONT.png';
import vectorInterior from '../assets/VECTOR INTEROR.png';
import vectorBack from '../assets/VECTOR BACK.png';

import ridgeFront from '../assets/RIDGE FRONT.png';
import ridgeInterior from '../assets/RIDGE INTEROR.png';
import ridgeBack from '../assets/RIDGE BACK.png';

const ARC_VIEWS = [
  {
    quote: "A refined minimalist front design with a softly structured silhouette, protective flap closure, vertical quick-access zipper and spacious side pockets for everyday essentials.",
    name: "NOMAD ARC",
    designation: "Front View",
    src: arcFront,
  },
  {
    quote: "A carefully organised interior with a padded laptop compartment, tablet sleeve, mesh storage, cable organisers and dedicated spaces for compact technology accessories.",
    name: "NOMAD ARC",
    designation: "Interior View",
    src: arcInterior,
  },
  {
    quote: "A comfort-focused rear design with breathable padded panels, adjustable cushioned shoulder straps, a stabilising chest strap and a luggage pass-through band.",
    name: "NOMAD ARC",
    designation: "Back View",
    src: arcBack,
  },
];

const VECTOR_VIEWS = [
  {
    quote: "A sleek and modern front profile designed for everyday tech carry, featuring a streamlined silhouette, clean panel construction and practical side storage for a refined, minimal appearance.",
    name: "NOMAD VECTOR",
    designation: "Front View",
    src: vectorFront,
  },
  {
    quote: "A neat, tech-focused interior with organised storage for a laptop, tablet, charging cables, accessories, small devices and everyday essentials, arranged for convenience and protected carry.",
    name: "NOMAD VECTOR",
    designation: "Interior View",
    src: vectorInterior,
  },
  {
    quote: "A comfort-oriented back design with breathable padding, adjustable shoulder straps and a stabilising chest strap, helping distribute weight evenly for comfortable daily commuting.",
    name: "NOMAD VECTOR",
    designation: "Back View",
    src: vectorBack,
  },
];

const RIDGE_VIEWS = [
  {
    quote: "A rugged multi-utility front design built for travel and outdoor carry, featuring a protective top flap, dual buckle closure, large front storage pocket, compression straps and side utility compartments for quick-access essentials.",
    name: "NOMAD RIDGE",
    designation: "Front View",
    src: ridgeFront,
  },
  {
    quote: "A highly organised interior layout with dedicated compartments for a laptop, tablet, chargers, cables, accessories, stationery and compact travel gear, designed for efficient packing and easy access on the move.",
    name: "NOMAD RIDGE",
    designation: "Interior View",
    src: ridgeInterior,
  },
  {
    quote: "A support-focused rear design with breathable padded back panels, adjustable cushioned shoulder straps and a stabilising chest strap, providing comfort and balance for extended daily use or short travel.",
    name: "NOMAD RIDGE",
    designation: "Back View",
    src: ridgeBack,
  },
];


export default function Features() {
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
      {/* ─── Page Hero ─── */}
      <section className="page-hero" style={{ textAlign: 'center' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p className="eyebrow">NOMAD <span className="x1-normal">X1</span> / Feature system</p>
          <h1 style={{ textAlign: 'center' }}>Every feature earns its place.</h1>
          <p className="lede light-copy" style={{ textAlign: 'center' }}>
            NOMAD <span className="x1-normal">X1</span> was designed as one adaptable system rather than a collection of unnecessary compartments.
          </p>
        </div>
      </section>

      {/* ─── Feature Rows ─── */}
      <section>
        <section id="nomad-arc" key="carousel-arc" style={{ background: '#171a19', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '60px 20px' }}>
          <BagViewsCarousel views={ARC_VIEWS} autoplay={true} colors={{ name: "#fff", designation: "#888", testimony: "#e1e1e1", arrowBackground: "#2c2e2c", arrowForeground: "#f1f1f7", arrowHoverBackground: "#00a6fb" }} />
        </section>
        <section id="nomad-vector" key="carousel-vector" style={{ background: '#171a19', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '60px 20px' }}>
          <BagViewsCarousel views={VECTOR_VIEWS} reverse={true} autoplay={true} colors={{ name: "#fff", designation: "#888", testimony: "#e1e1e1", arrowBackground: "#2c2e2c", arrowForeground: "#f1f1f7", arrowHoverBackground: "#00a6fb" }} />
        </section>
        <section id="nomad-ridge" key="carousel-ridge" style={{ background: '#171a19', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '60px 20px' }}>
          <BagViewsCarousel views={RIDGE_VIEWS} autoplay={true} colors={{ name: "#fff", designation: "#888", testimony: "#e1e1e1", arrowBackground: "#2c2e2c", arrowForeground: "#f1f1f7", arrowHoverBackground: "#00a6fb" }} />
        </section>
      </section>

      {/* ─── Three Configurations ─── */}
      <section className="section section-dark">
        <div className="container">
          <p className="eyebrow">Three configurations</p>
          <h2>One day can ask for different things.</h2>
          <div className="mode-strip">
            <article className="mode">
              <h3>Daily Mode</h3>
              <ul>
                <li>Laptop and tablet</li>
                <li>Books and notebook</li>
                <li>Charger and bottle</li>
              </ul>
            </article>
            <article className="mode">
              <h3>Work Mode</h3>
              <ul>
                <li>Laptop and documents</li>
                <li>Organiser and cables</li>
                <li>Headphones and essentials</li>
              </ul>
            </article>
            <article className="mode">
              <h3>Travel Mode</h3>
              <ul>
                <li>Technology</li>
                <li>One-to-two days of clothing</li>
                <li>Toiletries and rain cover</li>
              </ul>
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}
