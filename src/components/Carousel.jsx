import { useEffect, useRef, useState } from 'react'
import { slides } from '../data.js'

const DELAY = 5500 // milisegundos entre una imagen y la siguiente

// Carrusel de la portada. Las imágenes están en public/carrusel/ y los textos en src/data.js
export default function Carousel() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const touch = useRef(null)
  const n = slides.length
  const go = (k) => setI((k + n) % n)

  useEffect(() => {
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (paused || still) return
    const t = setTimeout(() => go(i + 1), DELAY)
    return () => clearTimeout(t)
  }, [i, paused])

  const open = (cat) => window.dispatchEvent(new CustomEvent('r8:abrir-categoria', { detail: cat }))

  return (
    <section className="car" aria-roledescription="carrusel" aria-label="Lo que ofrecemos"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
      onTouchStart={(e) => { touch.current = e.touches[0].clientX }}
      onTouchEnd={(e) => {
        if (touch.current == null) return
        const dx = e.changedTouches[0].clientX - touch.current
        if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1))
        touch.current = null
      }}>
      <div className="w">
        <div className="car-view">
          <div className="car-track" style={{ transform: `translateX(-${i * 100}%)` }}>
            {slides.map((s, k) => (
              <article key={s.title} className={`car-slide ${s.tone || ''}`} aria-roledescription="diapositiva"
                aria-label={`${k + 1} de ${n}: ${s.title}`} aria-hidden={k !== i}>
                <div className="car-text">
                  <span className="car-tag">{s.tag}</span>
                  <h2>{s.title}</h2>
                  <p>{s.text}</p>
                  <button className="btn white" tabIndex={k === i ? 0 : -1} onClick={() => open(s.category)}>
                    Ver productos
                  </button>
                </div>
                <img src={`${import.meta.env.BASE_URL}${s.image}`} alt={s.alt} loading={k ? 'lazy' : 'eager'} />
              </article>
            ))}
          </div>
          <button className="car-arrow prev" onClick={() => go(i - 1)} aria-label="Imagen anterior">‹</button>
          <button className="car-arrow next" onClick={() => go(i + 1)} aria-label="Imagen siguiente">›</button>
        </div>
        <div className="car-dots" role="group" aria-label="Elegir imagen">
          {slides.map((s, k) => (
            <button key={s.title} className={k === i ? 'on' : ''} onClick={() => go(k)} aria-label={s.title} aria-current={k === i} />
          ))}
        </div>
      </div>
    </section>
  )
}
