# Create demo project

This script creates demo elections of different types: approval, multichoice, multi-question and single-choice.

Either than creating elections on the Vochain, it uses mustache to generate a `.ts` file with the elections ids and the
metadata of the demos project (such as logo, organization name, start and end dates...). This file should be used to
populate the demo landing on ui-scaffold project.

### Setting up a demo project

Steps to create a demo project:

- [ ] **Set `VOCDONI_ENV`** on `.env` file.
- [X] (Optional) **Select organization**, creating a new one by default or setting the `PRIV_KEY` on `.env` file. to use
  an existing one.
- [X] (Optional) **Select census type**. `spreadsheet` by default. Available values are `spreadsheet` or `csp` and have
  to be defined on `.env` file on `CENSUS_TYPE` key. **Note** that creation using `csp` census is supported using the
  vocdoni blind csp,
  however this is not supported on ui-scaffold.
- [X] (Optional) **Select election types** if you don't want to create all election types, check on `index.ts` and
  change the values.
- [X] (Optional) **Set the information for every election** on the elections files or let the default data (on the
  `get<ElectionType>` files)
- [X] (Optional) **Set up the demo metadata** on `getDemoMeta.ts` file or le default values.

And finally run:

```json
yarn start
```


