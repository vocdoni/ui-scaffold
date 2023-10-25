# Vocdoni's UI Scaffold

## Development

This project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).

### Environment variables

You can create a `.env.local` file to set your custom environment variables
there, here's a list of variables you can use:

- `VOCDONI_ENVIRONMENT`: the vocdoni environment to be used, either
  `dev`, `stg` or `prod` (defaults to `stg`).
- `BASE_URL` is used to specify the public base page during build.
- `BUILD_PATH` Specifies the destination of built files.
- `FAUCET_URL` Specifies the faucet api url to be used (defaults to `https://api.faucet.vocdoni.net/v2`).
- `FAUCET_AMOUNT` The amount given in the faucet, to change it in visible places (defaults to `800`)

You can also start the app by prefixing these vars instead of defining your
custom `.env` file:

```bash
VOCDONI_ENVIRONMENT=dev yarn start
# or an example using all of them...
BUILD_PATH=build/dev BASE_URL=/ui-scaffold/dev VOCDONI_ENVIRONMENT=dev yarn build
```

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
