const router = require('express').Router();
const request = require('request');

const merchant = 'KZ4PHETBJW8BA';
const token = '55ba4d31-dd6f-a03e-2cfd-80270e3e1605';

const cloverUri = 'https://api.clover.com/v3/merchants/' + merchant;

router.get('/payments/total', (req, res) => {
  let responseData;

  request({
    url: cloverUri + '/payments',
    headers: {
      'Authorization:Bearer': token
    }
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      console.log(body);
      res.json(body);
    } else {
      res.json(error);
    }
  });
});

module.exports = router;
