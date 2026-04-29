import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { MessageCircle, ChevronDown, ChevronUp, Calculator, Info } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────
   PRICING TABLE
   exact = precio exacto confirmado (cotizaciones reales)
   min/max = rango estimado (aprox.)
   perEvento = true → no multiplica por días
───────────────────────────────────────────────────────────── */
const PRICING = {
  sanitEst:  { label: 'Sanitario Estándar',              emoji: '🚽', per: 'unidad/día', min: 700,  max: 900,   cotizar: false },
  sanitDlx:  { label: 'Sanitario Deluxe (c/lavamanos)',  emoji: '🚿', per: 'unidad/día', min: 900,  max: 1200,  cotizar: false },
  sanitVIP:  { label: 'Sanitario VIP',                   emoji: '⭐', per: 'unidad/día', min: 1200, max: 1600,  cotizar: false },
  remolque:  { label: 'Remolque VIP (20 sanitarios)',    emoji: '🚛', per: 'evento',     min: 8000, max: 15000, cotizar: false, perEvento: true },
  aire1:     { label: 'Aire Evaporativo ×1',             emoji: '💨', per: 'día',        exact: 900  },
  aire2:     { label: 'Aire Evaporativo ×2',             emoji: '💨', per: 'día',        exact: 1700 },
  aire3:     { label: 'Aire Evaporativo ×3',             emoji: '💨', per: 'día',        exact: 2400 },
  aire4:     { label: 'Aire Evaporativo ×4',             emoji: '💨', per: 'día',        exact: 3000 },
  carpaS:    { label: 'Carpa Chica 3×3 mts',             emoji: '⛺', per: 'unidad/día', exact: 350  },
  carpaM:    { label: 'Carpa Mediana 3×6 mts',           emoji: '⛺', per: 'unidad/día', exact: 700  },
  carpaG:    { label: 'Carpa Grande 5×5 mts',            emoji: '⛺', per: 'unidad/día', exact: 950  },
  generador: { label: 'Generador de Luz',                emoji: '⚡', per: 'unidad/día', min: 600,  max: 1500,  cotizar: false },
  mesa:      { label: 'Mesa redonda (c/sillas)',         emoji: '🪑', per: 'unidad/día', min: 80,   max: 150,   cotizar: false },
  sonido:    { label: 'Equipo de Sonido Profesional',    emoji: '🔊', per: 'evento',     min: 2500, max: 5000,  cotizar: false, perEvento: true },
}

const TIPOS = ['Fiesta / Reunión', 'Boda / Quinceañera', 'Festival / Concierto', 'Obra de Construcción', 'Evento Corporativo', 'Camping / Glamping', 'Otro']

/* ── helpers ── */
function getMin(key, qty, dias) {
  const p = PRICING[key]
  if (!qty) return 0
  const days = p.perEvento ? 1 : dias
  if (p.exact != null) return p.exact * qty * days
  return p.min * qty * days
}
function getMax(key, qty, dias) {
  const p = PRICING[key]
  if (!qty) return 0
  const days = p.perEvento ? 1 : dias
  if (p.exact != null) return p.exact * qty * days
  return p.max * qty * days
}
const fmt = n => n.toLocaleString('es-MX')

