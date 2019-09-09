const chai = require('chai');
const dirtyChai = require('dirty-chai');
const chaiChange = require('chai-change');
const asPromised = require('chai-as-promised');

chai.use(dirtyChai);
chai.use(chaiChange);
chai.use(asPromised);
