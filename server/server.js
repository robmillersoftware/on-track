const express = require('express');
const request = require('request');
const app = express();
const expressWs = require('express-ws')(app);

var sockets = [];
var wsData = {
    dailyGoal: null,
    currentRevenue: null,
    transactionCount: null,
    transactionAvg: null,
    transactionList: []
};

const getTransactions = () => {
    const apiToken = "262663d2-dbf9-38fe-8220-0a421913517f";
    const customerToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJicmlkZ2Vwb2ludDI1OCIsImV4cCI6MTUwNzQ3MjAzOH0.ElfArCyhqBxyw4OiZ6I6CC-8Vz8KIgjdCb89BNWeS6b7bHaxmB3iq7XWfgM5F98NeatHQod5vowskHxlQwnaIA";
    const accountId = 1042;
    
    request({
        url: 'https://nginx0.pncapix.com/Transactions/v2.0.0/transaction/findByAccountId/' + accountId + '?page=0&size=9999',
        auth: {
        bearer: apiToken
        },
        headers: {
        'X-Authorization': customerToken
        }
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            calculateDailyGoal(body);
        } else {
            console.log(error);
        }
    });
};

const getPayments = () => {
    const token = 'e5f70ae8-d51a-842a-0044-f9f89fc0d417';

    request({
        url: 'https://api.clover.com/v3/merchants/KZ4PHETBJW8BA/payments',
        auth: {
            bearer: token
        }
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            calculateCloverData(body);
        } else {
            console.log(error);
        }
    });
};

const calculateDailyGoal = (transString) => {
    let contentObj = JSON.parse(transString);
    let totalDebits = 0;
    let numDebits = 0;

    if (contentObj.content !== 'undefined') {
        contentObj.content.forEach(trans => {
            if (trans.method == 'DEBIT') {
                numDebits++;
                totalDebits += trans.amount;
            }
        });
    }

    wsData.dailyGoal = parseFloat(Number(totalDebits * 50 / 26 * 1.1).toFixed(2));
};

const calculateCloverData = (paymentsString) => {
    let elementsObj = JSON.parse(paymentsString);

    if (elementsObj.elements !== undefined) {
        wsData.transactionCount = elementsObj.elements.length;
        wsData.transactionList.length = 0;

        let currentRevenue = 0;
        
        elementsObj.elements.forEach(payment => {
            currentRevenue += payment.amount;
            let paymentAmt = parseFloat((payment.amount / 100).toFixed(2));
            wsData.transactionList.push({date: payment.createdTime, amount: paymentAmt});
        });

        currentRevenue /= 100;

        wsData.currentRevenue = currentRevenue;
        wsData.transactionAvg = parseFloat((currentRevenue / wsData.transactionCount).toFixed(2));
    }
};

// setup the app middlware
require('./middleware/middleware')(app);

/* app.ws('/connect', (ws, req) => {
    ws.on('connect', () => {});
});*/
app.get('/connect', (req, res) => {
    res.json(JSON.stringify(wsData));
});

setInterval(() => {
    getTransactions();
    getPayments();

    /* expressWs.getWss('/connect').clients.forEach(client => {
        client.send(wsData);
    });*/
}, 1000);

// export the app for testing
module.exports = app;