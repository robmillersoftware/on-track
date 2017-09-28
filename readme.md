# Cash Flow Insight

## Tech Stack

* Angular 1.6
* Babel
* Angular Material
* Angular UI Router
* Redux
* ESLint
* ESDoc
* Jasmine & Karma
* Gulp
* Browserify

## Setting Up

### Overview

1. Install npm packages for Angular app.
1. Clone `wbb-ui-base` into project root.
1. Install npm packages for mock backend.
1. Run the mock backend and Angular app.

### Angular App

Install npm packages by running the following from project root
directory (where `package.json` resides).

```cli
npm install
```

To get the `wbb-ui-base` shared components clone the repo into the current
directory.

```cli
git clone ssh://git@git.pncint.net/~xx67803/wbb-ui-base.git
```

Your directory structure should be like this:

```cli
{cfi-root}/
..src/
....app/
....and so on
..wbb-ui-base/
....assets/
....and so on
..vcfo-mock-api/
....server/
....and so on
```

To test that the environment is working properly run the following.

```cli
npm run build
```

Or run `npm start` if you want lint, test, build, and dev server. (Setup the
mock backend first if you want to view the app.)

### Mock Backend

To setup the mock backend `cd` into `vcfo-mock-api/` and run `npm install`.

After that completes start the backend by running `npm start`.

See `./vcfo-mock-api/readme.md` for more info and options.

### Unit Tests

To just run unit tests with Karma:

```cli
npm test
```

(Equivalent to `npm run test`)

To run tests in Karma with watch on `.js` files and open browser instance for
debugging:

```cli
npm run test:watch
```

### Other Tasks

* `npm run lint` to run js lint task.
* `npm start style-lint` to run the `.scss` linter.
* `npm run docs` to generate docs which will be output to `esdoc/` directory.

*Open `esdocs/index.html` in browser straight from file system to view.*

See `./esdoc-reference.md` for information about adding esdoc comments to
source files.

#### Adding Images

The default build will not watch for new files in `assets/images/` so if
you're adding new images you should completely stop and start the build
for those new files to be copied to `dist/`.

This was done during a build system perf improvement task on the assumption
that adding images is a very rare thing.

This *does not* apply to the `.svg` icons, which have their own task. See the
`readme.md` in `app/config/` for info on adding icons.

***

## Git Workflow

Always work off of a feature branch: `feature/us1234_my-feature-name`, or
a bug fix branch: `bugfix/de1234_my-bug-fix-name`.

Prefix branch names with user story number:

`feature/{Rally story number}_{story description}`

Branch from `develop`, doing a `git pull` first, and submit pull requests
from your feature branch to `develop` through Bitbucket.

See `./git-reference.md` for the complete guide.

## Deployment

*Circa 07-2017*

### Q8 environment

#### Prerequisites

* Access to the `Rich Koch/OLB_Foundations_wbb-v2-app` repo on Bitbucket.
* Communication with build master (currently Abhi) for that repo.

#### Steps

* Run `npm run build:q8`
* Checkout the `feature/cfi-integration-initial` branch of
`OLB_Foundations_wbb-v2-app` or created a new feature branch
* Copy the CFI `dist/` artifacts into the `cashflowInsight/` directory on
`OLB_Foundations_wbb-v2-app`.
* Commit and push the changes and create a pull request, adding the 
build master and any other relevant reviewers.

### Mobile-Q7 environment

* Run `npm run build:mobile-q7`

TBD

### Production environment

TBD
