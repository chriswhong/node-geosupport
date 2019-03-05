const geosupport = require('../index.js');

const params = {
  'House Number - Display Format': '120',
  'Street Name-1': 'BROADWAY',
  'ZIP Code Input': '10271',
  'Borough Code-1': '1',
};

geosupport['1B'](params)
  .then((response) => {
    console.log(response);
  });
