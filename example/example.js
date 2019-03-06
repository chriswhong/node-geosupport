const geosupport = require('../index.js');

geosupport['1']({
  'Borough Code-1': '1',
  'House Number - Display Format': '120',
  'Street Name-1': 'BROADWAY',
})
  .then((response) => {
    console.log(response);
  });

geosupport['1B']({
  'House Number - Display Format': '120',
  'Street Name-1': 'BROADWAY',
  'ZIP Code Input': '10271',
  'Borough Code-1': '1',
})
  .then((response) => {
    console.log(response);
  });
