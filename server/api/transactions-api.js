const router = require('express').Router();
const request = require('request');

const apiToken = "262663d2-dbf9-38fe-8220-0a421913517f";
const customerToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJicmlkZ2Vwb2ludDI1OCIsImV4cCI6MTUwNzQ3MjAzOH0.ElfArCyhqBxyw4OiZ6I6CC-8Vz8KIgjdCb89BNWeS6b7bHaxmB3iq7XWfgM5F98NeatHQod5vowskHxlQwnaIA";
const accountId = 1042;

router.get('/transactionsByAccount', (req, res) => {
  let responseData;

  request({
    url: 'https://nginx0.pncapix.com/Transactions/v2.0.0/transaction/findByAccountId/' + accountId + '?page=0&size=9999',
    auth: {
      bearer: apiToken
    },
    headers: {
      'X-Authorization': customerToken
    }
  }, (error, response, body) => {
    console.log(error);
    if (!error && response.statusCode === 200) {
      console.log(body);
      res.json(body);
    } else {
      res.json(error);
    }
  });
});

module.exports = router;