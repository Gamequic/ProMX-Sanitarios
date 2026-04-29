import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const testimonials = [
  {
    name: 'Ricardo Flores',
    role: 'Contratista de construcción',
    initials: 'RF',
    color: '#004FC4',
    quote: 'Llevamos 8 meses trabajando con ProMX en varias obras por Juárez. Siempre puntuales, los sanitarios limpios y nunca nos han fallado. Los recomiendo al 100%.',
    stars: 5,
  },
  {
    name: 'Lupita Martínez',
    role: 'Organizadora de eventos',
    initials: 'LM',
    color: '#F97316',
    quote: 'Para una boda de 300 personas me rentaron 4 sanitarios ejecutivos VIP. Quedaron perfectos y mis clientes ni los notaron como "portátiles", se veían muy elegantes.',
    stars: 5,
  },
  {
    name: 'Carlos Domínguez',
    role: 'Supervisor de planta industrial',
    initials: 'CD',
    color: '#16A34A',
    quote: 'Necesitábamos sanitarios rápido para una obra fuera de la ciudad. ProMX los llevó hasta Valle de Juárez sin problema. Excelente disposición y precio justo.',
    stars: 5,
  },
  {
    name: 'Sandra Ríos',
    role: 'Coordinadora de festival',
    initials: 'SR',
    color: '#7C3AED',
    quote: 'Festival de 2 días con cientos de asistentes. ProMX hizo el mantenimiento diario como quedamos. Cero quejas del público sobre los baños. Muy profesionales.',
    stars: 5,
  },
]

function TestimonialCard({ t, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12 }}
      style={{
        background: '#fff', borderRadius: 20, padding: 28,
        border: '1px solid var(--gray-200)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        display: 'flex', flexDirection: 'column', gap: 20,
      }}
    >
      {/* Stars */}
      <div style={{ display: 'flex', gap: 3 }}>
        {[...Array(t.stars)].map((_, i) => <span key={i} style={{ color: '#FCD34D', fontSize: 16 }}>★</span>)}
      </div>

      {/* Quote */}
      <p style={{ fontSize: 15, color: 'var(--gray-700)', lineHeight: 1.7, fontStyle: 'italic', flexGrow: 1 }}>
        "{t.quote}"
      </p>

      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          background: t.color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 800, fontSize: 15, flexShrink: 0,
          fontFamily: 'Barlow Condensed, sans-serif',
        }}>
          {t.initials}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--gray-900)' }}>{t.name}</div>
          <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>{t.role}</div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="section">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <div className="pill">Testimoniales</div>
          <h2 className="section-title">
            Lo que dicen<br /><span>nuestros clientes</span>
          </h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Más de 200 clientes confían en ProMX Sanitarios para sus eventos, obras y proyectos en Ciudad Juárez.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 24,
        }}>
          {testimonials.map((t, i) => <TestimonialCard key={i} t={t} index={i} inView={inView} />)}
        </div>
      </div>
    </section>
  )
}
