const geocode = require('./src/node-geosupport');

const addresses = [
  {
    houseNumber: '86-54',
    streetName: 'WINCHESTER BOULEVARD',
    zipCode: '11427',
    boroCode: 4,
  },
];

const results = addresses.map(address => geocode(address));
console.log(results);
