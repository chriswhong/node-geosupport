const geosupport = require('../index.js');

const params = {
  'House Number - Display Format': '86-54',
  'Street Name-1': 'WINCHESTER BOULEVARD',
  'ZIP Code Input': '11427',
  'Borough Code': '4',
};

const result = geosupport['1B'](params)
  .then((response) => {
    console.log(response);
  });