/* ── sub-components ── */
function Counter({ value, onChange, max = 30 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <button onClick={() => onChange(Math.max(0, value - 1))}
        style={{ width: 32, height: 32, borderRadius: 8, border: '2px solid #E2E8F0', background: '#fff', cursor: 'pointer', fontWeight: 800, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555' }}>−</button>
      <span style={{ minWidth: 32, textAlign: 'center', fontWeight: 800, fontSize: 18, color: '#1A1A1A' }}>{value}</span>
      <button onClick={() => onChange(Math.min(max, value + 1))}
        style={{ width: 32, height: 32, borderRadius: 8, border: '2px solid #FF5722', background: '#FFF3E0', cursor: 'pointer', fontWeight: 800, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF5722' }}>+</button>
    </div>
  )
}

function Accordion({ title, emoji, children, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen)
  return (
    <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E2E8F0', overflow: 'hidden', marginBottom: 10 }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: '100%', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: open ? '#FFF3E0' : '#fff', border: 'none', cursor: 'pointer' }}>
        <span style={{ fontWeight: 800, fontSize: 16, color: '#1A1A1A' }}>{emoji} {title}</span>
        {open ? <ChevronUp size={18} color="#FF5722" /> : <ChevronDown size={18} color="#999" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} style={{ overflow: 'hidden' }}>
            <div style={{ padding: '4px 20px 20px' }}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function PriceRow({ label, qty, dias, pKey, isToggle, checked, onToggle }) {
  const p = PRICING[pKey]
  if (!qty && !isToggle) return null
  const minV = getMin(pKey, isToggle ? (checked ? 1 : 0) : qty, dias)
  const maxV = getMax(pKey, isToggle ? (checked ? 1 : 0) : qty, dias)
  if (!minV && !maxV) return null
  const isRange = p.min != null
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #F1F5F9', fontSize: 13 }}>
      <span style={{ color: '#555' }}>{p.emoji} {label}{qty > 1 ? ` ×${qty}` : ''}</span>
      <span style={{ fontWeight: 700, color: '#1A1A1A', textAlign: 'right' }}>
        {isRange
          ? `$${fmt(minV)} – $${fmt(maxV)}`
          : `$${fmt(minV)}`}
      </span>
    </div>
  )
}

/* ── MAIN ── */
export default function Cotizador() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const [tipo, setTipo] = useState('')
  const [fecha, setFecha] = useState('')
  const [dias, setDias] = useState(1)

  const [qSanitEst, setQSanitEst]   = useState(0)
  const [qSanitDlx, setQSanitDlx]   = useState(0)
  const [qSanitVIP, setQSanitVIP]   = useState(0)
  const [remolque, setRemolque]       = useState(false)
  const [qAires, setQAires]           = useState(0)
  const [qCarpaS, setQCarpaS]         = useState(0)
  const [qCarpaM, setQCarpaM]         = useState(0)
  const [qCarpaG, setQCarpaG]         = useState(0)
  const [qGen, setQGen]               = useState(0)
  const [qMesa, setQMesa]             = useState(0)
  const [sonido, setSonido]           = useState(false)

  /* ── totals ── */
  const airePrecioMap = { 0: 0, 1: 900, 2: 1700, 3: 2400, 4: 3000 }
  const airePrecio = airePrecioMap[Math.min(qAires, 4)] * dias

  const calcMin = () =>
    getMin('sanitEst', qSanitEst, dias) +
    getMin('sanitDlx', qSanitDlx, dias) +
    getMin('sanitVIP', qSanitVIP, dias) +
    (remolque ? getMin('remolque', 1, dias) : 0) +
    (qAires > 0 ? airePrecio : 0) +
    getMin('carpaS', qCarpaS, dias) +
    getMin('carpaM', qCarpaM, dias) +
    getMin('carpaG', qCarpaG, dias) +
    getMin('generador', qGen, dias) +
    getMin('mesa', qMesa, dias) +
    (sonido ? getMin('sonido', 1, dias) : 0)

  const calcMax = () =>
    getMax('sanitEst', qSanitEst, dias) +
    getMax('sanitDlx', qSanitDlx, dias) +
    getMax('sanitVIP', qSanitVIP, dias) +
    (remolque ? getMax('remolque', 1, dias) : 0) +
    (qAires > 0 ? airePrecio : 0) +
    getMax('carpaS', qCarpaS, dias) +
    getMax('carpaM', qCarpaM, dias) +
    getMax('carpaG', qCarpaG, dias) +
    getMax('generador', qGen, dias) +
    getMax('mesa', qMesa, dias) +
    (sonido ? getMax('sonido', 1, dias) : 0)

  const totalMin = calcMin()
  const totalMax = calcMax()
  const hasAnything = totalMin > 0

  /* ── WhatsApp message ── */
  const buildMsg = () => {
    const lines = ['Hola ProMx! 👋 Quiero cotizar para mi evento:']
    if (tipo)  lines.push(`📋 Tipo de evento: ${tipo}`)
    if (fecha) lines.push(`📅 Fecha: ${new Date(fecha + 'T12:00:00').toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`)
    lines.push(`⏱ Duración: ${dias} día${dias > 1 ? 's' : ''}`)
    lines.push('')
    lines.push('🧾 *Servicios que necesito:*')
    if (qSanitEst)  lines.push(`  🚽 Sanitario Estándar: ${qSanitEst} unidad${qSanitEst > 1 ? 'es' : ''}`)
    if (qSanitDlx)  lines.push(`  🚿 Sanitario Deluxe: ${qSanitDlx} unidad${qSanitDlx > 1 ? 'es' : ''}`)
    if (qSanitVIP)  lines.push(`  ⭐ Sanitario VIP: ${qSanitVIP} unidad${qSanitVIP > 1 ? 'es' : ''}`)
    if (remolque)   lines.push(`  🚛 Remolque VIP completo (20 sanitarios)`)
    if (qAires > 0) lines.push(`  💨 Aires Evaporativos: ${qAires}`)
    if (qCarpaS)    lines.push(`  ⛺ Carpa Chica 3×3: ${qCarpaS}`)
    if (qCarpaM)    lines.push(`  ⛺ Carpa Mediana 3×6: ${qCarpaM}`)
    if (qCarpaG)    lines.push(`  ⛺ Carpa Grande 5×5: ${qCarpaG}`)
    if (qGen)       lines.push(`  ⚡ Generadores: ${qGen}`)
    if (qMesa)      lines.push(`  🪑 Mesas c/sillas: ${qMesa}`)
    if (sonido)     lines.push(`  🔊 Sonido Profesional`)
    lines.push('')
    if (hasAnything) {
      lines.push(`💰 Estimado aprox.: $${fmt(totalMin)} – $${fmt(totalMax)} MXN`)
      lines.push('⚠️ Este es un estimado. Precio final a confirmar con el equipo ProMx.')
    }
    lines.push('Pago al momento de la entrega. ¡Gracias!')
    return encodeURIComponent(lines.join('\n'))
  }

  const waUrl = `https://wa.me/526563182873?text=${buildMsg()}`

  /* ── render ── */
  return (
    <section id="cotizador" style={{ background: 'linear-gradient(180deg, #fff 0%, #FFF8F5 100%)', padding: '0 0 80px' }}>

      {/* Section header — orange band */}
      <div style={{ background: 'linear-gradient(135deg, #FF5722 0%, #FF8C00 100%)', padding: '56px 20px 56px', textAlign: 'center' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.15)', borderRadius: 100, padding: '6px 18px', marginBottom: 16 }}>
            <Calculator size={14} color="#FFE082" />
            <span style={{ color: '#FFE082', fontWeight: 700, fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase' }}>Cotizador en línea</span>
          </div>
          <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 'clamp(38px, 6vw, 64px)', fontWeight: 900, color: '#fff', lineHeight: 1.0, marginBottom: 12 }}>
            COTIZA TU EVENTO<br />
            <span style={{ color: '#FFE082' }}>EN SEGUNDOS</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 17, maxWidth: 500, margin: '0 auto', lineHeight: 1.6 }}>
            Selecciona los servicios, obtén un estimado al instante y envíanos el resumen por WhatsApp.
          </p>
        </motion.div>
      </div>

      <div className="container" style={{ paddingTop: 40, paddingLeft: 20, paddingRight: 20 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ display: 'grid', gap: 28 }}
          className="cotizador-layout"
        >
          {/* ── FORM ── */}
          <div className="cotizador-form">

            {/* Event info */}
            <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 14, padding: 20, marginBottom: 10 }}>
              <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 16, color: '#1A1A1A' }}>📋 Datos de tu evento</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 6 }}>Tipo de evento</label>
                  <select value={tipo} onChange={e => setTipo(e.target.value)} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1.5px solid #E2E8F0', fontSize: 14, color: '#1A1A1A', background: '#fff' }}>
                    <option value="">Seleccionar…</option>
                    {TIPOS.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 6 }}>Fecha</label>
                  <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1.5px solid #E2E8F0', fontSize: 14, color: '#1A1A1A' }} />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 8 }}>Días de renta</label>
                  <Counter value={dias} onChange={setDias} max={90} />
                </div>
              </div>
            </div>

            {/* Sanitarios */}
            <Accordion title="Sanitarios Portátiles" emoji="🚽" defaultOpen>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#FFF3E0', borderRadius: 8, padding: '8px 12px', marginBottom: 14 }}>
                <Info size={13} color="#FF5722" />
                <span style={{ fontSize: 12, color: '#BF360C' }}>Precios estimados · incluye entrega, instalación y retiro</span>
              </div>
              {[
                { label: 'Estándar — construcción y eventos', key: 'sanitEst', q: qSanitEst, set: setQSanitEst },
                { label: 'Deluxe — con lavamanos portátil',  key: 'sanitDlx', q: qSanitDlx, set: setQSanitDlx },
                { label: 'VIP — acabados premium',           key: 'sanitVIP', q: qSanitVIP, set: setQSanitVIP },
              ].map(({ label, key, q, set }) => (
                <div key={key} style={{ padding: '12px 0', borderBottom: '1px solid #F1F5F9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>{label}</span>
                    <Counter value={q} onChange={set} max={50} />
                  </div>
                  <div style={{ fontSize: 12, color: '#999' }}>
                    Aprox. ${fmt(PRICING[key].min)}–${fmt(PRICING[key].max)} / unidad / día
                  </div>
                </div>
              ))}
              <div style={{ padding: '14px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#333' }}>🚛 Remolque VIP completo</div>
                  <div style={{ fontSize: 12, color: '#999', marginTop: 2 }}>20 sanitarios en un solo remolque · aprox. $8,000–$15,000</div>
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginLeft: 12 }}>
                  <input type="checkbox" checked={remolque} onChange={e => setRemolque(e.target.checked)} style={{ width: 20, height: 20, accentColor: '#FF5722', cursor: 'pointer' }} />
                </label>
              </div>
            </Accordion>

            {/* Aires */}
            <Accordion title="Aires Evaporativos" emoji="💨">
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#E3F2FD', borderRadius: 8, padding: '8px 12px', marginBottom: 14 }}>
                <Info size={13} color="#1565C0" />
                <span style={{ fontSize: 12, color: '#1565C0' }}>Precio confirmado · incluye extensión, manguera e instalación</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 4 }}>Cantidad de aires</div>
                  <div style={{ fontSize: 13, color: '#FF5722', fontWeight: 700 }}>
                    {qAires === 0 ? 'Sin aires seleccionados' : `$${fmt(airePrecioMap[Math.min(qAires, 4)])}/día (precio fijo)`}
                  </div>
                </div>
                <Counter value={qAires} onChange={setQAires} max={4} />
              </div>
            </Accordion>

            {/* Carpas */}
            <Accordion title="Carpas" emoji="⛺">
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#E3F2FD', borderRadius: 8, padding: '8px 12px', marginBottom: 14 }}>
                <Info size={13} color="#1565C0" />
                <span style={{ fontSize: 12, color: '#1565C0' }}>Precio confirmado · incluye instalación</span>
              </div>
              {[
                { label: 'Chica 3×3 mts', key: 'carpaS', q: qCarpaS, set: setQCarpaS },
                { label: 'Mediana 3×6 mts', key: 'carpaM', q: qCarpaM, set: setQCarpaM },
                { label: 'Grande 5×5 mts', key: 'carpaG', q: qCarpaG, set: setQCarpaG },
              ].map(({ label, key, q, set }) => (
                <div key={key} style={{ padding: '10px 0', borderBottom: '1px solid #F1F5F9' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>{label}</span>
                    <Counter value={q} onChange={set} max={20} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#999' }}>
                    <span>${fmt(PRICING[key].exact)}/día · precio fijo</span>
                    {q > 0 && <span style={{ color: '#333', fontWeight: 700 }}>${fmt(PRICING[key].exact * q * dias)}</span>}
                  </div>
                </div>
              ))}
            </Accordion>

            {/* Otros */}
            <Accordion title="Otros Equipos" emoji="⚡">
              {[
                { label: 'Generador de Luz', sub: 'varía por potencia · aprox. $600–$1,500/día', q: qGen, set: setQGen, max: 10 },
                { label: 'Mesa redonda con sillas', sub: 'aprox. $80–$150/mesa/día', q: qMesa, set: setQMesa, max: 50 },
              ].map(({ label, sub, q, set, max }) => (
                <div key={label} style={{ padding: '12px 0', borderBottom: '1px solid #F1F5F9' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>{label}</div>
                    <Counter value={q} onChange={set} max={max} />
                  </div>
                  <div style={{ fontSize: 12, color: '#999' }}>{sub}</div>
                </div>
              ))}
              <div style={{ padding: '12px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>🔊 Sonido Profesional</div>
                  <div style={{ fontSize: 12, color: '#999', marginTop: 2 }}>paquete completo · aprox. $2,500–$5,000/evento</div>
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input type="checkbox" checked={sonido} onChange={e => setSonido(e.target.checked)} style={{ width: 20, height: 20, accentColor: '#FF5722', cursor: 'pointer' }} />
                </label>
              </div>
            </Accordion>
          </div>

          {/* ── SUMMARY ── */}
          <div className="cotizador-summary">
            <div style={{
              background: '#fff', border: '2px solid #FF5722', borderRadius: 20,
              overflow: 'hidden', position: 'sticky', top: 90,
              boxShadow: '0 12px 48px rgba(255,87,34,0.15)',
            }}>
              {/* Summary header */}
              <div style={{ background: 'linear-gradient(135deg, #FF5722, #FF8C00)', padding: '20px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Calculator size={20} color="#FFE082" />
                  <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 22, fontWeight: 900, color: '#fff' }}>RESUMEN DE COTIZACIÓN</span>
                </div>
                {(tipo || fecha) && (
                  <div style={{ marginTop: 8, fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>
                    {tipo && <span>{tipo}</span>}
                    {tipo && fecha && <span> · </span>}
                    {fecha && <span>{new Date(fecha + 'T12:00:00').toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })}</span>}
                    {dias && <span> · {dias} día{dias > 1 ? 's' : ''}</span>}
                  </div>
                )}
              </div>

              <div style={{ padding: '20px 24px' }}>
                {!hasAnything ? (
                  <div style={{ textAlign: 'center', padding: '36px 0', color: '#aaa' }}>
                    <div style={{ fontSize: 36, marginBottom: 8 }}>🚽</div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>Agrega servicios para ver el estimado</div>
                  </div>
                ) : (
                  <div style={{ marginBottom: 16 }}>
                    {qSanitEst > 0 && <PriceRow pKey="sanitEst" label={`Sanitario Estándar ×${qSanitEst}`} qty={qSanitEst} dias={dias} />}
                    {qSanitDlx > 0 && <PriceRow pKey="sanitDlx" label={`Sanitario Deluxe ×${qSanitDlx}`} qty={qSanitDlx} dias={dias} />}
                    {qSanitVIP > 0 && <PriceRow pKey="sanitVIP" label={`Sanitario VIP ×${qSanitVIP}`} qty={qSanitVIP} dias={dias} />}
                    {remolque && <PriceRow pKey="remolque" label="Remolque VIP (20 san.)" qty={1} dias={dias} isToggle checked={remolque} />}
                    {qAires > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #F1F5F9', fontSize: 13 }}>
                        <span style={{ color: '#555' }}>💨 Aires Evaporativos ×{qAires}</span>
                        <span style={{ fontWeight: 700 }}>${fmt(airePrecio)}</span>
                      </div>
                    )}
                    {qCarpaS > 0 && <PriceRow pKey="carpaS" label={`Carpa Chica ×${qCarpaS}`} qty={qCarpaS} dias={dias} />}
                    {qCarpaM > 0 && <PriceRow pKey="carpaM" label={`Carpa Mediana ×${qCarpaM}`} qty={qCarpaM} dias={dias} />}
                    {qCarpaG > 0 && <PriceRow pKey="carpaG" label={`Carpa Grande ×${qCarpaG}`} qty={qCarpaG} dias={dias} />}
                    {qGen > 0 && <PriceRow pKey="generador" label={`Generadores ×${qGen}`} qty={qGen} dias={dias} />}
                    {qMesa > 0 && <PriceRow pKey="mesa" label={`Mesas c/sillas ×${qMesa}`} qty={qMesa} dias={dias} />}
                    {sonido && <PriceRow pKey="sonido" label="Sonido Profesional" qty={1} dias={dias} isToggle checked={sonido} />}
                  </div>
                )}

                {/* Total */}
                {hasAnything && (
                  <div style={{ background: '#FFF3E0', borderRadius: 14, padding: '16px 20px', marginBottom: 20, border: '1.5px solid #FFCCBC' }}>
                    <div style={{ fontSize: 12, color: '#BF360C', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>
                      Estimado aproximado
                    </div>
                    <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 'clamp(26px, 4vw, 36px)', color: '#FF5722', lineHeight: 1 }}>
                      ${fmt(totalMin)} – ${fmt(totalMax)}
                    </div>
                    <div style={{ fontSize: 12, color: '#E64A19', marginTop: 6 }}>
                      MXN aprox. · El precio final se confirma con ProMx
                    </div>
                  </div>
                )}

                <motion.a
                  href={hasAnything ? waUrl : '#'}
                  target={hasAnything ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  whileHover={hasAnything ? { scale: 1.03, y: -2 } : {}}
                  whileTap={hasAnything ? { scale: 0.97 } : {}}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    width: '100%', padding: '17px', borderRadius: 12,
                    background: hasAnything ? '#25D366' : '#E2E8F0',
                    color: hasAnything ? '#fff' : '#aaa',
                    fontWeight: 800, fontSize: 17,
                    textDecoration: 'none',
                    boxShadow: hasAnything ? '0 8px 24px rgba(37,211,102,0.35)' : 'none',
                    pointerEvents: hasAnything ? 'auto' : 'none',
                  }}
                >
                  <MessageCircle size={20} />
                  Enviar cotización por WhatsApp
                </motion.a>

                <p style={{ fontSize: 11, color: '#aaa', textAlign: 'center', marginTop: 12, lineHeight: 1.5 }}>
                  Se envía un mensaje con todos tus detalles.<br />
                  <strong style={{ color: '#FF5722' }}>Pago al momento de la entrega.</strong>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .cotizador-layout { grid-template-columns: 1.2fr 1fr; align-items: start; }
        .cotizador-form { }
        .cotizador-summary { }
        @media (max-width: 900px) {
          .cotizador-layout { grid-template-columns: 1fr !important; }
          .cotizador-summary > div { position: static !important; }
        }
        select:focus, input:focus { outline: 2px solid #FF5722; border-color: #FF5722 !important; }
      `}</style>
    </section>
  )
}
