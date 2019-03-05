const geosupport = require('../index.js');

const params = {
  houseNumber: '86-54',
  streetName: 'WINCHESTER BOULEVARD',
  zipCode: '11427',
  boroCode: 4,
};

const result = geosupport['1B'](params);
console.log(result);
