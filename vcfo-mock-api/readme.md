# Vcfo Mock API

Provides JSON endpoints based on HTTP APIs used by legacy CFI application.

## Getting Started

`cd` into this directory, `vcfo-mock-api/`, and do the following:

* If first time, run `npm install`.

* Spin up the API by running `npm start`.

The API should be available at `http:localhost:3030/`. (Port number is set in
`server/config/config.js`.)

To test that the API is up click here:
[VcfoAccountSwitcherRequest](http://localhost:3030/cfo/VcfoAccountSwitcherRequest).

You should see a chunk of JSON in your browser.

> Note that this mock API is meant to be run in a separate terminal instance
than the cfi angular app.

If you make changes to the API source while it is running it will auto update.


## Available Modes

* `npm run slow` - This will run the mock backend with 800 ms latency per
request.

* `npm run absurd` - Will run the mock backend with 8 seconds of latency
per request.

* `npm start -- latency=n` - Will run the mock backend with `n` milliseconds
of latency, where `n` is a valid integer.

## Data Sources

Data sources are sets of `.json` files corresponding to the API endpoints
and are located in `server/data/`.

The name of the datasource is the same as the name of its directory.

To use a specific data source pass the `datasource=` argument from the CLI.

E.g.,

```sh
npm start datasource=QA_052017
```

*Where `QA_052017` is a directory under `server/data/`.*

You can combine latency and custom datasource.

```sh
npm start latency=900 datasource=QA_2016
```

The default datasource is `Q8_072017`.

*Use `QA_2016` for user with just a single CFI account.*


## File Structure

* `api/api.js` - Routes requests to `.json` files within the current datasource.
* `config/config.js` - Wraps current config including datasource.
* `data/**/*.json` - The datasources and their `.json` files.
* `middleware/` - Custom middleware for latency, etc. and application of
CORS middleware.
* `util/` - Container custom logger.
* `server.js` - Ties everything together.

## Note on *real* APIs

The real APIs are implemented in the `wbb-app` Java project on Bitbucket.
For details look under the `vcfo/` directory of `wbb-app`.
Controllers, etc. are part of the `com.pnc.accountLink.vcfo.client` package.

The Java DTOs and underlying domain objects are part of `wbb-lib`, also on
Bitbucket. Look under `.../pnc/ecommerce/vcfo/*`.
