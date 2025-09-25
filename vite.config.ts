import react from '@vitejs/plugin-react'
import { execSync } from 'node:child_process'
import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
const viteconfig = ({ mode }) => {
  // load env variables from .env files
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') }

  let vocdoniEnvironment = process.env.VOCDONI_ENVIRONMENT
  if (!vocdoniEnvironment) {
    vocdoniEnvironment = 'dev'
  }

  const outDir = process.env.BUILD_PATH
  const base = process.env.BASE_URL || '/'

  const commit = execSync('git rev-parse --short HEAD').toString()

  let defaultCensusSize = Number(process.env.DEFAULT_CENSUS_SIZE)
  if (!defaultCensusSize) {
    defaultCensusSize = 5000
  }

  const title = process.env.APP_TITLE || 'Vocdoni - The voice of digital voting'

  let saasUrl = process.env.SAAS_URL || 'https://saas-api-dev.vocdoni.net'
  if (saasUrl.endsWith('/')) {
    saasUrl = saasUrl.slice(0, -1)
  }

  let oauthUrl = process.env.OAUTH_URL || 'https://oauth.vocdoni.io'

  return defineConfig({
    base,
    build: {
      outDir,
    },
    define: {
      'import.meta.env.VOCDONI_ENVIRONMENT': JSON.stringify(vocdoniEnvironment),
      'import.meta.env.CUSTOM_ORGANIZATION_DOMAINS': JSON.parse(process.env.CUSTOM_ORGANIZATION_DOMAINS || '{}'),
      'import.meta.env.CSP_PUBKEY': JSON.stringify(process.env.CSP_PUBKEY),
      'import.meta.env.CSP_URL': JSON.stringify(process.env.CSP_URL),
      'import.meta.env.DEFAULT_CENSUS_SIZE': JSON.stringify(defaultCensusSize),
      'import.meta.env.EMAILJS_SERVICE_ID': JSON.stringify(process.env.EMAILJS_SERVICE_ID),
      'import.meta.env.EMAILJS_TEMPLATE_ID': JSON.stringify(process.env.EMAILJS_TEMPLATE_ID),
      'import.meta.env.EMAILJS_PUBLIC_ID': JSON.stringify(process.env.EMAILJS_PUBLIC_ID),
      'import.meta.env.title': JSON.stringify(title),
      'import.meta.env.STRIPE_PUBLIC_KEY': JSON.stringify(process.env.STRIPE_PUBLIC_KEY),
      'import.meta.env.SAAS_URL': JSON.stringify(saasUrl),
      'import.meta.env.OAUTH_URL': JSON.stringify(oauthUrl),
      'import.meta.env.PRIORITY_SUPPORT_PHONE': JSON.stringify(process.env.PRIORITY_SUPPORT_PHONE),
      'import.meta.env.CALCOM_EVENT_SLUG': JSON.stringify(process.env.CALCOM_EVENT_SLUG),
      'import.meta.env.VIDEO_TUTORIAL': JSON.stringify(
        process.env.VIDEO_TUTORIAL || 'https://www.youtube.com/watch?v=bIKxUTS4X8E'
      ),
      'import.meta.env.GTM_CONTAINER_ID': JSON.stringify(process.env.GTM_CONTAINER_ID),
      'import.meta.env.PLAUSIBLE_DOMAIN': JSON.stringify(process.env.PLAUSIBLE_DOMAIN),
    },
    plugins: [
      tsconfigPaths(),
      react(),
      svgr(),
      createHtmlPlugin({
        template: `index.html`,
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
