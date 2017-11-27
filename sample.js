console.log('hello')
const geosupport = require('./src/node-geosupport');


const addresses = [
  {
    houseNumber: '120',
    streetName: 'broadway',
    zipCode: '',
    boroCode: 1,
  },
  {
    houseNumber: '388',
    streetName: 'bridge street',
    zipCode: '',
    boroCode: 3,
  },
];

const results = addresses.map(address => geosupport.function1(address));
console.log(results)

const functionBLookup = geosupport.functionB(1, 'bro');
console.log(functionBLookup)
