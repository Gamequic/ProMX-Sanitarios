import { motion } from 'framer-motion'
import { Phone, ArrowDown } from 'lucide-react'

const WA = 'https://wa.me/526563182873?text=Hola%2C%20quiero%20cotizar'
const TEL = 'tel:+526563182873'

const services = [
  '🚽 Sanitarios Portátiles',
  '⛺ Carpas',
  '💨 Aires Evaporativos',
  '⚡ Generadores',
  '🪑 Mesas y Sillas',
  '🚿 Regaderas Portátiles',
  '🔊 Sonido Profesional',
  '🏗️ Obras y Construcción',
]

/* Floating badge component */
function FloatBadge({ emoji, label, style, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 200 }}
      style={{
        position: 'absolute',
        background: '#fff',
        borderRadius: 50,
        padding: '8px 14px',
        display: 'flex', alignItems: 'center', gap: 6,
        boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
        fontSize: 13, fontWeight: 700, color: '#1A1A1A',
        whiteSpace: 'nowrap',
        zIndex: 3,
        ...style,
      }}
    >
      <span style={{ fontSize: 18 }}>{emoji}</span>
      {label}
    </motion.div>
  )
}

export default function Hero() {
  const letters = 'RÉNTAME'.split('')

  return (
    <section style={{
      minHeight: '100vh',
      background: '#fff',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Background orange shape */}
      <div style={{
        position: 'absolute',
        top: 0, right: 0,
        width: '48%', height: '100%',
        background: 'linear-gradient(150deg, #FF5722 0%, #FF8C00 60%, #FFB800 100%)',
        clipPath: 'polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%)',
        zIndex: 0,
      }} />

      {/* Animated decorative circles */}
      {[
        { w: 300, h: 300, top: -80, right: -60, op: 0.12 },
        { w: 180, h: 180, top: 200, right: 60,  op: 0.1  },
        { w: 120, h: 120, bottom: 100, right: 200, op: 0.08 },
      ].map((c, i) => (
        <motion.div key={i}
          animate={{ scale: [1, 1.08, 1], rotate: [0, 6, 0] }}
          transition={{ duration: 5 + i * 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', borderRadius: '50%',
            background: '#FFD700',
            width: c.w, height: c.h,
            top: c.top, right: c.right, bottom: c.bottom,
            opacity: c.op, zIndex: 1,
          }}
        />
      ))}

      {/* Main content */}
      <div className="container" style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, alignItems: 'center', padding: '120px 20px 60px', position: 'relative', zIndex: 2 }}>

        {/* LEFT */}
        <div style={{ paddingRight: 32 }}>
          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#FFF3E0', border: '1.5px solid #FF5722', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF5722', display: 'inline-block' }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#FF5722' }}>Ciudad Juárez, Chihuahua</span>
          </motion.div>

          {/* RÉNTAME animated letters */}
          <div style={{ marginBottom: 12, lineHeight: 0.9 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {letters.map((l, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontFamily: 'Barlow Condensed, sans-serif',
                    fontWeight: 900,
                    fontSize: 'clamp(72px, 10vw, 120px)',
                    lineHeight: 0.9,
                    background: 'linear-gradient(135deg, #FF5722 0%, #FF8C00 50%, #FFB800 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    display: 'inline-block',
                  }}
                >
                  {l}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            style={{ fontSize: 'clamp(15px, 2vw, 19px)', color: '#555', lineHeight: 1.6, marginBottom: 28, maxWidth: 440 }}
          >
            Sanitarios Portátiles · Carpas · Aires Evaporativos<br />
            Generadores · Mesas · Sonido y Mucho Más
          </motion.p>

          {/* Phone badge */}
          <motion.a
            href={TEL}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: '#1A1A1A', color: '#FFB800',
              padding: '12px 22px', borderRadius: 50,
              textDecoration: 'none', marginBottom: 28,
              fontFamily: 'Barlow Condensed, sans-serif',
              fontSize: 22, fontWeight: 800, letterSpacing: 0.5,
            }}
          >
            <Phone size={18} color="#FF5722" />
            656 318-2873
          </motion.a>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.95 }}
            style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}
          >
            <motion.a
              href="#cotizador"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: '#FF5722', color: '#fff',
                padding: '16px 32px', borderRadius: 12,
                fontWeight: 800, fontSize: 17,
                textDecoration: 'none',
                boxShadow: '0 8px 28px rgba(255,87,34,0.4)',
              }}
            >
              ¡Cotiza tu evento ahora!
              <ArrowDown size={18} />
            </motion.a>
            <motion.a
              href={WA}
              target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#fff', color: '#25D366',
                border: '2px solid #25D366',
                padding: '14px 24px', borderRadius: 12,
                fontWeight: 700, fontSize: 16,
                textDecoration: 'none',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </motion.a>
          </motion.div>
        </div>

        {/* RIGHT — Logo + floating badges */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 480 }} className="hero-right">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, type: 'spring', stiffness: 120 }}
            style={{ position: 'relative', zIndex: 2 }}
          >
            {/* Pulsing ring */}
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.15, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{
                position: 'absolute', inset: -20,
                borderRadius: '50%',
                border: '4px solid #FFB800',
              }}
            />
            <motion.div
              animate={{ scale: [1, 1.14, 1], opacity: [0.25, 0.07, 0.25] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.4 }}
              style={{
                position: 'absolute', inset: -44,
                borderRadius: '50%',
                border: '3px solid #FF5722',
              }}
            />
            <img
              src="/logo.jpg"
              alt="ProMx Sanitarios"
              style={{
                width: 200, height: 200,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '5px solid #fff',
                boxShadow: '0 16px 64px rgba(255,87,34,0.35)',
                display: 'block',
              }}
            />
          </motion.div>

          {/* Floating service badges */}
          <FloatBadge emoji="🚽" label="Sanitarios VIP" delay={0.9}  style={{ top: 40,  left: -20 }} />
          <FloatBadge emoji="⛺" label="Carpas"          delay={1.0}  style={{ top: 80,  right: -10 }} />
          <FloatBadge emoji="💨" label="Aires"            delay={1.1}  style={{ bottom: 120, left: -30 }} />
          <FloatBadge emoji="⚡" label="Generadores"     delay={1.2}  style={{ bottom: 60,  right: -20 }} />
          <FloatBadge emoji="🔊" label="Sonido"           delay={1.3}  style={{ top: 200,  left: -60 }} />
        </div>
      </div>

      {/* Services ticker */}
      <div style={{ background: '#1A1A1A', padding: '14px 0', overflow: 'hidden', position: 'relative', zIndex: 2 }}>
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          style={{ display: 'flex', gap: 0, whiteSpace: 'nowrap', width: 'max-content' }}
        >
          {[...services, ...services].map((s, i) => (
            <span key={i} style={{ color: '#FFB800', fontWeight: 700, fontSize: 14, padding: '0 28px' }}>
              {s} <span style={{ color: '#FF5722', marginLeft: 16 }}>·</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        style={{
          position: 'absolute', bottom: 52, left: '50%', transform: 'translateX(-50%)',
          zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 700, color: '#aaa', letterSpacing: 1, textTransform: 'uppercase' }}>Cotiza abajo</span>
        <ArrowDown size={20} color="#FF5722" />
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .hero-right { display: none !important; }
        }
      `}</style>
    </section>
  )
}
