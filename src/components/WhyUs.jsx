import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Shield, Clock, DollarSign, HeartHandshake, Wrench, MapPin } from 'lucide-react'

const reasons = [
  { icon: <Shield size={22} />, color: '#EFF6FF', accent: 'var(--blue)', title: 'Higiene Garantizada', desc: 'Cada unidad es desinfectada y preparada antes de la entrega. Tu tranquilidad es nuestra prioridad.' },
  { icon: <Clock size={22} />, color: '#FFF7ED', accent: '#F97316', title: 'Entrega Puntual', desc: 'Respetamos el tiempo acordado. Llegamos cuando dijimos, instalamos rápido y sin complicarte el día.' },
  { icon: <DollarSign size={22} />, color: '#F0FDF4', accent: '#16A34A', title: 'Precios Transparentes', desc: 'Sin cobros escondidos ni sorpresas al final. El precio que te cotizamos es el precio que pagas.' },
  { icon: <HeartHandshake size={22} />, color: '#FDF4FF', accent: '#7C3AED', title: 'Atención Personalizada', desc: 'Somos una empresa local y te atendemos directamente. Siempre hay alguien para resolver tus dudas.' },
  { icon: <Wrench size={22} />, color: '#FFF1F2', accent: '#DC2626', title: 'Mantenimiento Incluido', desc: 'Hacemos limpieza y reabastecimiento según el período de renta. Nunca te dejamos sin servicio.' },
  { icon: <MapPin size={22} />, color: '#FFFBEB', accent: '#D97706', title: 'Zona Norte Cubierta', desc: 'Servicio en toda Ciudad Juárez y área metropolitana. Llevamos hasta donde nos necesites.' },
]

function Card({ item, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.08)', transition: { duration: 0.2 } }}
      style={{
        background: '#fff', borderRadius: 16, padding: '28px 24px',
        border: '1px solid var(--gray-200)',
        display: 'flex', flexDirection: 'column', gap: 14,
      }}
    >
      <div style={{
        width: 48, height: 48, borderRadius: 14,
        background: item.color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: item.accent, flexShrink: 0,
      }}>
        {item.icon}
      </div>
      <div>
        <h3 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 19, fontWeight: 800, marginBottom: 8, color: 'var(--gray-900)' }}>
          {item.title}
        </h3>
        <p style={{ fontSize: 14, color: 'var(--gray-500)', lineHeight: 1.65 }}>
          {item.desc}
        </p>
      </div>
    </motion.div>
  )
}

export default function WhyUs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="section" id="por-que-nosotros" style={{ background: 'var(--gray-50)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
          {/* Left text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="pill">¿Por qué ProMX?</div>
            <h2 className="section-title">
              Más que una renta,<br /><span>un servicio completo</span>
            </h2>
            <p className="section-sub" style={{ marginBottom: 32 }}>
              En ProMX Sanitarios no solo te prestamos una unidad. Te damos la tranquilidad de saber que todo está cubierto, desde la entrega hasta el retiro.
            </p>

            <div style={{
              background: 'var(--blue)', borderRadius: 16,
              padding: '24px', color: '#fff',
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>
                Empresas locales confían en nosotros
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: 'rgba(255,255,255,0.85)' }}>
                Hemos trabajado con constructoras, organizadores de eventos, empresas mineras y comunidades de Ciudad Juárez y zona norte de Chihuahua.
              </p>
            </div>
          </motion.div>

          {/* Right grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {reasons.map((item, i) => <Card key={i} item={item} index={i} inView={inView} />)}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #por-que-nosotros .container > div { grid-template-columns: 1fr !important; }
          #por-que-nosotros .container > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
