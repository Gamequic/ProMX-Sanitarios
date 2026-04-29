import { Phone, MessageCircle } from 'lucide-react'

function FbIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

const links = [
  { label: 'Servicios', href: '#servicios' },
  { label: '¿Cómo funciona?', href: '#como-funciona' },
  { label: '¿Por qué nosotros?', href: '#por-que-nosotros' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--gray-900)', padding: '48px 20px 28px' }}>
      <div className="container">
        <div style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr',
          gap: 40, marginBottom: 40,
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <img src="/logo.jpg" alt="ProMx Sanitarios" style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--orange)' }} />

              <div style={{ lineHeight: 1.1 }}>
                <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 20, color: '#fff', display: 'block' }}>ProMX</span>
                <span style={{ fontSize: 10, color: 'var(--gray-400)', letterSpacing: 1 }}>SANITARIOS</span>
              </div>
            </div>
            <p style={{ fontSize: 14, color: 'var(--gray-400)', lineHeight: 1.7, maxWidth: 280 }}>
              Renta de sanitarios portátiles en Ciudad Juárez y zona norte de Chihuahua. Higiene, puntualidad y precio justo.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              <a href="https://www.facebook.com/p/ProMx-Renta-de-Mobiliario-100069972773623/" target="_blank" rel="noopener noreferrer"
                style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-400)', textDecoration: 'none', transition: 'background 0.2s, color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#1877F2'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'var(--gray-400)' }}
              >
                <FbIcon />
              </a>
              <a href="https://wa.me/526563182873" target="_blank" rel="noopener noreferrer"
                style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-400)', textDecoration: 'none', transition: 'background 0.2s, color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#25D366'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'var(--gray-400)' }}
              >
                <MessageCircle size={16} />
              </a>
              <a href="tel:+526563182873"
                style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-400)', textDecoration: 'none', transition: 'background 0.2s, color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--blue)'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'var(--gray-400)' }}
              >
                <Phone size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 16 }}>
              Navegación
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {links.map(l => (
                <li key={l.href}>
                  <a href={l.href} style={{ color: 'var(--gray-400)', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#fff'}
                    onMouseLeave={e => e.target.style.color = 'var(--gray-400)'}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 16 }}>
              Contacto rápido
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href="tel:+526563182873" style={{ color: 'var(--gray-400)', textDecoration: 'none', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>(656 318-2873</a>
              <a href="https://wa.me/526563182873" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>WhatsApp disponible</a>
              <span style={{ color: 'var(--gray-500)', fontSize: 13 }}>Ciudad Juárez, Chih.</span>
              <span style={{ color: 'var(--gray-500)', fontSize: 13 }}>Lun–Sáb 7am–7pm</span>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ color: 'var(--gray-500)', fontSize: 13 }}>
            © 2024 ProMX Sanitarios. Todos los derechos reservados.
          </span>
          <span style={{ color: 'var(--gray-600)', fontSize: 12 }}>
            Ciudad Juárez, Chihuahua, México
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer .container > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
