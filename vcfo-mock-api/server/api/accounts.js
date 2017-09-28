const router = require('express').Router();
const request = require('request');

const accountApiKey = '262663d2-dbf9-38fe-8220-0a421913517f';

router.get('getAllAccounts', (req, res) => {
  request({
    url: 'https://nginx0.pncapix.com/Account/v2.0.0',
    headers: {
      'Authorization:Bearer': accountApiKey
    }
  }, (error, response, body) => {

  });
});

module.exports = router;
