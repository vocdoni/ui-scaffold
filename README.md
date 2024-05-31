<p align="center" width="100%">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://developer.vocdoni.io/img/vocdoni_logotype_full_blank.svg" />
      <source media="(prefers-color-scheme: light)" srcset="https://developer.vocdoni.io/img/vocdoni_logotype_full_white.svg" />
      <img alt="Star History Chart" src="https://developer.vocdoni.io/img/vocdoni_logotype_full_white.svg" />
  </picture>
</p>

<p align="center" width="100%">
    <a href="https://github.com/vocdoni/ui-scaffold/commits/main/"><img src="https://img.shields.io/github/commit-activity/m/vocdoni/ui-scaffold" /></a>
    <a href="https://github.com/vocdoni/ui-scaffold/issues"><img src="https://img.shields.io/github/issues/vocdoni/ui-scaffold" /></a>
    <a href="https://discord.gg/xFTh8Np2ga"><img src="https://img.shields.io/badge/discord-join%20chat-blue.svg" /></a>
    <a href="https://twitter.com/vocdoni"><img src="https://img.shields.io/twitter/follow/vocdoni.svg?style=social&label=Follow" /></a>
</p>

  <div align="center">
    Vocdoni is the first universally verifiable, censorship-resistant, anonymous, and self-sovereign governance protocol. <br />
    Our main aim is a trustless voting system where anyone can speak their voice and where everything is auditable. <br />
    We are engineering building blocks for a permissionless, private and censorship resistant democracy.
    <br />
    <a href="https://developer.vocdoni.io/"><strong>Explore the developer portal »</strong></a>
    <br />
    <h3>More About Us</h3>
    <a href="https://vocdoni.io">Vocdoni Website</a>
    |
    <a href="https://vocdoni.app">Web Application</a>
    |
    <a href="https://explorer.vote/">Blockchain Explorer</a>
    |
    <a href="https://law.mit.edu/pub/remotevotingintheageofcryptography/release/1">MIT Law Publication</a>
    |
    <a href="https://chat.vocdoni.io">Contact Us</a>
    <br />
    <h3>Key Repositories</h3>
    <a href="https://github.com/vocdoni/vocdoni-node">Vocdoni Node</a>
    |
    <a href="https://github.com/vocdoni/vocdoni-sdk/">Vocdoni SDK</a>
    |
    <a href="https://github.com/vocdoni/ui-components">UI Components</a>
    |
    <a href="https://github.com/vocdoni/ui-scaffold">Application UI</a>
    |
    <a href="https://github.com/vocdoni/census3">Census3</a>
  </div>

# ui-scaffold

Vocdoni's UI Scaffold is a React application that uses the [Vocdoni SDK](https://developer.vocdoni.io/sdk) and [UI Components library](https://developer.vocdoni.io/ui-components) to provide a user interface for the Vocdoni voting protocol. 
It is built with [Vite](https://vitejs.dev/guide/) and is deployed at https://app.vocdoni.io/. 

### Table of Contents
- [Getting Started](#getting-started)
- [Preview](#preview)
- [Contributing](#contributing)
- [License](#license)


## Getting Started

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
- There's a shared assets folder in `public/shared` that's accessible via `/shared`. Related styles may be found in
`src/themes/shared.ts` (and they must be spread-imported in the theme's `index.ts` file).

To create a new theme, just copy the `default` theme and start customizing it:

~~~bash
cp -frv public/default public/my-theme
cp -frv src/themes/default src/themes/my-theme
THEME=my-theme yarn start
~~~

You can use any non existing name for your theme (so no `default` nor `shared`).

Most themes logic is handled via the vite themes plugin (located in `vite/themes.ts`), except for the `index.html`
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

- `develop`, deployed to [app-dev.vocdoni.io] and [dev.onvote.app], and linked to api-dev.
- `stage`, deployed to [app-stg.vocdoni.io] and [stg.onvote.app], and linked to api-stg.
- `main`, deployed to [app.vocdoni.io] and [onvote.app], and linked to LTS api (formerly prod).

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


## Preview

The site is deployed at https://app.vocdoni.io/ and https://onvote.app/. Check out the difference between the themes.

## Contributing 

While we welcome contributions from the community, we do not track all of our issues on Github and we may not have the resources to onboard developers and review complex pull requests. That being said, there are multiple ways you can get involved with the project. 

Please review our [development guidelines](https://developer.vocdoni.io/development-guidelines).

## License

This repository is licensed under the [GNU Affero General Public License v3.0.](./LICENSE)


    Vocdoni UI Scaffold
    Copyright (C) 2024 Vocdoni Association

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)



[app-dev.vocdoni.io]: https://app-dev.vocdoni.io
[app-stg.vocdoni.io]: https://app-stg.vocdoni.io
[app.vocdoni.io]: https://app.vocdoni.io
[dev.onvote.app]: https://dev.onvote.app
[stg.onvote.app]: https://stg.onvote.app
[onvote.app]: https://onvote.app
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
