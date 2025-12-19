import react from '@vitejs/plugin-react'
import { execSync } from 'node:child_process'
import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolveLanguagesSlice } from './vite/language-env'

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

  const title = process.env.APP_TITLE || 'Vocdoni - Digital voting SaaS platform'

  let saasUrl = process.env.SAAS_URL || 'https://saas-api-dev.vocdoni.net'
  if (saasUrl.endsWith('/')) {
    saasUrl = saasUrl.slice(0, -1)
  }

  let oauthUrl = process.env.OAUTH_URL || 'https://oauth.vocdoni.io'

  let privacyPolicyUrl = process.env.PRIVACY_POLICY_URL || 'https://vocdoni.io/privacy'
  if (privacyPolicyUrl.endsWith('/')) {
    privacyPolicyUrl = privacyPolicyUrl.slice(0, -1)
  }

  let termsOfServiceUrl = process.env.TERMS_OF_SERVICE_URL || 'https://vocdoni.io/terms'
  if (termsOfServiceUrl.endsWith('/')) {
    termsOfServiceUrl = termsOfServiceUrl.slice(0, -1)
  }

  const defaultVideoTutorial = {
    en: 'https://www.youtube.com/watch?v=bIKxUTS4X8E',
  }

  const resolveVideoTutorials = () => {
    const rawValue = process.env.VIDEO_TUTORIAL

    if (!rawValue) {
      return defaultVideoTutorial
    }

    try {
      const parsed = JSON.parse(rawValue)

      if (typeof parsed !== 'object' || parsed === null || !parsed.en) {
        console.warn('VIDEO_TUTORIAL must be a JSON object containing at least the "en" key. Falling back to default.')
        return defaultVideoTutorial
      }

      return parsed
    } catch (error) {
      console.warn('Invalid JSON format for VIDEO_TUTORIAL. Falling back to default "en" video.')
      return defaultVideoTutorial
    }
  }

  const languagesSlice = resolveLanguagesSlice(process.env.LANGUAGES)
  const defaultLanguage = Object.keys(languagesSlice)[0]

  const resolveSharedCensusText = (rawValue: string | undefined, variableName: string) => {
    if (!rawValue) {
      return undefined
    }

    let parsed: unknown
    try {
      parsed = JSON.parse(rawValue)
    } catch (error: any) {
      throw new Error(`${variableName} must be valid JSON. ${error.message}`)
    }

    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      throw new Error(`${variableName} must be a JSON object mapping language codes to markdown strings.`)
    }

    const hasDefaultLanguage = Object.prototype.hasOwnProperty.call(parsed, defaultLanguage)
    if (!hasDefaultLanguage) {
      throw new Error(`${variableName} must include the default language "${defaultLanguage}".`)
    }

    for (const [lang, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof value !== 'string') {
        throw new Error(`${variableName} values must be strings. Invalid value for "${lang}".`)
      }
    }

    return parsed as Record<string, string>
  }

  const sharedCensusAlways = resolveSharedCensusText(process.env.SHARED_CENSUS_ALWAYS_VISIBLE_TEXT, 'SHARED_CENSUS_ALWAYS_VISIBLE_TEXT')
  const sharedCensusDisconnected = resolveSharedCensusText(process.env.SHARED_CENSUS_DISCONNECTED_TEXT, 'SHARED_CENSUS_DISCONNECTED_TEXT')
  const sharedCensusConnected = resolveSharedCensusText(process.env.SHARED_CENSUS_CONNECTED_TEXT, 'SHARED_CENSUS_CONNECTED_TEXT')
  const resolveStreamUrl = (value: string | undefined) => {
    if (!value) {
      return undefined
    }

    try {
      const url = new URL(value)
      if (!['http:', 'https:'].includes(url.protocol)) {
        throw new Error('STREAM_URL must use http or https.')
      }
      return url.toString()
    } catch (error: any) {
      throw new Error(`Invalid STREAM_URL: ${error.message}`)
    }
  }

  const streamUrl = resolveStreamUrl(process.env.STREAM_URL)

  return defineConfig({
    base,
    build: {
      outDir,
    },
    define: {
      'import.meta.env.VOCDONI_ENVIRONMENT': JSON.stringify(vocdoniEnvironment),
      'import.meta.env.CUSTOM_ORGANIZATION_DOMAINS': JSON.parse(process.env.CUSTOM_ORGANIZATION_DOMAINS || '{}'),
      'import.meta.env.PROCESS_IDS': JSON.stringify(process.env.PROCESS_IDS || ''),
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
      'import.meta.env.VIDEO_TUTORIAL': JSON.stringify(resolveVideoTutorials()),
      'import.meta.env.GTM_CONTAINER_ID': JSON.stringify(process.env.GTM_CONTAINER_ID),
      'import.meta.env.PLAUSIBLE_DOMAIN': JSON.stringify(process.env.PLAUSIBLE_DOMAIN),
      'import.meta.env.VOCDONI_CONTACT_EMAIL': JSON.stringify(process.env.VOCDONI_CONTACT_EMAIL || 'hello@vocdoni.io'),
      'import.meta.env.ANNOUNCEMENT': JSON.stringify(process.env.ANNOUNCEMENT),
      'import.meta.env.PRIVACY_POLICY_URL': JSON.stringify(privacyPolicyUrl),
      'import.meta.env.TERMS_OF_SERVICE_URL': JSON.stringify(termsOfServiceUrl),
      'import.meta.env.WHATSAPP_PHONE_NUMBER': JSON.stringify(process.env.WHATSAPP_PHONE_NUMBER || '+34 621 501 155'),
      'import.meta.env.LANGUAGES': JSON.stringify(languagesSlice),
      ...(typeof sharedCensusAlways !== 'undefined' && {
        'import.meta.env.SHARED_CENSUS_ALWAYS_VISIBLE_TEXT': JSON.stringify(sharedCensusAlways),
      }),
      ...(typeof sharedCensusDisconnected !== 'undefined' && {
        'import.meta.env.SHARED_CENSUS_DISCONNECTED_TEXT': JSON.stringify(sharedCensusDisconnected),
      }),
      ...(typeof sharedCensusConnected !== 'undefined' && {
        'import.meta.env.SHARED_CENSUS_CONNECTED_TEXT': JSON.stringify(sharedCensusConnected),
      }),
      ...(typeof streamUrl !== 'undefined' && {
        'import.meta.env.STREAM_URL': JSON.stringify(streamUrl),
      }),
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
