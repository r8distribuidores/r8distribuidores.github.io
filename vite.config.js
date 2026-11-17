import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Con un repositorio llamado usuario.github.io, "base" es '/'
// y el enlace será https://r8distribuidores.github.io/
export default defineConfig({
  base: '/',
  plugins: [react()],
})
