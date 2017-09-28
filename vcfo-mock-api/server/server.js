const express = require('express');
const app = express();
const cfi = require('./api/cfi-api');
const olb = require('./api/olb-api');
const accounts = require('./api/accounts');
const clover = require('./api/clover-api');

// setup the app middlware
require('./middleware/middleware')(app);

// setup the api
app.use('/cfo/', cfi);
app.use('/api/v1/', olb);
app.use('/accounts/', accounts);
app.use('/clover/', clover);

// export the app for testing
module.exports = app;
