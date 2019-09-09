const path = require('path');
const { factory } = require('factory-girl');
const { FactoriesLoader } = require('src/infra/factoryGirl');

const factoryGirl = new factory.FactoryGirl();

module.exports = FactoriesLoader.load({
  factoryGirl,
  baseFolder: path.join(__dirname, 'factories')
});
