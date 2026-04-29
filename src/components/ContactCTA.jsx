import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MessageCircle, Phone, Mail, MapPin, Clock } from 'lucide-react'

const info = [
  { icon: <Phone size={18} />, label: 'Teléfono', value: '656 318-2873', href: 'tel:+526563182873' },
  { icon: <MessageCircle size={18} />, label: 'WhatsApp', value: '+52 656 318-2873', href: 'https://wa.me/526563182873' },
  { icon: <Mail size={18} />, label: 'Correo', value: 'info@promxsanitarios.mx', href: 'mailto:info@promxsanitarios.mx' },
  { icon: <MapPin size={18} />, label: 'Ciudad', value: 'Ciudad Juárez, Chihuahua', href: null },
  { icon: <Clock size={18} />, label: 'Horario', value: 'Lun–Sáb 7am–7pm | Emergencias 24/7', href: null },
]

export default function ContactCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="section" id="contacto" style={{
      background: 'linear-gradient(135deg, var(--blue-dark) 0%, var(--blue) 100%)',
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>

          {/* Left */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.12)', borderRadius: 100,
              padding: '6px 16px', marginBottom: 20,
              color: 'rgba(255,255,255,0.9)', fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase',
            }}>
              Contacto
            </div>
            <h2 style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 900, lineHeight: 1.05,
              color: '#fff', marginBottom: 20,
            }}>
              ¿Listo para cotizar?<br />
              <span style={{ color: '#FFA07A' }}>Escríbenos ahora</span>
            </h2>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: 36 }}>
              Respondemos en minutos. Dinos cuántos sanitarios necesitas, el lugar y la duración y te damos precio de inmediato.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              <a
                href="https://wa.me/526563182873?text=Hola%2C%20quiero%20cotizar%20renta%20de%20sanitarios"
                target="_blank" rel="noopener noreferrer"
                className="btn-orange"
                style={{ fontSize: 16, padding: '16px 32px' }}
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
              <a href="tel:+526563182873" className="btn-ghost" style={{ fontSize: 16 }}>
                <Phone size={18} />
                Llamar
              </a>
            </div>
          </motion.div>

          {/* Right — contact info card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              background: 'rgba(255,255,255,0.08)',
              borderRadius: 20,
              border: '1px solid rgba(255,255,255,0.15)',
              padding: 32,
              backdropFilter: 'blur(8px)',
            }}
          >
            <h3 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 24 }}>
              Información de contacto
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {info.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: 'rgba(255,255,255,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.8)', flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 2 }}>
                      {item.label}
                    </div>
                    {item.href ? (
                      <a href={item.href} style={{ color: '#fff', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}
                        onMouseEnter={e => e.target.style.color = '#FFA07A'}
                        onMouseLeave={e => e.target.style.color = '#fff'}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span style={{ color: '#fff', fontWeight: 600, fontSize: 15 }}>{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contacto .container > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
