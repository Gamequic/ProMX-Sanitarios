import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { MessageCircle } from 'lucide-react'

const services = [
  {
    emoji: '🔵',
    color: '#EFF6FF',
    accent: 'var(--blue)',
    name: 'Sanitario Estándar',
    desc: 'Ideal para obras de construcción y eventos al aire libre. Resistente, funcional y fácil de mantener.',
    features: ['Tanque de 90 litros', 'Ventilación superior', 'Dispensador de papel', 'Fácil limpieza'],
  },
  {
    emoji: '⭐',
    color: '#FFF7ED',
    accent: '#F97316',
    name: 'Sanitario Ejecutivo VIP',
    desc: 'Para eventos corporativos, bodas y quinceañeras donde la comodidad marca la diferencia.',
    features: ['Lavamanos con espejo', 'Iluminación interior', 'Piso antideslizante', 'Acabados premium'],
    popular: true,
  },
  {
    emoji: '♿',
    color: '#F0FDF4',
    accent: '#16A34A',
    name: 'Sanitario Accesible',
    desc: 'Diseñado para personas con movilidad reducida, cumpliendo con normativas de accesibilidad.',
    features: ['Espacio amplio 1.5m²', 'Barras de apoyo', 'Rampa de acceso', 'Puerta extra ancha'],
  },
  {
    emoji: '🚿',
    color: '#F5F3FF',
    accent: '#7C3AED',
    name: 'Módulo con Regadera',
    desc: 'Combinación de sanitario y regadera para campamentos, eventos largos o zonas de trabajo remoto.',
    features: ['Regadera con cortina', 'Agua fría y caliente', 'Jabonera y gancho', 'Privacidad total'],
  },
]

function ServiceCard({ service, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      style={{
        background: '#fff',
        borderRadius: 20,
        padding: 28,
        border: '1.5px solid var(--gray-200)',
        position: 'relative',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        cursor: 'default',
        overflow: 'hidden',
      }}
    >
      {service.popular && (
        <div style={{
          position: 'absolute', top: 16, right: 16,
          background: 'var(--orange)', color: '#fff',
          fontSize: 11, fontWeight: 700, letterSpacing: 1,
          padding: '4px 12px', borderRadius: 100,
        }}>
          MÁS SOLICITADO
        </div>
      )}

      <div style={{
        width: 56, height: 56, borderRadius: 16,
        background: service.color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 28, marginBottom: 20,
      }}>
        {service.emoji}
      </div>

      <h3 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 22, fontWeight: 800, color: 'var(--gray-900)', marginBottom: 10 }}>
        {service.name}
      </h3>
      <p style={{ fontSize: 14, color: 'var(--gray-500)', lineHeight: 1.65, marginBottom: 20 }}>
        {service.desc}
      </p>

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
        {service.features.map((f, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--gray-700)' }}>
            <span style={{ color: service.accent, fontWeight: 700 }}>✓</span>
            {f}
          </li>
        ))}
      </ul>

      <a
        href={`https://wa.me/526563182873?text=Hola%2C%20me%20interesa%20el%20${encodeURIComponent(service.name)}`}
        target="_blank" rel="noopener noreferrer"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          width: '100%', padding: '11px 0', borderRadius: 10,
          background: service.color, color: service.accent,
          fontWeight: 700, fontSize: 14, textDecoration: 'none',
          border: `1.5px solid ${service.accent}22`,
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = service.accent; e.currentTarget.style.color = '#fff' }}
        onMouseLeave={e => { e.currentTarget.style.background = service.color; e.currentTarget.style.color = service.accent }}
      >
        <MessageCircle size={15} />
        Cotizar este servicio
      </a>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section" id="servicios" style={{ background: 'var(--gray-50)' }}>
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <div className="pill">Nuestros Servicios</div>
          <h2 className="section-title" style={{ marginBottom: 16 }}>
            El sanitario correcto<br /><span>para cada necesidad</span>
          </h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Desde obras de construcción hasta bodas de lujo, tenemos la solución higiénica perfecta para ti.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 24,
        }}>
          {services.map((s, i) => <ServiceCard key={i} service={s} index={i} />)}
        </div>
      </div>
    </section>
  )
}
