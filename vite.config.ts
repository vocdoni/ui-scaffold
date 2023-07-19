import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

let vocdoniEnvironment = process.env.VOCDONI_ENVIRONMENT
if (!vocdoniEnvironment) {
  vocdoniEnvironment = 'stg'
}

let outDir = process.env.BUILD_PATH
let base = process.env.PUBLIC_URL

// https://vitejs.dev/config/
export default defineConfig({
  base: base,
  build: {
    outDir: outDir
  },
  define: {
    'import.meta.env.VOCDONI_ENVIRONMENT': `"${vocdoniEnvironment}"`,
  },
  plugins: [
    tsconfigPaths(),
    react(),
  ],
})
