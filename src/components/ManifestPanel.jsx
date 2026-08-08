import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import ProductPrice from './ProductPrice'

const EASE = [0.22, 1, 0.36, 1]

export default function ManifestPanel() {
  const { state, dispatch, totalItems, totalPrice } = useCart()
  const { items, panelOpen, sealedStatus } = state

  // Format timestamp (e.g. 7:12 AM)
  const formatTime = (ts) => {
    return new Date(ts).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  }

  const sealManifest = () => {
    dispatch({ type: 'SEAL_START' })
    // Delay clearing the cart to show confirmation message briefly
    setTimeout(() => {
      dispatch({ type: 'SEAL_FINISH' })
    }, 2000)
  }

  // Trap focus / close on escape (basic a11y)
  useEffect(() => {
    if (!panelOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') dispatch({ type: 'TOGGLE_PANEL', payload: false })
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [panelOpen, dispatch])

  // Prevent background scrolling when panel is open
  useEffect(() => {
    if (panelOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [panelOpen])

  return (
    <AnimatePresence>
      {panelOpen && (
        <>
          <motion.div
            className="manifest-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={() => dispatch({ type: 'TOGGLE_PANEL', payload: false })}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(4px)',
              zIndex: 90
            }}
          />
          <motion.div
            className="manifest-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '480px',
              backgroundColor: '#111312',
              color: '#f4f1e9',
              zIndex: 100,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-10px 0 40px rgba(0,0,0,0.3)',
            }}
          >
            {/* Header */}
            <header style={{ padding: '40px 32px 24px', flexShrink: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p className="eyebrow" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>Your loadout</p>
                <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '28px', margin: 0 }}>The Manifest</h2>
              </div>
              <button 
                onClick={() => dispatch({ type: 'TOGGLE_PANEL', payload: false })}
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '8px', margin: '-8px' }}
                aria-label="Close Manifest"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </header>

            {/* Body */}
            <div className="manifest-body" style={{ flexGrow: 1, overflowY: 'auto', padding: '0 32px' }}>
              {sealedStatus ? (
                <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    style={{ textAlign: 'center' }}
                  >
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#E26D3F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px' }}>
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '24px', margin: '0 0 8px' }}>Manifest sealed.</h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)' }}>Your loadout has been logged.</p>
                  </motion.div>
                </div>
              ) : items.length === 0 ? (
                <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', fontFamily: 'Manrope, sans-serif' }}>
                  Nothing logged yet
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div 
                        key={`${item.id}-${item.variant}`}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0, overflow: 'hidden', padding: 0, border: 'none', transition: { duration: 0.2 } }}
                        style={{ 
                          padding: '24px 0', 
                          borderBottom: '1px solid rgba(255,255,255,0.12)' 
                        }}
                      >
                        <time style={{ 
                          display: 'block', 
                          color: '#E26D3F', 
                          fontSize: '12px', 
                          fontWeight: 700, 
                          letterSpacing: '0.08em', 
                          marginBottom: '12px', 
                          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' 
                        }}>
                          {formatTime(item.addedAt)}
                        </time>
                        
                        <div style={{ display: 'flex', gap: '16px' }}>
                          <div style={{ flexShrink: 0, width: '70px', height: '70px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src={item.img} alt={item.name} style={{ width: '80%', height: 'auto', objectFit: 'contain' }} />
                          </div>
                          
                          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                              <div>
                                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '18px', margin: '0 0 4px', lineHeight: 1.2 }}>{item.name}</h3>
                                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', margin: 0 }}>{item.variant}</p>
                              </div>
                              <div style={{ fontWeight: 600, fontSize: '15px' }}>
                                <ProductPrice priceString={item.price} />
                              </div>
                            </div>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '16px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px' }}>
                                <button 
                                  onClick={() => dispatch({ type: 'DECREMENT', payload: item })}
                                  style={{ background: 'none', border: 'none', color: '#fff', padding: '4px 12px', cursor: 'pointer' }}
                                  aria-label="Decrease quantity"
                                >−</button>
                                <span style={{ fontSize: '13px', width: '20px', textAlign: 'center', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}>{item.quantity}</span>
                                <button 
                                  onClick={() => dispatch({ type: 'INCREMENT', payload: item })}
                                  style={{ background: 'none', border: 'none', color: '#fff', padding: '4px 12px', cursor: 'pointer' }}
                                  aria-label="Increase quantity"
                                >+</button>
                              </div>
                              
                              <button 
                                onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item })}
                                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', textDecoration: 'underline', fontSize: '12px', cursor: 'pointer', padding: 0 }}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && !sealedStatus && (
              <motion.footer 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ 
                  flexShrink: 0, 
                  padding: '24px 32px calc(24px + max(12px, env(safe-area-inset-bottom)))', 
                  borderTop: '2px solid rgba(255,255,255,0.2)',
                  background: '#111312',
                  // Ensure we clear the mobile nav on small screens
                  paddingBottom: 'calc(max(24px, 90px + env(safe-area-inset-bottom)))'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '18px', fontWeight: 600, fontFamily: 'Syne, sans-serif' }}>
                  <span>Total</span>
                  <span><ProductPrice priceString={totalPrice} /></span>
                </div>
                
                <button 
                  onClick={sealManifest}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: '#fff',
                    color: '#111312',
                    border: 'none',
                    borderRadius: '0',
                    fontFamily: 'Syne, sans-serif',
                    fontSize: '15px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                    marginBottom: '16px',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--paper, #f4f1e9)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                >
                  Seal the Manifest
                </button>
                
                <p style={{ 
                  fontSize: '11px', 
                  color: 'rgba(255,255,255,0.4)', 
                  lineHeight: 1.5, 
                  textAlign: 'center', 
                  margin: 0 
                }}>
                  NOMAD X1 is a fictional product concept made for an academic demonstration — no real order will be placed.
                </p>
              </motion.footer>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
