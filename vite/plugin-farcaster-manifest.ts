import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Plugin } from 'vite'

/**
 * Build the Farcaster miniapp data object
 * Used by both the manifest file and HTML meta tags
 */
export function buildFarcasterData(appDomain: string): Record<string, string> {
  const miniapp: Record<string, string> = {
    version: '1',
    name: process.env.APP_TITLE || 'Vocdoni',
    iconUrl: `https://${appDomain}/logo512.png`,
    homeUrl: `https://${appDomain}`,
    imageUrl: `https://${appDomain}/logo512.png`,
    subtitle: 'Vocdoni voting APP',
    description:
      'Vocdoni APP is a secure, GDPR-compliant voting platform for governments, organizations and businesses, offering transparent, low-cost, easy remote voting on any device.',
    splashImageUrl: `https://${appDomain}/logo512.png`,
    splashBackgroundColor: '#FFFFFF',
    primaryCategory: 'social',
  }

  return miniapp
}

/**
 * Build the complete Farcaster manifest with accountAssociation
 */
export function buildFarcasterManifest(
  miniapp: Record<string, string>,
  accountAssociation: { header: string; payload: string; signature: string }
) {
  return {
    accountAssociation,
    miniapp,
  }
}

/**
 * Build the Farcaster embed meta tag structure
 * Used for the fc:miniapp meta tag in HTML
 */
export function buildFarcasterEmbedTag(miniapp: Record<string, string>) {
  return {
    version: miniapp.version,
    imageUrl: miniapp.imageUrl,
    button: {
      title: miniapp.buttonTitle || 'Open Vocdoni',
      action: {
        type: 'launch_miniapp',
        name: miniapp.name,
        url: miniapp.homeUrl,
        splashImageUrl: miniapp.splashImageUrl,
        splashBackgroundColor: miniapp.splashBackgroundColor,
      },
    },
  }
}

/**
 * Vite plugin to generate a Farcaster manifest file (.well-known/farcaster.json)
 * during the build process and serve it dynamically in dev mode.
 *
 * This plugin generates the manifest only if the APP_DOMAIN environment variable is set.
 */
export function farcasterManifestPlugin(): Plugin {
  let manifestJson: string | null = null

  return {
    name: 'vite-plugin-farcaster-manifest',
    enforce: 'pre',
    buildStart() {
      const appDomain = process.env.APP_DOMAIN
      const fcAccountAssociation = process.env.FC_ACCOUNT_ASSOCIATION

      if (!appDomain || !fcAccountAssociation) {
        console.log('⏩ Skipping Farcaster manifest generation (APP_DOMAIN or FC_ACCOUNT_ASSOCIATION not set)')
        return
      }

      try {
        // Parse the account association JSON
        const accountAssociation = JSON.parse(fcAccountAssociation) as {
          header: string
          payload: string
          signature: string
        }

        const miniapp = buildFarcasterData(appDomain)
        const manifest = buildFarcasterManifest(miniapp, accountAssociation)

        // Store manifest JSON for dev server
        manifestJson = JSON.stringify(manifest, null, 2)

        const wellKnownDir = join(process.cwd(), 'public', '.well-known')
        const manifestPath = join(wellKnownDir, 'farcaster.json')

        // Create .well-known directory if it doesn't exist
        mkdirSync(wellKnownDir, { recursive: true })

        // Write manifest file (for production build)
        writeFileSync(manifestPath, manifestJson)

        console.log('✅ Generated Farcaster manifest at public/.well-known/farcaster.json')
        console.log(`   Domain: ${appDomain}`)
      } catch (error) {
        console.error('❌ Failed to generate Farcaster manifest:', error)
        throw error
      }
    },
    configureServer(server) {
      // Add middleware directly to run BEFORE Vite's internal middlewares
      // This ensures we intercept the request before the SPA fallback
      server.middlewares.use((req, res, next) => {
        const url = req.url || req.originalUrl

        if (url === '/.well-known/farcaster.json' || url?.startsWith('/.well-known/farcaster.json')) {
          if (manifestJson) {
            res.writeHead(200, {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache',
            })
            res.end(manifestJson)
            return
          }
          res.writeHead(404, { 'Content-Type': 'text/plain' })
          res.end('Farcaster manifest not generated (APP_DOMAIN or FC_ACCOUNT_ASSOCIATION not set)')
          return
        }
        next()
      })
    },
  }
}
