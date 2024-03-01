import alias from '@rollup/plugin-alias'

const themes = () => {
  const theme = process.env.THEME || 'default'
  const aliased = {
    entries: [
      {
        find: /^~theme$/,
        replacement: `/src/themes/${theme}`,
      },
      {
        find: /^~theme\/(.*)/,
        replacement: `/src/themes/${theme}/$1`,
      },
      {
        find: /^\/shared\/(.*)/,
        replacement: `/public/shared/$1`,
      },
    ],
  }

  return {
    name: 'theme',
    config() {
      return {
        publicDir: `public/${theme}`,
        define: {
          'import.meta.env.theme': JSON.stringify(theme),
        },
      }
    },
    buildStart: alias(aliased).buildStart,
    resolveId: alias(aliased).resolveId,
  }
}

export default themes
