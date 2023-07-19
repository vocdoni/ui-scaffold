import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

let vocdoniEnvironment = process.env.VOCDONI_ENVIRONMENT
if (!vocdoniEnvironment) {
  vocdoniEnvironment = 'stg'
}

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'import.meta.env.VOCDONI_ENVIRONMENT': `"${vocdoniEnvironment}"`,
  },
  plugins: [
    tsconfigPaths(),
    react(),
  ],
})
