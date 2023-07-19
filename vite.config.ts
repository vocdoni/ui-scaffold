import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { createHtmlPlugin } from 'vite-plugin-html'

let vocdoniEnvironment = process.env.VOCDONI_ENVIRONMENT
if (!vocdoniEnvironment) {
  vocdoniEnvironment = 'stg'
}

let publicUrl = process.env.PUBLIC_URL || ''

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'import.meta.env.VOCDONI_ENVIRONMENT': `"${vocdoniEnvironment}"`,
  },
  plugins: [
    tsconfigPaths(),
    react(),
    createHtmlPlugin({
      minify: true,
      /**
       * After writing entry here, you will not need to add script tags in `index.html`, the original tags need to be deleted
       * @default src/main.ts
       */
      entry: '/src/index.tsx', // Absolute path needed for build, see https://github.com/vbenjs/vite-plugin-html/issues/63
      /**
       * If you want to store `index.html` in the specified folder, you can modify it, otherwise no configuration is required
       * @default index.html
       */
      template: 'public/index.html',

      /**
       * Data that needs to be injected into the index.html ejs template
       */
      inject: {
        data: {
          PUBLIC_URL: publicUrl,
        },
      },
    }),
  ],
})
