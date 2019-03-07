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

geosupport['1E']({
  'House Number - Display Format': '120',
  'Street Name-1': 'BROADWAY',
  'ZIP Code Input': '10271',
  'Borough Code-1': '1',
})
  .then((response) => {
    console.log(response);
  });

geosupport['1A']({
  'House Number - Display Format': '120',
  'Street Name-1': 'BROADWAY',
  'ZIP Code Input': '10271',
  'Borough Code-1': '1',
})
  .then((response) => {
    console.log(response);
  });

geosupport['1N']({
  'Street Name-1': 'W2PLACE',
  'Borough Code-1': '1',
})
  .then((response) => {
    console.log(response);
  });

geosupport['BN']({
  'Building Identification Number (BIN)': '1001026',
})
  .then((response) => {
    console.log(response);
  });

geosupport['BL']({
  'BOROUGH BLOCK LOT (BBL)': '1000477501',
})
  .then((response) => {
    console.log(response);
  });
