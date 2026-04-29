import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MessageCircle, Truck, RefreshCw } from 'lucide-react'

const steps = [
  {
    step: '01',
    icon: <MessageCircle size={28} />,
    title: 'Cotiza en segundos',
    desc: 'Escríbenos por WhatsApp o llámanos. Dinos cuántos sanitarios necesitas, por cuánto tiempo y para qué tipo de evento u obra.',
    color: 'var(--blue)',
    bg: '#EFF6FF',
  },
  {
    step: '02',
    icon: <Truck size={28} />,
    title: 'Entregamos a tu lugar',
    desc: 'Coordinamos la entrega en la fecha y hora que te acomoden. Instalamos y dejamos todo listo para que empieces a usar de inmediato.',
    color: '#F97316',
    bg: '#FFF7ED',
  },
  {
    step: '03',
    icon: <RefreshCw size={28} />,
    title: 'Mantenimiento y retiro',
    desc: 'Durante el período de renta hacemos las limpiezas acordadas. Al terminar recogemos el equipo. Sin complicaciones para ti.',
    color: '#16A34A',
    bg: '#F0FDF4',
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section" id="como-funciona">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <div className="pill">Proceso Simple</div>
          <h2 className="section-title">
            Rentar es<br /><span>más fácil que nunca</span>
          </h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            En tres pasos tienes tu sanitario instalado y funcionando. Sin papeleo complicado, sin sorpresas.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 32,
          position: 'relative',
        }}>
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.15 }}
              style={{ textAlign: 'center' }}
            >
              {/* Step number */}
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: 24 }}>
                <div style={{
                  width: 80, height: 80, borderRadius: '50%',
                  background: s.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: s.color, margin: '0 auto',
                }}>
                  {s.icon}
                </div>
                <div style={{
                  position: 'absolute', top: -8, right: -8,
                  width: 28, height: 28, borderRadius: '50%',
                  background: s.color, color: '#fff',
                  fontSize: 11, fontWeight: 900,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Barlow Condensed, sans-serif',
                }}>
                  {i + 1}
                </div>
              </div>

              <h3 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 22, fontWeight: 800, marginBottom: 12, color: 'var(--gray-900)' }}>
                {s.title}
              </h3>
              <p style={{ fontSize: 15, color: 'var(--gray-500)', lineHeight: 1.7 }}>
                {s.desc}
              </p>

              {/* Connector arrow (not on last) */}
              {i < steps.length - 1 && (
                <div className="step-arrow" style={{
                  position: 'absolute',
                  top: 40,
                  left: `calc(${(i + 1) * (100 / steps.length)}% - 20px)`,
                  fontSize: 24, color: 'var(--gray-300)',
                }}>
                  →
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA after steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.7 }}
          style={{ textAlign: 'center', marginTop: 56 }}
        >
          <a
            href="https://wa.me/526563182873?text=Hola%2C%20quiero%20cotizar%20renta%20de%20sanitarios"
            target="_blank" rel="noopener noreferrer"
            className="btn-orange"
            style={{ fontSize: 16, padding: '16px 36px' }}
          >
            <MessageCircle size={18} />
            Empezar ahora por WhatsApp
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) { .step-arrow { display: none; } }
      `}</style>
    </section>
  )
}
