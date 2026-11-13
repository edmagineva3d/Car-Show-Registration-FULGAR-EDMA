import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'serve-fonts-or-404',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && req.url.startsWith('/fonts/')) {
            const fontPath = path.resolve(import.meta.dirname, 'public', req.url.slice(1).split('?')[0])
            if (!fs.existsSync(fontPath)) {
              res.statusCode = 404
              res.setHeader('Content-Type', 'text/plain')
              return res.end('Font file not found: ' + req.url)
            }
          }
          next()
        })
      }
    }
  ],
})

