import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link className="logo" to="/">
              <span className="brand">NOMAD</span>
            </Link>
            <p>NOMAD creates adaptable carry products for people who move between study, work and travel.</p>
          </div>
          <div>
            <h3>Navigate</h3>
            <Link to="/">Home</Link>
            <Link to="/story">Our Story</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div>
            <h3>Product</h3>
            <Link to="/product">NOMAD X1</Link>
            <Link to="/features">Features</Link>
            <Link to="/contact?type=Purchase%20enquiry">Enquire</Link>
          </div>
          <div>
            <h3>Contact</h3>
            <a href="mailto:hello@nomad-x1.example">hello@nomad-x1.example</a>
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
