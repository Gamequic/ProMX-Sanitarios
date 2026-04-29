import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const stats = [
  { value: 200, suffix: '+', label: 'Clientes satisfechos' },
  { value: 5, suffix: '+', label: 'Años de experiencia' },
  { value: 24, suffix: '/7', label: 'Soporte disponible' },
  { value: 100, suffix: '%', label: 'Garantía de entrega' },
]

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1600
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <span ref={ref} style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 56, fontWeight: 900, color: '#fff', lineHeight: 1 }}>
      {count}{suffix}
    </span>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section style={{ background: 'var(--blue)', padding: '64px 20px' }}>
      <div className="container">
        <div ref={ref} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 40,
          textAlign: 'center',
        }}>
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Counter target={s.value} suffix={s.suffix} />
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 500, marginTop: 6 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
