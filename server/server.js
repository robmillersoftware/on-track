const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);

const transactions = require('./api/transactions-api');
const clover = require('./api/clover-api');

var sockets = [];

// setup the app middlware
require('./middleware/middleware')(app);

app.ws('/connect', (ws, req) => {
    ws.on('connect', () => {

    });
});

// setup the apis
app.use('/transactions/', transactions);
app.use('/clover/', clover);

setInterval(() => {
    expressWs.getWss('/connect').clients.forEach(client => {
        client.send('yo');
    });
}, 1000);

// export the app for testing
module.exports = app;