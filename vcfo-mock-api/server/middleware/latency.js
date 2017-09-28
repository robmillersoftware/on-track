const logger = require('../util/logger');

// check for latency arg
const latency = process.argv
  .filter(arg => arg.startsWith('latency='))
  .map(arg => parseInt(arg.split('=')[1], 10));

if (latency) {
  logger.log(`Running with ${latency} ms of latency.`);
}

module.exports = (req, res, next) => setTimeout(next, latency);
