import { useEffect } from 'react'
import { Link } from 'react-router-dom'

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
      {/* ─── Page Hero ─── */}
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Our story / Fictional concept</p>
          <h1>We designed NOMAD for lives that refuse to stay in one place.</h1>
          <p className="lede light-copy">
            Modern routines move between study, work, creation and travel. NOMAD began with the belief that one thoughtfully designed product should adapt to all four.
          </p>
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
