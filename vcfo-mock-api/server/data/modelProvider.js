const fs = require('fs');
const config = require('../config/config');

function loadModel(key, subpath = '') {
  return JSON.parse(
    fs.readFileSync(`server/data/${config.datasource}${subpath}/${key}.json`,
    'utf8'));
}

module.exports = {
  loadModel
};
