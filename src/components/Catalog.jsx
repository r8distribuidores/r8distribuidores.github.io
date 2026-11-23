import { useEffect, useMemo, useState } from 'react'
import { items, categories } from '../inventory.js'
import { waLink } from '../data.js'

const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
const data = items.map(([code, name, cat, tipo]) => ({ code, name, cat, tipo, key: norm(`${name} ${code} ${tipo || ''}`) }))
const byCat = Object.fromEntries(categories.map((c) => [c.name, data.filter((p) => p.cat === c.name)]))

// Una fila de producto: al tocarla se agrega o se quita de la cotización
function Product({ p, on, toggle, showCat }) {
  return (
    <li className={on ? 'on' : ''}>
      <button onClick={() => toggle(p.name)} aria-pressed={on} aria-label={`${on ? 'Quitar' : 'Agregar'} ${p.name}`}>
        <span className="tick" aria-hidden="true">{on ? '✓' : '+'}</span>
        <span className="pn">
          {p.name}
          <small className="pc">{showCat ? `${p.code} · ${p.cat}` : p.code}</small>
        </span>
        {p.tipo && <span className="pt">{p.tipo}</span>}
      </button>
    </li>
  )
}

// Catálogo: las categorías se muestran cerradas y se despliegan al tocarlas.
// Al escribir en el buscador se muestran solo los productos que coinciden.
export default function Catalog({ sel, setSel }) {
  const [open, setOpen] = useState([])
  const [text, setText] = useState('')

  const toggle = (name) => setSel((s) => (s.includes(name) ? s.filter((n) => n !== name) : [...s, name]))
  const flip = (c) => setOpen((o) => (o.includes(c) ? o.filter((x) => x !== c) : [...o, c]))

  // El carrusel pide abrir una categoría con este evento
  useEffect(() => {
    const onOpen = (e) => {
      setText('')
      setOpen((o) => (o.includes(e.detail) ? o : [...o, e.detail]))
      requestAnimationFrame(() => document.getElementById(`cat-${slug(e.detail)}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    }
    window.addEventListener('r8:abrir-categoria', onOpen)
    return () => window.removeEventListener('r8:abrir-categoria', onOpen)
  }, [])

  const found = useMemo(() => {
    const t = norm(text.trim())
    return t ? data.filter((p) => p.key.includes(t) || norm(p.cat).includes(t)) : null
  }, [text])

  return (
    <section id="catalogo" className="sec">
      <div className="w">
        <div className="head">
          <h2>Catálogo</h2>
          <p>{data.length} productos en {categories.length} categorías. Toca una categoría para ver sus productos y marca los que necesitas.</p>
        </div>

        <label className="search">
          <span className="sr">Buscar producto</span>
          <input type="search" placeholder="Buscar producto o código, por ejemplo: colágeno" value={text} onChange={(e) => setText(e.target.value)} />
        </label>

        {found ? (
          <>
            <p className="found" aria-live="polite">
              {found.length} {found.length === 1 ? 'producto encontrado' : 'productos encontrados'}
              {' · '}<button className="linkish" onClick={() => setText('')}>Ver categorías</button>
            </p>
            <ul className="rows">
              {found.map((p) => <Product key={p.code} p={p} on={sel.includes(p.name)} toggle={toggle} showCat />)}
            </ul>
            {found.length === 0 && (
              <p className="empty">
                No encontramos ese producto en la lista. Escríbenos y lo consultamos:{' '}
                <a href={waLink(`Hola, busco: ${text}`)}>preguntar por WhatsApp</a>.
              </p>
            )}
          </>
        ) : (
          <div className="acc">
            {categories.map((c, i) => {
              const isOpen = open.includes(c.name)
              const list = byCat[c.name]
              const picked = list.filter((p) => sel.includes(p.name)).length
              const id = `cat-${slug(c.name)}`
              return (
                <div key={c.name} className={`acc-it ${isOpen ? 'open' : ''}`} id={id}>
                  <button className="acc-h" onClick={() => flip(c.name)} aria-expanded={isOpen} aria-controls={`${id}-p`}>
                    <span className={`acc-mark ${i % 2 ? 'r' : ''}`} aria-hidden="true" />
                    <span className="acc-t">
                      <strong>{c.name}</strong>
                      <small>{c.desc}</small>
                    </span>
                    <span className="acc-n">
                      {list.length}
                      {picked > 0 && <em>{picked} {picked === 1 ? 'marcado' : 'marcados'}</em>}
                    </span>
                    <span className="acc-ch" aria-hidden="true" />
                  </button>
                  {isOpen && (
                    <div className="acc-p" id={`${id}-p`}>
                      <ul className="rows">
                        {list.map((p) => <Product key={p.code} p={p} on={sel.includes(p.name)} toggle={toggle} />)}
                      </ul>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {sel.length > 0 && (
        <div className="quote" role="region" aria-label="Tu cotización">
          <span><strong>{sel.length}</strong> {sel.length === 1 ? 'producto' : 'productos'} en tu cotización</span>
          <button className="clear" onClick={() => setSel([])}>Vaciar</button>
          <a className="go" href="#cotizacion">Completar solicitud</a>
        </div>
      )}
    </section>
  )
}

export const slug = (s) => norm(s).replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
