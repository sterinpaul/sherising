import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss()],
  optimizeDeps: {
    // Force Rollup to use JavaScript fallback instead of native binaries
    exclude: ['rollup']
  },
  build: {
    rollupOptions: {
      // Force JavaScript fallback for Rollup
      external: (id) => {
        if (id.includes('@rollup/rollup-')) {
          return false
        }
      }
    }
  }
})
