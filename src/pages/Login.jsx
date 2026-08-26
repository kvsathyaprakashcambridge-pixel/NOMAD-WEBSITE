import { useState, useRef, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaLinkedinIn, FaFacebookF, FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa'
import loginImg from '../assets/Replace login img.jpg'
import '../styles/login.css'

/* ─────────────────────────────────────────────────
   AUTH ABSTRACTION
   Drop in your real provider (Supabase / Firebase / Auth0)
   by replacing the functions below.
───────────────────────────────────────────────── */
async function signInWithEmail(email, password) {
  // Replace with real auth call
  await new Promise(r => setTimeout(r, 1200))
  if (email === 'demo@nomad.com' && password === 'password') {
    return { user: { email } }
  }
  throw new Error('Invalid credentials. Try demo@nomad.com / password')
}

async function signInWithProvider(provider) {
  // Replace with real OAuth call
  await new Promise(r => setTimeout(r, 800))
  throw new Error(`${provider} OAuth not yet configured.`)
}

/* ─────────────────────────────────────────────────
   ANIMATED INPUT COMPONENT
───────────────────────────────────────────────── */
function LoginInput({ label, id, type = 'text', placeholder, value, onChange, disabled, autoComplete, rightSlot }) {
  const [mouseX, setMouseX] = useState(0)
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMouseX(e.clientX - rect.left)
  }, [])

  return (
    <div className="login-field">
      {label && <label className="login-label" htmlFor={id}>{label}</label>}
      <div
        className="login-input-wrap"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <input
          id={id}
          type={type}
          className="login-input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          autoComplete={autoComplete}
          required
        />
        {/* Cursor-following top border highlight */}
        {hovered && (
          <>
            <div
              className="login-input-shine login-input-shine--top"
              style={{
                background: `radial-gradient(30px circle at ${mouseX}px 0px, var(--login-accent) 0%, transparent 70%)`
              }}
            />
            <div
              className="login-input-shine login-input-shine--bottom"
              style={{
                background: `radial-gradient(30px circle at ${mouseX}px 2px, var(--login-accent) 0%, transparent 70%)`
              }}
            />
          </>
        )}
        {rightSlot && <div className="login-input-right">{rightSlot}</div>}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────
   SOCIAL BUTTON
───────────────────────────────────────────────── */
function SocialBtn({ icon: Icon, label, onClick, disabled }) {
  return (
    <button
      type="button"
      className="login-social-btn"
      aria-label={`Sign in with ${label}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="login-social-fill" aria-hidden="true" />
      <span className="login-social-icon">
        <Icon />
      </span>
    </button>
  )
}

/* ─────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────── */
export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Mouse-following glow state for left panel
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 })
  const [glowVisible, setGlowVisible] = useState(false)
  const panelRef = useRef(null)

  const handlePanelMouseMove = useCallback((e) => {
    const rect = panelRef.current?.getBoundingClientRect()
    if (!rect) return
    setGlowPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return
    setError('')
    setLoading(true)
    try {
      await signInWithEmail(email, password)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSocial = async (provider) => {
    if (loading) return
    setError('')
    setLoading(true)
    try {
      await signInWithProvider(provider)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-root">
      {/* Subtle back-to-site link */}
      <Link to="/" className="login-back-link" aria-label="Back to NOMAD">
        <span className="login-back-brand">NOMAD</span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </Link>

      <div className="login-card">
        {/* ─── LEFT PANEL ─── */}
        <div
          ref={panelRef}
          className="login-left"
          onMouseMove={handlePanelMouseMove}
          onMouseEnter={() => setGlowVisible(true)}
          onMouseLeave={() => setGlowVisible(false)}
        >
          {/* Mouse-following glow orb */}
          <div
            className="login-glow"
            aria-hidden="true"
            style={{
              opacity: glowVisible ? 1 : 0,
              transform: `translate(${glowPos.x - 250}px, ${glowPos.y - 250}px)`
            }}
          />

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {/* Heading */}
            <h1 className="login-heading">Sign in</h1>

            {/* Social buttons */}
            <div className="login-social-row">
              <SocialBtn icon={FaGoogle}     label="Google"   onClick={() => handleSocial('Google')}   disabled={loading} />
              <SocialBtn icon={FaLinkedinIn} label="LinkedIn" onClick={() => handleSocial('LinkedIn')} disabled={loading} />
              <SocialBtn icon={FaFacebookF}  label="Facebook" onClick={() => handleSocial('Facebook')} disabled={loading} />
            </div>

            <p className="login-divider-text">or use your account</p>

            {/* Inputs */}
            <div className="login-fields">
              <LoginInput
                id="login-email"
                label="Email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setError('') }}
                disabled={loading}
                autoComplete="email"
              />
              <LoginInput
                id="login-password"
                label="Password"
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={e => { setPassword(e.target.value); setError('') }}
                disabled={loading}
                autoComplete="current-password"
                rightSlot={
                  <button
                    type="button"
                    className="login-show-pass"
                    onClick={() => setShowPass(s => !s)}
                    aria-label={showPass ? 'Hide password' : 'Show password'}
                    tabIndex={0}
                  >
                    {showPass ? <FaEyeSlash /> : <FaEye />}
                  </button>
                }
              />
            </div>

            {/* Error */}
            {error && (
              <p className="login-error" role="alert">{error}</p>
            )}

            {/* Forgot */}
            <Link to="/forgot-password" className="login-forgot">
              Forgot your password?
            </Link>

            {/* CTA button */}
            <div className="login-actions">
              <button
                type="submit"
                className="login-cta"
                disabled={loading || !email || !password}
                aria-disabled={loading}
              >
                <span>{loading ? 'Signing in…' : 'Sign In'}</span>
                {/* Diagonal shimmer */}
                <span className="login-cta-shimmer" aria-hidden="true" />
              </button>
            </div>

            <p className="login-signup-hint">
              New to NOMAD?{' '}
              <Link to="/contact" className="login-signup-link">Get in touch</Link>
            </p>
          </form>
        </div>

        {/* ─── RIGHT PANEL (desktop only) ─── */}
        <div className="login-right" aria-hidden="true">
          <img
            src={loginImg}
            alt=""
            className="login-right-img"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </div>
  )
}
