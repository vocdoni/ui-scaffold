<div align="center">


![vocdoni logo]

[![GitHub commit activity (develop)][commit activity badge]][github commits]
[![GitHub issues][github issues badge]][github issues]
[![Join Discord][discord badge]][discord invite]
[![Twitter Follow][twitter badge]][twitter follow]

</div>

# Vocdoni's UI Scaffold


## Development

This UI, known as Vocdoni's UI Scaffold, is a React application that uses our
[SDK] and [related react packages] to provide a vitaminaized UI for the Vocdoni
voting protocol.

### Environment variables

You can create a `.env.local` file to set your custom environment variables
there, here's a list of variables you can use:

- `VOCDONI_ENVIRONMENT`: the vocdoni environment to be used, either
  `dev`, `stg` or `prod` (defaults to `stg`).
- `BASE_URL` is used to specify the public base page during build.
- `BUILD_PATH` Specifies the destination of built files.
- `CUSTOM_ORGANIZATION_DOMAINS` A JSON.stringified object of custom domains mapped to organization ids, to
  replace the homepage with their profile page.
- `FEATURES` A JSON.stringified object of features to be enabled/disabled. See [features] for more details.

You can also start the app by prefixing these vars instead of defining your
custom `.env` file:

```bash
VOCDONI_ENVIRONMENT=dev yarn start
# or an example using many of them...
BUILD_PATH=build/dev BASE_URL=/ui-scaffold/dev VOCDONI_ENVIRONMENT=dev yarn build
```

### Theming

This app has a bundled theming system, allowing to customize the entire look and feel of the app.

The theme is loaded from the `src/themes` folder, and can be changed using the `THEME` env var. Defaults to `default`:

~~~bash
THEME=onvote yarn start
~~~

Important things to know when using the theming system:

- A special `~theme` import alias is available to import the current theme files from anywhere in the app. Note your IDE
won't recommend this import, instead it will try to recommend importing from an existing theme. Ensure you import from
`~theme`, otherwise won't properly switch between themes. Due to this, tsc will complain about any import from `~theme`,
if you need to add new exports to the theme, you'll need to add them to the `src/themes/theme.d.ts` file.
- Assets are loaded from `src/public`, but also depending on the theme. Loading assets in the app is done as per vite
standards, using the `/` root path (i.e. `import logo from '/assets/logo.svg'` would load the `logo.svg` file from the
`src/public/default` directory, if no theme is specified).

To create a new theme, just copy the `default` theme and start customizing it:

~~~bash
cp -frv src/themes/default src/themes/my-theme
cp -frv src/public/default src/public/my-theme
THEME=my-theme yarn start
~~~

Most themes logic is handled via the vite themes plugin (located in `vite/themes.ts`), except for the index.html
template files, which are handled in `vite.config.ts` using an external plugin.

### Features

The following features can be enabled/disabled using the `FEATURES` environment var:

~~~js
const features = {
  faucet: true,
  vote: {
    anonymous: true,
    overwrite: true,
    secret: true,
  },
  // order matters in array features
  login: ['web3', 'web2'],
  census: ['spreadsheet', 'token', 'address'],
  // first is also considered as the default language
  languages: ['en', 'es', 'ca'],
}
~~~

All features come enabled by default, but you can overwrite any of them using the env var, i.e.:

~~~bash
FEATURES='{"vote":{"anonymous":false}}' yarn start
~~~
> Would disable anonymous process creation feature.

The `login` field is an array so you can both enable/disable and sort the login methods:

~~~bash
FEATURES='{"login":["web2"]}' yarn start
~~~

The example above would just show web2 login methods.

~~~bash
FEATURES='{"login":["web2", "web3"]}' yarn start
~~~

Changing the order in the features array will effectively change the order in the UI.

Note features are interpreted during build time, and the bundler will ensure to tree-shake any disabled features
(meaning they won't be included in the final bundle).

All features logic is handled via the vite features plugin (located in `vite/features.ts`).

### Custom domain names

The custom domain names environment variable allows to map custom domains to organization ids, so that the homepage
rendered will be the mapped organization profile.

~~~bash
CUSTOM_ORGANIZATION_DOMAINS='{"deadcorp.com":"0x000000000000000000000000000000000000dead"}' yarn build
~~~

With the example above, accessing the app via the `deadcorp.com` domain would render the profile of the organization
with id `0x000000000000000000000000000000000000dead` as the homepage of the app.

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.<br /> Open
[http://localhost:5173](http://localhost:5173) to view it in the browser (note
the port may change if already used).

#### `yarn build`

Builds the app for production to the `dist` folder.<br /> It correctly bundles
React in production mode and optimizes the build for the best performance.

#### `yarn translations`

Extracts all i18n strings from the code and puts them in the `i18n/locales` json
files. The best way to work with translations is:

### Branching and deploys

Three branches are linked to deploys:

- `develop`, deployed to [app-dev.vocdoni.io], and linked to api-dev.
- `stage`, deployed to [app-stg.vocdoni.io], and linked to api-stg.
- `main`, deployed to [app.vocdoni.io], and linked to LTS api (formerly prod).

Also, all pushes to develop are deployed twice to netlify (one for api-dev,
[the other for api-stg][netlify]). You can easily access these deploys on each
commit to develop, or directly in pull requests.

The common flow to follow when deploying to `main` is passing through all the
other stages:

    branch from develop => merge to develop => merge to stage => merge to main

The only exception should be when fixing specific versions to a deployment, in
such case, a hotfix should be created from the desired branch to be updated:

    branch from stage (i.e. h/sdk-0.4.1) => PR to stage
    branch from main (i.e. h/sdk-0.5.0) => PR to main

[app-dev.vocdoni.io]: https://app-dev.vocdoni.io
[app-stg.vocdoni.io]: https://app-stg.vocdoni.io
[app.vocdoni.io]: https://app.vocdoni.io
[netlify]: https://vocdoni-ui-scaffold-develop.netlify.app/

[vocdoni logo]: https://docs.vocdoni.io/Logotype.svg
[commit activity badge]: https://img.shields.io/github/commit-activity/m/vocdoni/ui-scaffold
[discord badge]: https://img.shields.io/badge/discord-join%20chat-blue.svg
[github issues badge]: https://img.shields.io/github/issues/vocdoni/ui-scaffold
[twitter badge]: https://img.shields.io/twitter/follow/vocdoni?style=social&label=Follow

[discord invite]: https://discord.gg/xFTh8Np2ga
[twitter follow]: https://twitter.com/intent/user?screen_name=vocdoni
[github issues]: https://github.com/vocdoni/ui-scaffold/issues
[github commits]: https://github.com/vocdoni/ui-scaffold/commits/main

[SDK]: https://developer.vocdoni.io/sdk
[features]: #features
[related react packages]: https://github.com/vocdoni/ui-components#vocdonis-ui-components
