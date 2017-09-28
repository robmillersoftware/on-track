const express = require('express');
const app = express();
const transactions = require('./api/transactions-api');
const clover = require('./api/clover-api');

// setup the app middlware
require('./middleware/middleware')(app);

// setup the apis
app.use('/transactions/', transactions);
app.use('/clover/', clover);

// export the app for testing
module.exports = app;