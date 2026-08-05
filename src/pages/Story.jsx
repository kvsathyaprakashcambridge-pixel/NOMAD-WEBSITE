import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import founderPhoto from '../assets/founder-photo.jpeg'
import signatureWebp from '../assets/sathya-prakash-signature-600.webp'
import signaturePng from '../assets/sathya-prakash-signature.png'

export default function Story() {
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
      {/* ─── Part 1: Full uncropped founder photograph ─── */}
      <section className="story-founder-visual">
        <img
          src={founderPhoto}
          alt="Sathiya Prakash, Founder of NOMAD"
          className="story-founder-visual__photo"
          width="2752"
          height="1536"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />

        {/* Edge readability gradient — left and right only */}
        {/* Handled entirely in CSS via ::after pseudo-element */}

        {/* Small label — sits above annotations */}
        <p className="story-founder-visual__label" aria-hidden="true">
          OUR STORY / FOUNDER'S NOTE
        </p>

        {/* Editorial annotations — decorative only */}
        <div className="story-founder-visual__annotations" aria-hidden="true">

          {/* Upper-left: origin block */}
          <div className="story-founder-visual__origin">
            <span className="story-founder-visual__origin-line" />
            <span className="story-founder-visual__origin-label">01 / ORIGIN</span>
            <strong className="story-founder-visual__origin-title">THE FOUNDER</strong>
          </div>

          {/* Lower-left: role block */}
          <div className="story-founder-visual__direction">
            <span>PRODUCT DIRECTION</span>
            <span>DIGITAL EXPERIENCE</span>
          </div>

          {/* Right-centre: editorial statement */}
          <div className="story-founder-visual__statement">
            <strong>
              DESIGNED FROM
              <br />
              LIVED FRICTION.
            </strong>
          </div>

          {/* Lower-right: routine index */}
          <div className="story-founder-visual__routines">
            STUDY / WORK / CREATE / MOVE
          </div>

        </div>
      </section>


      {/* ─── Part 2: Cream founder note ─── */}
      <section className="story-founder-note reveal">
        <div className="story-founder-note__inner">

          <h1 className="story-founder-note__heading">
            <span>NOMAD BEGAN</span>
            <span>WITH A PROBLEM</span>
            <span>I LIVED WITH.</span>
          </h1>

          <div className="story-founder-note__message">
            <p className="story-founder-note__statement">
              Modern routines move between study, work,
              technology and short journeys—but most carry
              products are still built around one fixed purpose.
            </p>

            <picture className="story-founder-note__signature">
              <source srcSet={signatureWebp} type="image/webp" />
              <img
                src={signaturePng}
                alt="Sathiya Prakash signature"
                width="600"
                height="165"
                decoding="async"
              />
            </picture>

            <p className="story-founder-note__name">SATHIYA PRAKASH</p>
            <p className="story-founder-note__role">
              Founder · Product Direction · Digital Experience
            </p>
          </div>

        </div>
      </section>


      {/* ─── The Problem ─── */}
      <section className="section">
        <div className="container editorial-grid">
          <div>
            <p className="eyebrow">The problem</p>
            <h2>Backpacks were either organised, comfortable or adaptable. Rarely all three.</h2>
          </div>
          <ul className="problem-list">
            <li>Too many unnecessary compartments</li>
            <li>Poor weight distribution</li>
            <li>Limited flexibility</li>
            <li>Visually bulky designs</li>
            <li>Weak protection for technology</li>
          </ul>
        </div>
      </section>

      {/* ─── The Idea ─── */}
      <section className="section section-dark">
        <div className="container split">
          <div>
            <p className="eyebrow">The idea</p>
            <h2>One controlled silhouette. Multiple configurations.</h2>
            <p className="lede light-copy">
              NOMAD <span className="x1-normal">X1</span> combines modular organisation, discreet expansion and everyday comfort within one restrained form.
            </p>
          </div>
          <div className="bag-stage">
            <div className="bag small">
              <i className="bag-handle" />
              <i className="bag-zip" />
              <i className="bag-pocket" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Design Principles ─── */}
      <section className="section">
        <div className="container">
          <p className="eyebrow">Design principles</p>
          <div className="cards-4">
            {[
              { num: '01', title: 'Purposeful', desc: 'Every component must solve a visible problem.' },
              { num: '02', title: 'Adaptable', desc: 'The product must respond to different routines.' },
              { num: '03', title: 'Durable', desc: 'Materials and construction must support regular use.' },
              { num: '04', title: 'Restrained', desc: 'The appearance must remain clean and uncomplicated.' },
            ].map(({ num, title, desc }) => (
              <article key={num} className="card">
                <div className="feature-num" style={{ color: '#11121015' }}>{num}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Timeline ─── */}
      <section className="section">
        <div className="container">
          <p className="eyebrow">Development process</p>
          <h2>From observation to a coherent system.</h2>
          <p className="lede">A fictional concept-development timeline created to demonstrate a realistic product-design process.</p>
          <div className="timeline">
            {[
              ['01', 'Observation'],
              ['02', 'Sketching'],
              ['03', 'Material testing'],
              ['04', 'Organisation studies'],
              ['05', 'Prototype refinement'],
              ['06', 'NOMAD X1'],
            ].map(([step, label]) => (
              <div key={step} className="timeline-step">
                <small>{step}</small>
                <b>{label}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Material Responsibility ─── */}
      <section className="section section-soft">
        <div className="container intro-head">
          <div>
            <p className="eyebrow">Material responsibility</p>
            <h2>Designed with material responsibility in mind.</h2>
          </div>
          <p className="lede light-copy">
            NOMAD <span className="x1-normal">X1</span> conceptually uses recycled polyester, replaceable modular components and durable construction intended to support longer product life.
          </p>
        </div>
      </section>

      {/* ─── Signature (existing — to be removed in a later phase) ─── */}
      <section className="section signature-section">
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="signature-concept" style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#888', marginBottom: '8px', fontFamily: 'Manrope, Arial, sans-serif' }}>
            CONCEPT, PRODUCT DIRECTION AND DIGITAL EXPERIENCE
          </p>
          <p className="signature-name" style={{ fontSize: '1.2rem', fontWeight: 800, fontFamily: 'Syne, sans-serif', color: '#111312', marginBottom: '16px' }}>
            SATHIYA PRAKASH
          </p>
          <img 
            src={signaturePng} 
            alt="Sathya Prakash signature" 
            style={{ width: 'min(280px, 60vw)', height: 'auto', margin: '0 auto', display: 'block', opacity: 0.85, filter: 'brightness(0)' }} 
          />
        </div>
      </section>


      {/* ─── CTA ─── */}
      <section className="section cta">
        <div className="container">
          <h2>See the result of purposeful design.</h2>
          <Link className="btn" to="/product">Explore NOMAD <span className="x1-normal">X1</span></Link>
        </div>
      </section>
    </main>
  )
}
