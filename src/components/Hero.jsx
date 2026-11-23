import { waLink } from '../data.js'
import HeroArt from './HeroArt.jsx'
import { items } from '../inventory.js'

export default function Hero() {
  return (
    <header className="hero" id="inicio">
      <div className="w hero-grid">
        <div className="hero-text">
          <span className="hero-kicker">Farmacias · Laboratorios magistrales · Clínicas · Cosmética</span>
          <h1>Insumos y material médico de <em>alta calidad</em></h1>
          <p>
            Activos, excipientes, vitaminas y material médico para que tus fórmulas y tu consultorio
            nunca se detengan. Pídelo hoy por WhatsApp y te lo llevamos por delivery.
          </p>
          <div className="row">
            <a className="btn solid big" href={waLink('Hola, quiero cotizar productos')}>Cotizar ahora por WhatsApp</a>
            <a className="btn line" href="#catalogo">Ver catálogo</a>
          </div>
          <ul className="hero-perks">
            <li><strong>{items.length}+</strong> productos disponibles</li>
            <li><strong>Respuesta rápida</strong> por WhatsApp</li>
            <li><strong>Delivery</strong> a tu negocio</li>
          </ul>
        </div>
        <HeroArt />
      </div>
    </header>
  )
}
