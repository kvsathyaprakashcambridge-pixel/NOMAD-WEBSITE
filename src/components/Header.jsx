import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import TransitionLink from './ui/TransitionLink'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchError, setSearchError] = useState('')
  const searchRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  
  const { state, dispatch, totalItems } = useCart()

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20)
          ticking = false
        })
        ticking = true
      }
    }
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
    { label: 'X1', to: '/x1' },
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
            <TransitionLink
              key={to}
              to={to}
              className={location.pathname === to ? 'active' : ''}
            >
              {label}
            </TransitionLink>
          ))}
        </div>

        <div className="nav-actions">
          <button
            id="manifest-nav-icon"
            className="nav-action"
            aria-label="Toggle Manifest"
            onClick={() => dispatch({ type: 'TOGGLE_PANEL' })}
            style={{ position: 'relative' }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: '20px', height: '20px' }}>
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 6h18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 10a4 4 0 0 1-8 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {totalItems > 0 && (
              <motion.span 
                key={state.lastAddedTimestamp}
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.3, 1] }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute',
                  top: '2px',
                  right: '1px',
                  width: '8px',
                  height: '8px',
                  background: '#E26D3F',
                  borderRadius: '50%',
                  pointerEvents: 'none'
                }}
              />
            )}
          </button>

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

          <Link className="nav-action" to="/login" aria-label="Sign in to your account">
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
                if (!q) return
                
                const SEARCH_CATALOG = [
                  { names: ['nomad x1', 'x1', 'original'], path: '/x1/x1' },
                  { names: ['x1 armor', 'armor'], path: '/x1/armor' },
                  { names: ['x1 facet', 'facet'], path: '/x1/facet' },
                  { names: ['x1 layer', 'layer'], path: '/x1/layer' },
                  { names: ['x1 module', 'module'], path: '/x1/module' },
                  { names: ['x1 roll', 'roll'], path: '/x1/roll' },
                  { names: ['nomad arc', 'arc', 'city'], path: '/product' },
                  { names: ['nomad vector', 'vector', 'tech'], path: '/product' },
                  { names: ['nomad ridge', 'ridge', 'trail'], path: '/product' }
                ]
                
                const match = SEARCH_CATALOG.find(item => item.names.some(n => n.includes(q) || q.includes(n)))
                
                if (match) {
                  setSearchError('')
                  setSearchOpen(false)
                  navigate(match.path)
                } else {
                  setSearchError('No products found matching your search.')
                }
              }}
              style={{
                position: 'absolute',
                zIndex: 5,
                right: 0,
                top: 55,
                display: 'flex',
                flexDirection: 'column',
                width: 'min(330px, calc(100vw - 32px))',
                padding: 8,
                background: '#fff',
                border: '1px solid rgba(17,19,18,.12)',
                boxShadow: '0 16px 40px rgba(17,19,18,.13)',
              }}
            >
              <div style={{ display: 'flex', width: '100%' }}>
                <input
                  type="search"
                  aria-label="Search NOMAD"
                  placeholder="Search product, features, story…"
                  style={{
                    minWidth: 0, flex: 1, padding: '9px 11px',
                    border: 0, background: '#f4f2ed', color: '#111312', outline: 0,
                  }}
                  autoFocus
                  onChange={() => setSearchError('')}
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
              </div>
              {searchError && (
                <div style={{ padding: '8px 4px 0', color: '#E26D3F', fontSize: '0.85rem' }}>
                  {searchError}
                </div>
              )}
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
