import react from '@vitejs/plugin-react'
import { execSync } from 'node:child_process'
import merge from 'ts-deepmerge'
import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
const viteconfig = ({ mode }) => {
  // load env variables from .env files
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') }

  let vocdoniEnvironment = process.env.VOCDONI_ENVIRONMENT
  if (!vocdoniEnvironment) {
    vocdoniEnvironment = 'stg'
  }

  const outDir = process.env.BUILD_PATH
  const base = process.env.BASE_URL || '/'

  const commit = execSync('git rev-parse --short HEAD').toString()

  return defineConfig({
    base,
    build: {
      outDir,
    },
    define: {
      'import.meta.env.VOCDONI_ENVIRONMENT': JSON.stringify(vocdoniEnvironment),
      'import.meta.env.CUSTOM_ORGANIZATION_DOMAINS': JSON.parse(process.env.CUSTOM_ORGANIZATION_DOMAINS || '{}'),
      'import.meta.env.features': features(),
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
}

const features = () => {
  const defaults = {
    faucet: true,
    vote: {
      anonymous: true,
      overwrite: true,
      secret: true,
    },
    login: ['web3', 'web2'],
    census: ['spreadsheet', 'token', 'web3'],
    languages: ['ca', 'en', 'es'],
  }
  const features = merge.withOptions({ mergeArrays: false }, defaults, JSON.parse(process.env.FEATURES || '{}'))
  // Ensure at least one item is loaded in each feature array
  if (!features.login.length) {
    features.login = ['web3']
  }
  if (!features.census.length) {
    features.census = ['spreadsheet']
  }
  if (!features.languages.length) {
    features.languages = ['en']
  }
  // We need pure booleans in order to ensure rollup tree-shakes non enabled features.
  // Using functions like `.includes()` would prevent such tree-shaking, resulting in a bigger bundle.
  features._census = {
    spreadsheet: false,
    token: false,
    web3: false,
  }
  for (const census of features.census) {
    features._census[census] = true
  }

  console.log('features:', features)

  return features
}

export default viteconfig
