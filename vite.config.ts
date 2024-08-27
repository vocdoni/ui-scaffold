import react from '@vitejs/plugin-react'
import { execSync } from 'node:child_process'
import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'
import features from './vite/features'
import themes from './vite/themes'

// https://vitejs.dev/config/
const viteconfig = ({ mode }) => {
  // load env variables from .env files
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') }

  let vocdoniEnvironment = process.env.VOCDONI_ENVIRONMENT
  if (!vocdoniEnvironment) {
    vocdoniEnvironment = 'stg'
  }
  let stripePublicKey = process.env.STRIPE_PUBLIC_KEY
  if (!stripePublicKey || stripePublicKey.length == 0) {
    if (vocdoniEnvironment == 'dev') {
      stripePublicKey =
        'pk_test_51P6vaOI1T5UnHYElxQ2aqpc7DZET6spnYww8ItU7rOv94OTHlGzvh4fK3Z5HVTGT2KmGLnDCcUnvBUjODYiL61W600XBPAnoZZ'
    } else if (vocdoniEnvironment == 'stg') {
      stripePublicKey =
        'pk_test_51PNuOtDW6VLep8WG8WFS7KZocugbzYbkuNn94WAxuGZUa1maPK7kv5BnEPN3x5bXLaCYhHRkBmmGJVVvcDkbbnbS00V4LExTPD'
    }
  }

  const outDir = process.env.BUILD_PATH
  const base = process.env.BASE_URL || '/'

  const commit = execSync('git rev-parse --short HEAD').toString()

  let defaultCensusSize = Number(process.env.DEFAULT_CENSUS_SIZE)
  if (!defaultCensusSize) {
    defaultCensusSize = 5000
  }

  const title =
    process.env.APP_TITLE ||
    (process.env.THEME === 'onvote'
      ? 'ONVOTE - Anonymous Gasless and Modular voting for Web3'
      : 'Vocdoni - The voice of digital voting')

  return defineConfig({
    base,
    build: {
      outDir,
    },
    define: {
      'import.meta.env.VOCDONI_ENVIRONMENT': JSON.stringify(vocdoniEnvironment),
      'import.meta.env.CUSTOM_ORGANIZATION_DOMAINS': JSON.parse(process.env.CUSTOM_ORGANIZATION_DOMAINS || '{}'),
      'import.meta.env.CUSTOM_FAUCET_URL': JSON.stringify(process.env.CUSTOM_FAUCET_URL),
      'import.meta.env.CSP_PUBKEY': JSON.stringify(process.env.CSP_PUBKEY),
      'import.meta.env.CSP_URL': JSON.stringify(process.env.CSP_URL),
      'import.meta.env.DEFAULT_CENSUS_SIZE': JSON.stringify(defaultCensusSize),
      'import.meta.env.EMAILJS_SERVICE_ID': JSON.stringify(process.env.EMAILJS_SERVICE_ID),
      'import.meta.env.EMAILJS_TEMPLATE_ID': JSON.stringify(process.env.EMAILJS_TEMPLATE_ID),
      'import.meta.env.EMAILJS_PUBLIC_ID': JSON.stringify(process.env.EMAILJS_PUBLIC_ID),
      'import.meta.env.title': JSON.stringify(title),
      'import.meta.env.STRIPE_PUBLIC_KEY': JSON.stringify(process.env.STRIPE_PUBLIC_KEY),
    },
    plugins: [
      tsconfigPaths(),
      themes(),
      features(),
      react(),
      svgr(),
      createHtmlPlugin({
        template: `public/${process.env.THEME || 'default'}/index.html`,
        minify: {
          removeComments: false,
          collapseWhitespace: true,
        },
        inject: {
          data: {
            commit: commit.trim(),
            title,
          },
        },
      }),
    ],
  })
}

export default viteconfig
