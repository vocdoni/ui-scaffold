import react from '@vitejs/plugin-react'
import { execSync } from 'node:child_process'
import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import tsconfigPaths from 'vite-tsconfig-paths'

let vocdoniEnvironment = process.env.VOCDONI_ENVIRONMENT
if (!vocdoniEnvironment) {
  vocdoniEnvironment = 'stg'
}

const outDir = process.env.BUILD_PATH
const base = process.env.BASE_URL || ''

const commit = execSync('git rev-parse --short HEAD').toString()

// https://vitejs.dev/config/
export default defineConfig({
  base,
  build: {
    outDir,
  },
  define: {
    'import.meta.env.VOCDONI_ENVIRONMENT': JSON.stringify(vocdoniEnvironment),
    'import.meta.env.FAUCET_URL': JSON.stringify(process.env.FAUCET_URL || 'https://api.faucet.vocdoni.io/v2'),
    'import.meta.env.FAUCET_AMOUNT': JSON.stringify(process.env.FAUCET_AMOUNT || 800),
  },
  plugins: [
    tsconfigPaths(),
    react(),
    createHtmlPlugin({
      minify: {
        removeComments: false,
        collapseWhitespace: true,
      },
      inject: {
        data: {
          commit: commit.trim(),
        },
      },
    }),
  ],
})
