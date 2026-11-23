import { useEffect, useState } from 'react'
import { business } from '../data.js'

// Contador de visitas con GoatCounter (gratis, sin cookies).
// Se activa cuando pones tu código en business.goatcounter (src/data.js).
export default function ViewCounter() {
  const code = business.goatcounter
  const [count, setCount] = useState(null)

  useEffect(() => {
    if (!code) return
    // 1) Registra la visita
    if (!document.querySelector('script[data-goatcounter]')) {
      const s = document.createElement('script')
      s.async = true
      s.src = 'https://gc.zgo.at/count.js'
      s.dataset.goatcounter = `https://${code}.goatcounter.com/count`
      document.head.appendChild(s)
    }
    // 2) Lee el total de visitas de toda la página
    fetch(`https://${code}.goatcounter.com/counter/TOTAL.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setCount(d.count))
      .catch(() => {})
  }, [code])

  if (!code || count == null) return null
  return (
    <span className="views" title="Visitas a la página">
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M12 5C6.5 5 2.7 9.4 1.5 12c1.2 2.6 5 7 10.5 7s9.3-4.4 10.5-7C21.3 9.4 17.5 5 12 5zm0 11.5A4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 0 1 0 9zm0-2.3a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4z" fill="currentColor" />
      </svg>
      <strong>{count}</strong> visitas
    </span>
  )
}
