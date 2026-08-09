import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import founderPhoto from '../assets/founder replace.png'
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



          <div className="story-founder-note__message">
            <p className="story-founder-note__statement">
              Modern routines move between study, work,
              technology and short journeys—but most carry
              products are still built around one fixed purpose.
            </p>

            <div className="story-founder-note__sign-block">
              <picture className="story-founder-note__signature">
                <source srcSet={signatureWebp} type="image/webp" />
                <img
                  src={signaturePng}
                  alt="Sathiya Prakash signature"
                  width="600"
                  height="160"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <p className="story-founder-note__name">SATHIYA PRAKASH</p>
              <p className="story-founder-note__role">
                Founder · Product Direction · Digital Experience
              </p>
            </div>
          </div>

        </div>
      </section>

{/* ─── The Friction ─── */}
      <section className="section section-dark story-friction" style={{ padding: '60px 0 140px 0', backgroundColor: '#0A0A0A' }}>
        <div className="container">
          <div style={{ maxWidth: '840px' }}>
            
            
            <h2 style={{ fontSize: 'clamp(44px, 6vw, 64px)', lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 100px 0', color: '#F3EFE5', fontWeight: 600 }}>
              Every bag I owned made<br/>me choose.
            </h2>

            <div className="story-friction-notes" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '64px', borderLeft: '1px solid rgba(243, 239, 229, 0.1)', marginLeft: '5px' }}>
              
              <div className="friction-note" style={{ position: 'relative', paddingLeft: '40px' }}>
                <div style={{ position: 'absolute', left: '-5px', top: '6px', width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#E26D3F' }}></div>
                <time style={{ display: 'block', color: '#F3EFE5', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '16px', opacity: 0.9 }}>7:12 AM</time>
                <p style={{ color: 'rgba(243, 239, 229, 0.7)', fontSize: '13px', lineHeight: 1.8, margin: 0, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', textTransform: 'lowercase', letterSpacing: '0.05em', maxWidth: '580px' }}>— laptop charger tangled with earphones, both stuck under a textbook i didn't need until noon.</p>
              </div>

              <div className="friction-note" style={{ position: 'relative', paddingLeft: '40px' }}>
                <div style={{ position: 'absolute', left: '-5px', top: '6px', width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#E26D3F' }}></div>
                <time style={{ display: 'block', color: '#F3EFE5', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '16px', opacity: 0.9 }}>2:45 PM</time>
                <p style={{ color: 'rgba(243, 239, 229, 0.7)', fontSize: '13px', lineHeight: 1.8, margin: 0, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', textTransform: 'lowercase', letterSpacing: '0.05em', maxWidth: '580px' }}>— a strap slipping off one shoulder mid-run for a bus, everything shifting to one side.</p>
              </div>

              <div className="friction-note" style={{ position: 'relative', paddingLeft: '40px' }}>
                <div style={{ position: 'absolute', left: '-5px', top: '6px', width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#E26D3F' }}></div>
                <time style={{ display: 'block', color: '#F3EFE5', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '16px', opacity: 0.9 }}>11:30 PM</time>
                <p style={{ color: 'rgba(243, 239, 229, 0.7)', fontSize: '13px', lineHeight: 1.8, margin: 0, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', textTransform: 'lowercase', letterSpacing: '0.05em', maxWidth: '580px' }}>— emptying the whole bag onto the floor to find one usb cable.</p>
              </div>

            </div>
            
            <blockquote className="pull-quote" style={{ margin: '120px 0 80px 0' }}>
              <h2 style={{ fontSize: 'clamp(40px, 5.5vw, 60px)', lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0, color: '#F3EFE5', fontWeight: 600 }}>
                None of it was really about<br/>the bag. It was about how<br/>much of my day I was losing<br/>to it.
              </h2>
            </blockquote>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <p className="friction-close" style={{ margin: 0, textAlign: 'right', maxWidth: '480px', fontSize: '16px', lineHeight: 1.5, color: '#E26D3F' }}>
              If you've unpacked your whole bag to find one thing, you already know the problem NOMAD was built to solve.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
