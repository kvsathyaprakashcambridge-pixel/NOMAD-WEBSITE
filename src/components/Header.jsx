import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const searchRef = useRef(null)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
  }, [location])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        setSearchOpen(false)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Product', to: '/product' },
    { label: 'Features', to: '/features' },
    { label: 'Our Story', to: '/story' },
    { label: 'Contact', to: '/contact' },
  ]

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <nav className="nav container" aria-label="Primary">
        <Link className="logo" to="/" aria-label="NOMAD home">
          <span className="brand">NOMAD</span>
        </Link>

        <div className={`nav-links${menuOpen ? ' open' : ''}`}>
          {navLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={location.pathname === to ? 'active' : ''}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <Link className="nav-action" to="/product" aria-label="View NOMAD X1">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 8h12l1 13H5L6 8Z"/>
              <path d="M9 9V6a3 3 0 0 1 6 0v3"/>
            </svg>
          </Link>

          <button
            className="nav-action nav-search-toggle"
            type="button"
            aria-label="Search"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen(o => !o)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7"/>
              <path d="m20 20-4-4"/>
            </svg>
          </button>

          <Link className="nav-action" to="/contact" aria-label="Contact NOMAD">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="8" r="3.5"/>
              <path d="M5.5 21a6.5 6.5 0 0 1 13 0"/>
            </svg>
          </Link>

          {searchOpen && (
            <form
              ref={searchRef}
              className="header-search open"
              role="search"
              onSubmit={(e) => {
                e.preventDefault()
                const q = e.target.querySelector('input').value.trim().toLowerCase()
                setSearchOpen(false)
              }}
              style={{
                position: 'absolute',
                zIndex: 5,
                right: 0,
                top: 55,
                display: 'flex',
                width: 'min(330px, calc(100vw - 32px))',
                padding: 8,
                background: '#fff',
                border: '1px solid rgba(17,19,18,.12)',
                boxShadow: '0 16px 40px rgba(17,19,18,.13)',
              }}
            >
              <input
                type="search"
                aria-label="Search NOMAD"
                placeholder="Search product, features, story…"
                style={{
                  minWidth: 0, flex: 1, padding: '9px 11px',
                  border: 0, background: '#f4f2ed', color: '#111312', outline: 0,
                }}
                autoFocus
              />
              <button
                type="submit"
                style={{
                  padding: '0 14px', border: 0,
                  background: '#111312', color: '#fff', fontWeight: 700, cursor: 'pointer',
                }}
              >
                Go
              </button>
            </form>
          )}
        </div>

        <button
          className="nav-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(o => !o)}
          style={{ display: 'none' }}
        >
          <span />
        </button>
      </nav>
    </header>
  )
}
