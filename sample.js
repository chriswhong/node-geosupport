const geosupport = require('./src/node-geosupport');

const addresses = [
  {
    houseNumber: '',
    streetName: '120 broadway',
    zipCode: '',
    boroCode: 1,
  },
];

// const results = addresses.map(address => geosupport.geocode(address));
// console.log(results);

const functionBLookup = geosupport.functionB(1, 'bro');
console.log(functionBLookup);
