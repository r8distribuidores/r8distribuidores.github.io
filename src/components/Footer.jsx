import { business } from '../data.js'
import ViewCounter from './ViewCounter.jsx'

export default function Footer() {
  return (
    <footer>
      <div className="w foot">
        <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="" height="44" />
        <span>© {new Date().getFullYear()} {business.name}. Todos los derechos reservados.</span>
        <ViewCounter />
      </div>
    </footer>
  )
}
