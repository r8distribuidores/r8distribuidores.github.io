import { useEffect, useState } from 'react'
import { business } from '../data.js'

const SITE = 'r8distribuidores.github.io'

// Contador de visitas.
// - Sin configurar nada: usa hits.sh (gratis, sin cuenta). Cuenta cada vez que se abre la página publicada.
// - Opcional: si pones tu código de GoatCounter en business.goatcounter (src/data.js),
//   se usa GoatCounter, que además te da un panel con estadísticas.
export default function ViewCounter() {
  const code = business.goatcounter
  const [count, setCount] = useState(null)
  // Solo cuenta en la página publicada, no en las pruebas (npm run dev / Codespaces)
  const live = typeof window !== 'undefined' && window.location.hostname === SITE

  useEffect(() => {
    if (!code || !live) return
    if (!document.querySelector('script[data-goatcounter]')) {
      const s = document.createElement('script')
      s.async = true
      s.src = 'https://gc.zgo.at/count.js'
      s.dataset.goatcounter = `https://${code}.goatcounter.com/count`
      document.head.appendChild(s)
    }
    fetch(`https://${code}.goatcounter.com/counter/TOTAL.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setCount(d.count))
      .catch(() => {})
  }, [code, live])

  const eye = (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M12 5C6.5 5 2.7 9.4 1.5 12c1.2 2.6 5 7 10.5 7s9.3-4.4 10.5-7C21.3 9.4 17.5 5 12 5zm0 11.5A4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 0 1 0 9zm0-2.3a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4z" fill="currentColor" />
    </svg>
  )

  if (!live) {
    // Vista previa: muestra un ejemplo para ver dónde aparece
    return <span className="views" title="Ejemplo: el número real se ve en la página publicada">{eye}<strong>—</strong> visitas</span>
  }

  if (code) {
    if (count == null) return null
    return <span className="views" title="Visitas a la página">{eye}<strong>{count}</strong> visitas</span>
  }

  return (
    <span className="views" title="Visitas a la página">
      {eye}
      <img
        className="views-badge"
        src={`https://hits.sh/${SITE}.svg?style=flat-square&label=visitas&color=2b3f9a&labelColor=ffffff`}
        alt="Contador de visitas"
        height="20"
      />
    </span>
  )
}
