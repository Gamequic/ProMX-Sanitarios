import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

const links = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Eventos', href: '#eventos' },
  { label: 'Cotizador', href: '#cotizador' },
  { label: 'Contacto', href: '#contacto' },
]

const WA = 'https://wa.me/526563182873'
const TEL = 'tel:+526563182873'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
          borderBottom: scrolled ? '1px solid #E2E8F0' : 'none',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', gap: 16 }}>
          {/* Logo */}
          <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <img
              src="/logo.jpg"
              alt="ProMx Sanitarios"
              style={{
                height: 52, width: 52, borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--orange)',
                boxShadow: scrolled ? '0 2px 8px rgba(0,0,0,0.15)' : '0 2px 12px rgba(0,0,0,0.3)',
              }}
            />
          </a>

          {/* Desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="nav-desktop">
            {links.map(l => (
              <a key={l.href} href={l.href} style={{
                textDecoration: 'none', fontSize: 14, fontWeight: 600,
                color: scrolled ? 'var(--gray-700)' : 'rgba(255,255,255,0.9)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = scrolled ? 'var(--orange)' : '#fff'}
              onMouseLeave={e => e.target.style.color = scrolled ? 'var(--gray-700)' : 'rgba(255,255,255,0.9)'}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <a href={TEL} className="nav-desktop" style={{
              display: 'flex', alignItems: 'center', gap: 6,
              textDecoration: 'none', fontSize: 14, fontWeight: 700,
              color: scrolled ? 'var(--gray-700)' : '#fff',
            }}>
              <Phone size={15} />
              656 318-2873
            </a>
            <a href="#cotizador" className="btn-orange" style={{ padding: '10px 18px', fontSize: 13 }}>
              Cotizar Ahora
            </a>
            <button
              onClick={() => setOpen(o => !o)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: scrolled ? 'var(--gray-700)' : '#fff', display: 'none' }}
              className="nav-menu-btn"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', top: 76, left: 0, right: 0, zIndex: 99,
              background: '#fff', borderBottom: '1px solid var(--gray-200)',
              padding: '20px 20px 24px',
              display: 'flex', flexDirection: 'column', gap: 4,
            }}
          >
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
                textDecoration: 'none', padding: '12px 0',
                fontSize: 16, fontWeight: 600, color: 'var(--gray-700)',
                borderBottom: '1px solid var(--gray-100)',
              }}>
                {l.label}
              </a>
            ))}
            <a href={TEL} style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', padding: '12px 0', fontSize: 16, fontWeight: 700, color: 'var(--orange)' }}>
              <Phone size={16} /> 656 318-2873
            </a>
            <a href="#cotizador" className="btn-orange" style={{ marginTop: 8, justifyContent: 'center' }} onClick={() => setOpen(false)}>
              Cotizar Ahora
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
