import { Link } from 'react-router-dom'
import TransitionLink from './ui/TransitionLink'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <TransitionLink className="logo" to="/">
              <span className="brand">NOMAD</span>
            </TransitionLink>
            <p>NOMAD creates adaptable carry products for people who move between study, work and travel.</p>
          </div>
          <div>
            <h3>Navigate</h3>
            <TransitionLink to="/">Home</TransitionLink>
            <TransitionLink to="/story">Our Story</TransitionLink>
            <TransitionLink to="/contact">Contact</TransitionLink>
          </div>
          <div>
            <h3>Product</h3>
            <TransitionLink to="/product">NOMAD X1</TransitionLink>
            <TransitionLink to="/features">Features</TransitionLink>
            <TransitionLink to="/contact?type=Purchase%20enquiry">Enquire</TransitionLink>
          </div>
          <div>
            <h3>Contact</h3>
            <a href="mailto:contact@nomadcarry.com">contact@nomadcarry.com</a>
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
        <div className="footer-note">
          <span>© 2026 NOMAD. Concept website created for academic demonstration.</span>
          <span>This is a fictional product concept. Specifications, prices and availability are for demonstration.</span>
        </div>
      </div>
    </footer>
  )
}
