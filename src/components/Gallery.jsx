import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const events = [
  { img: '/gallery/evento-belinda.jpg', artist: 'Belinda', event: 'Expogan Juárez 2025', date: '17 Oct 2025' },
  { img: '/gallery/evento-grupo-firme.jpg', artist: 'Grupo Firme', event: 'Expogan Juárez 2025', date: '2 Nov 2025' },
  { img: '/gallery/evento-tigres-norte.jpg', artist: 'Tigres del Norte', event: 'Expogan Juárez 2025', date: '24 Oct 2025' },
  { img: '/gallery/evento-chayanne.jpg', artist: 'Chayanne', event: 'Estadio Carta Blanca', date: '28 Abr 2026' },
  { img: '/gallery/evento-mike-towers.jpg', artist: 'Mike Towers', event: 'Expogan Juárez 2025', date: '25 Oct 2025' },
  { img: '/gallery/evento-gera-aleman.jpg', artist: 'Gera MX & Alemán', event: 'Expogan Juárez 2025', date: '23 Oct 2025' },
  { img: '/gallery/evento-india-yuridia.jpg', artist: 'India Yuridia', event: 'Expogan Juárez 2025', date: '19 Oct 2025' },
  { img: '/gallery/evento-conjunto-primavera.jpg', artist: 'Conjunto Primavera', event: 'Expogan Juárez 2025', date: '16 Oct 2025' },
  { img: '/gallery/evento-tito-double-p.jpg', artist: 'Tito Double P', event: 'Expogan Juárez 2025', date: '18 Oct 2025' },
  { img: '/gallery/evento-marca-registrada.jpg', artist: 'Marca Registrada', event: 'Expogan Juárez 2025', date: '30 Oct 2025' },
  { img: '/gallery/evento-fms.jpg', artist: 'FMS Internacional México', event: 'Plaza de la Mexicanidad', date: '25 Abr 2026' },
]

const realPhotos = [
  { img: '/gallery/sanitarios-expogan.jpg', label: 'Expogan Juárez 2025', sub: 'Sanitarios amarillos en campo' },
  { img: '/gallery/trailer-vip.jpg', label: 'Remolque VIP', sub: '"Vive la Experiencia" — Sanitarios VIP' },
  { img: '/gallery/sanitarios-industrial.jpg', label: 'Zona Industrial', sub: 'Fila de unidades en planta' },
  { img: '/gallery/sanitarios-pares.jpg', label: 'Entrega en sitio', sub: 'Unidades listas para el evento' },
  { img: '/gallery/sanitario-construccion.jpg', label: 'Obra de construcción', sub: 'Renta mensual disponible' },
]

function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const item = items[index]
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.92)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
      }}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.88, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        style={{ position: 'relative', maxWidth: 680, width: '100%' }}
      >
        <img src={item.img} alt={item.artist || item.label} style={{ width: '100%', borderRadius: 16, display: 'block', maxHeight: '80vh', objectFit: 'contain' }} />
        <div style={{ marginTop: 12, textAlign: 'center' }}>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>{item.artist || item.label}</div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>{item.event || item.sub}{item.date ? ` — ${item.date}` : ''}</div>
        </div>
        <button onClick={onClose} style={{ position: 'absolute', top: -16, right: -16, background: 'var(--orange)', border: 'none', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <X size={18} />
        </button>
        {items.length > 1 && (
          <>
            <button onClick={e => { e.stopPropagation(); onPrev() }} style={{ position: 'absolute', left: -48, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: '50%', width: 40, height: 40, cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ChevronLeft size={20} />
            </button>
            <button onClick={e => { e.stopPropagation(); onNext() }} style={{ position: 'absolute', right: -48, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: '50%', width: 40, height: 40, cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

function EventCard({ item, index, inView, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={{ scale: 1.03, y: -4, transition: { duration: 0.2 } }}
      onClick={onClick}
      style={{ cursor: 'pointer', borderRadius: 16, overflow: 'hidden', position: 'relative', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
    >
      <img src={item.img} alt={item.artist} style={{ width: '100%', height: 260, objectFit: 'cover', display: 'block' }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
        padding: '32px 16px 16px',
      }}>
        <div style={{ color: '#fff', fontWeight: 800, fontSize: 16, fontFamily: 'Barlow Condensed, sans-serif', lineHeight: 1.2 }}>{item.artist}</div>
        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 }}>{item.event} · {item.date}</div>
      </div>
      <div style={{
        position: 'absolute', top: 10, right: 10,
        background: 'var(--orange)', color: '#fff',
        fontSize: 10, fontWeight: 800, letterSpacing: 0.5,
        padding: '3px 10px', borderRadius: 100,
        textTransform: 'uppercase',
      }}>
        VIP
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [lightbox, setLightbox] = useState(null) // { items, index }

  const openEvent = idx => setLightbox({ items: events, index: idx })
  const openPhoto = idx => setLightbox({ items: realPhotos, index: idx })

  const prev = () => setLightbox(lb => ({ ...lb, index: (lb.index - 1 + lb.items.length) % lb.items.length }))
  const next = () => setLightbox(lb => ({ ...lb, index: (lb.index + 1) % lb.items.length }))

  return (
    <section id="eventos" style={{ background: 'var(--gray-900)', padding: '90px 20px' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,87,34,0.15)', borderRadius: 100,
            padding: '6px 16px', marginBottom: 16,
            color: '#FF8A65', fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
          }}>
            ⭐ Presencia Comprobada
          </div>
          <h2 style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontSize: 'clamp(36px, 5vw, 58px)',
            fontWeight: 900, lineHeight: 1.05, color: '#fff', marginBottom: 16,
          }}>
            Presentes en los<br />
            <span style={{ color: 'var(--orange)' }}>mejores eventos</span>
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.55)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Desde Expogan 2025 hasta Chayanne — ProMx ha cubierto los conciertos más grandes de Ciudad Juárez con sus Sanitarios VIP y Deluxe.
          </p>
        </motion.div>

        {/* Events grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 16,
          marginBottom: 56,
        }}>
          {events.map((e, i) => (
            <EventCard key={i} item={e} index={i} inView={inView} onClick={() => openEvent(i)} />
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 48, marginBottom: 40 }}
        >
          <h3 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 28, fontWeight: 800, color: '#fff', marginBottom: 8 }}>
            Nuestros sanitarios en acción
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15 }}>Fotos reales de unidades instaladas en eventos y obras</p>
        </motion.div>

        {/* Real photos grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 14,
        }}>
          {realPhotos.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.5 + i * 0.08 }}
              whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
              onClick={() => openPhoto(i)}
              style={{ cursor: 'pointer', borderRadius: 14, overflow: 'hidden', position: 'relative', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
            >
              <img src={p.img} alt={p.label} style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }} />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                padding: '24px 12px 12px',
              }}>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>{p.label}</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>{p.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            items={lightbox.items}
            index={lightbox.index}
            onClose={() => setLightbox(null)}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 500px) {
          #eventos .container > div:nth-child(3) { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  )
}
