// check for datasource arg
const datasource = process.argv
  .filter(arg => arg.startsWith('datasource='))
  .map(arg => arg.split('=')[1])
  .reduce((a, v) => v || a, 'Q8_072017');

console.log(`\x1b[35m ** Using ${datasource} datasource.`);

module.exports = {
  port: 3030,
  logging: true,
  datasource
};
