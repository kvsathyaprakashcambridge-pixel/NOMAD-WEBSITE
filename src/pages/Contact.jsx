import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

const FAQ_ITEMS = [
  { q: 'Is NOMAD X1 waterproof?', a: 'It is designed to resist light rain and accidental spills, but it is not intended for complete water immersion.' },
  { q: 'What laptop size does it support?', a: 'The protected compartment supports most laptops up to 16 inches.' },
  { q: 'Can the backpack be used for travel?', a: 'Yes. Its expandable 32-litre mode is designed for short-distance and one-to-two-day travel.' },
  { q: 'Does it include a warranty?', a: 'The fictional product concept includes a two-year limited warranty.' },
  { q: 'Is this a real commercial product?', a: 'No. NOMAD X1 is a fictional product concept created for an academic website demonstration.' },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button
        className="faq-question"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        {q}
        <span>{open ? '－' : '＋'}</span>
      </button>
      <div className="faq-answer">
        <div>
          <p>{a}</p>
        </div>
      </div>
    </div>
  )
}

export default function Contact() {
  const location = useLocation()
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    enquiry: '', colour: 'Obsidian Black',
    quantity: 1, message: '',
  })

  // Prefill enquiry type from query string
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const type = params.get('type')
    if (type) setForm(f => ({ ...f, enquiry: type }))
  }, [location.search])

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'This field is required.'
    if (!form.email.trim()) e.email = 'This field is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.'
    if (!form.enquiry) e.enquiry = 'This field is required.'
    if (!form.quantity || form.quantity < 1) e.quantity = 'Enter a quantity of 1 or more.'
    if (!form.message.trim()) e.message = 'This field is required.'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length === 0) setSubmitted(true)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
  }

  return (
    <main>
      {/* ─── Page Hero ─── */}
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Contact NOMAD</p>
          <h1>Let's discuss what you need.</h1>
          <p className="lede light-copy">
            Send a product question, purchase enquiry, bulk-order request or partnership proposal.
          </p>
        </div>
      </section>

      {/* ─── Form + Details ─── */}
      <section className="section">
        <div className="container contact-grid">
          <div>
            {!submitted ? (
              <form id="contact-form" className="contact-form" noValidate onSubmit={handleSubmit}>
                {/* Name */}
                <div className="field">
                  <label htmlFor="name">Full Name</label>
                  <input id="name" name="name" autoComplete="name" required value={form.name} onChange={handleChange} aria-invalid={!!errors.name} />
                  <span className="field-error" aria-live="polite">{errors.name || ''}</span>
                </div>
                {/* Email */}
                <div className="field">
                  <label htmlFor="email">Email Address</label>
                  <input id="email" name="email" type="email" autoComplete="email" required value={form.email} onChange={handleChange} aria-invalid={!!errors.email} />
                  <span className="field-error" aria-live="polite">{errors.email || ''}</span>
                </div>
                {/* Phone */}
                <div className="field">
                  <label htmlFor="phone">Phone Number</label>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={handleChange} />
                  <span className="field-error" />
                </div>
                {/* Enquiry type */}
                <div className="field">
                  <label htmlFor="enquiry">Enquiry Type</label>
                  <select id="enquiry" name="enquiry" required value={form.enquiry} onChange={handleChange} aria-invalid={!!errors.enquiry}>
                    <option value="">Choose one</option>
                    <option>Purchase enquiry</option>
                    <option>Product question</option>
                    <option>Bulk order</option>
                    <option>Partnership</option>
                    <option>General enquiry</option>
                  </select>
                  <span className="field-error" aria-live="polite">{errors.enquiry || ''}</span>
                </div>
                {/* Colour */}
                <div className="field">
                  <label htmlFor="colour">Preferred Colour</label>
                  <select id="colour" name="colour" value={form.colour} onChange={handleChange}>
                    <option>Obsidian Black</option>
                    <option>Slate Grey</option>
                    <option>Forest Green</option>
                    <option>Not decided</option>
                  </select>
                  <span className="field-error" />
                </div>
                {/* Quantity */}
                <div className="field">
                  <label htmlFor="quantity">Quantity</label>
                  <input id="quantity" name="quantity" type="number" value={form.quantity} min="1" max="999" required onChange={handleChange} aria-invalid={!!errors.quantity} />
                  <span className="field-error" aria-live="polite">{errors.quantity || ''}</span>
                </div>
                {/* Message */}
                <div className="field full">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" required placeholder="Tell us what you would like to know." value={form.message} onChange={handleChange} aria-invalid={!!errors.message} />
                  <span className="field-error" aria-live="polite">{errors.message || ''}</span>
                </div>
                {/* Submit */}
                <div className="field full">
                  <button className="btn btn-primary" type="submit">Record Enquiry</button>
                </div>
              </form>
            ) : (
              <div className="success show" tabIndex={-1} role="status">
                <h3>Thank you.</h3>
                <p>Your enquiry has been recorded for this demonstration.</p>
                <button
                  id="send-another"
                  className="btn btn-dark"
                  type="button"
                  onClick={() => { setSubmitted(false); setForm({ name:'', email:'', phone:'', enquiry:'', colour:'Obsidian Black', quantity:1, message:'' }) }}
                >
                  Send another enquiry
                </button>
              </div>
            )}
          </div>

          <aside className="contact-details">
            <p className="eyebrow">Demonstration information</p>
            <h2 style={{ fontSize: '2.4rem' }}>Contact details</h2>
            <dl>
              <dt>Email</dt>
              <dd>hello@nomad-x1.example</dd>
              <dt>Phone</dt>
              <dd>+91 90000 00000</dd>
              <dt>Location</dt>
              <dd>Bengaluru, India</dd>
              <dt>Business hours</dt>
              <dd>Monday–Friday<br />9:00 AM–6:00 PM</dd>
            </dl>
            <small>These details are fictional and provided only for this academic demonstration.</small>
          </aside>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="section">
        <div className="container">
          <p className="eyebrow">Frequently asked questions</p>
          <h2>Useful answers, before you ask.</h2>
          <div className="faq">
            {FAQ_ITEMS.map(({ q, a }) => <FAQItem key={q} q={q} a={a} />)}
          </div>
        </div>
      </section>
    </main>
  )
}
