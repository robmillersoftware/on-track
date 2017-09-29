const express = require('express');
const request = require('request');
const app = express();
const expressWs = require('express-ws')(app);
const Twitter = require('twitter');
const path = require('path');

var twitterClient = new Twitter({
    consumer_key: 'lDievw6wZlydilQEWqoidb7Q0',
    consumer_secret: 'awHndY82iyFyT5xcwtBREzvhcdUsJr281KhCPIDdgWImhfGwxi',
    access_token_key: '913429951134748675-5I3GTUTRnKW3PmUWEiE6iQPQkzP0SMI',
    access_token_secret: 'WiNfZnqgrMxNqFZbDjLIFB3thhyfSwIs9OW5XR501GYAd'
});

var sockets = [];
var wsData = {
    dailyGoal: null,
    currentRevenue: null,
    transactionCount: null,
    transactionAvg: null,
    transactionList: []
};

var twitterStatus = 'Stop by for #CoffeePowerHour: 1/2 off espresso drinks & pastries for the next hour! #DailyGrind #shoplocal #CoffeeAllDayEveryday';

const postToTwitter = () => {
    twitterClient.post('statuses/update', {status: twitterStatus},  (error, tweet, response) => {
        console.log("Tweeting", error, tweet, response);
        if(error) throw error;
    });
}

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
        } else if (error) {
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
        console.log('status = ' + response.statusCode);
        if (!error && response.statusCode === 200) {
            calculateCloverData(body);
        } else if (error) {
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

    wsData.dailyGoal = parseFloat(Number(totalDebits * 50 / 26).toFixed(2));
};

const calculateCloverData = (paymentsString) => {
    let elementsObj = JSON.parse(paymentsString);
    let today = new Date();

    if (elementsObj.elements !== undefined) {
        wsData.transactionCount = elementsObj.elements.length;
        wsData.transactionList.length = 0;

        let currentRevenue = 0;
        
        elementsObj.elements.forEach(payment => {
            let paymentDate = new Date(payment.createdTime);

            if ((paymentDate.getDate() == today.getDate()) && (paymentDate.getMonth() == today.getMonth())) {
                currentRevenue += payment.amount;
                let paymentAmt = parseFloat((payment.amount / 100).toFixed(2));
                wsData.transactionList.push({date: payment.createdTime, amount: paymentAmt});
            }
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

app.use(express.static('onTrack'));

app.get('/', (req, res) => {
    res.sendFile('onTrack/index.html');
});

app.get('/connect', (req, res) => {
    res.json(JSON.stringify(wsData));
});

app.post('/tweet', (req, res) => {
    postToTwitter();
});

setInterval(() => {
    getTransactions();
    getPayments();

    /* expressWs.getWss('/connect').clients.forEach(client => {
        client.send(wsData);
    });*/
}, 5000);

// export the app for testing
module.exports = app;