import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],  
  server:{
    port:3000,
    host: true,
  },
  build: {
    outDir: 'build',
    assetsDir: 'assets', 
    sourcemap: false,
    assetsInlineLimit: 0, 
    rollupOptions: {
      input: {
        main: './index.html', 
      },

      output: {
        manualChunks: undefined,
        compact: true,
      },
    },

  },
})
