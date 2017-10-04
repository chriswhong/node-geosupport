const geocode = require('./src/node-geosupport');

const addresses = [
  {
    houseNumber: '',
    streetName: '120 broadway',
    zipCode: '',
    boroCode: 1,
  },
];

const results = addresses.map(address => geocode(address));
console.log(results);
