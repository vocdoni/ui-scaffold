# Vocdoni's UI Scaffold

## Development

This project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).

### Environment variables

You can create a `.env.local` file to set your custom environment variables
there, here's a list of variables you can use:

- `VOCDONI_ENVIRONMENT`: the vocdoni environment to be used, either
  `dev`, `stg` or `prod` (defaults to `stg`).

You can also start the app by prefixing these vars instead of defining your
custom `.env` file:

```bash
VOCDONI_ENVIRONMENT=dev yarn start
```

- `PUBLIC_URL` is used to specify the public base pase during the build.
[From Vite docs](https://vitejs.dev/guide/build.html#public-base-path):

> JS-imported asset URLs, CSS url() references, and asset references in
> your .html files are all automatically adjusted to respect this option during build.

```bash
PUBLIC_URL=="/ui-scaffold/dev/" yarn build
```

- `BUILD_PATH` Specifies the where the destination of built files.

```bash
PUBLIC_URL=="/ui-scaffold/dev/" yarn build
```


### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.<br /> Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br /> You will also see any lint errors
in the console.

#### `yarn build`

Builds the app for production to the `build` folder.<br /> It correctly bundles
React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br /> Your app is
ready to be deployed!

See the section about
[deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.

#### `yarn translations`

Extracts all i18n strings from the code and puts them in the `i18n/locales` json
files. The best way to work with translations is:
