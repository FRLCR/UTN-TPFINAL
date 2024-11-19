import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],  
  server:{
    port:3000,
    host: true,
  },
  build: {
    outDir: 'build',
    assetsDir: 'assets', // Ensure assets are not placed in a separate folder
    sourcemap: false,
    assetsInlineLimit: 0, // Embed all assets
    rollupOptions: {
      input: {
        main: './index.html', // Punto de entrada principal de la aplicación
      },

      output: {
        manualChunks: undefined, // Deshabilitar manualChunks para que Vite maneje los paquetes
        compact: true,
      },
    },

  },
})
