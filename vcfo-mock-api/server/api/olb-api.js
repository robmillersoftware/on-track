const router = require('express').Router();
const modelProvider = require('../data/modelProvider');

const api = [
  'settings'
];

function endpoint(key) {
  const get = (req, res) => {
    const model = modelProvider.loadModel(key, '/olb');
    return res.json(model.data ? model.data : model);
  };

  router.use(`/${key}`, get);
}

api.forEach(endpoint);

module.exports = router;
