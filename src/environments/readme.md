# App Environment Config

## Overview

One of the `.config.js` files in this directory will be included in `dist/`
during the build process. By default `local.config.js` will be used. The
output file is always named `env.config.js`.

The same build artifacts can be used across multiple servers by overwriting
`dist/env.config.js`. (No rebuild required.)

### How it works

The `config` task in `../gulpfile.js` uses the values of `NODE_ENV` which
defaults to `local` if not explcitly set.

This `NODE_ENV` value may be set by npm scripts (see `../package.json`) or
manually from the command line prior to build.

The `config` task then copies `environments/{NODE_ENV}.config.js` into
`dist/`, renaming it to `env.config.js`.

The app `index.html` includes a `<script>` tag that points to this file.
