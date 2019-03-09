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
  'Street Name-1': 'W 4 ST',
  'Borough Code-1': '1',
})
  .then((response) => {
    console.log(response);
  });

geosupport['2']({
  'Borough Code-1': '1',
  'Street Name-1': '42 Street',
  'Borough Code-2': '1',
  'Street Name-2': '7 Avenue',
})
  .then((response) => {
    console.log(response);
  });

geosupport['2W']({
  'Borough Code-1': '1',
  'Street Name-1': '42 Street',
  'Borough Code-2': '1',
  'Street Name-2': '7 Avenue',
})
  .then((response) => {
    console.log(response);
  });

geosupport['3']({
  'Borough Code-1': '1',
  'Street Name-1': 'Madison Ave',
  'Street Name-2': 'E 51st St',
  'Street Name-3': 'E 52nd St',
})
  .then((response) => {
    console.log(response);
  });

geosupport['3C']({
  'Borough Code-1': '1',
  'Street Name-1': 'Madison Ave',
  'Street Name-2': 'E 51st St',
  'Street Name-3': 'E 52nd St',
  'Compass Direction': 'E',
})
  .then((response) => {
    console.log(response);
  });

geosupport['3S']({
  'Borough Code-1': '1',
  'Street Name-1': 'Madison Ave',
  'Street Name-2': 'E 48th St',
  'Street Name-3': 'E 58th St',
})
  .then((response) => {
    console.log(response);
  });

geosupport.AP({
  'Borough Code-1': '1',
  'House Number - Display Format': '120',
  'Street Name-1': 'BROADWAY',
})
  .then((response) => {
    console.log(response);
  });

// TODO parse List of Street Codes and List of Street Names into arrays
geosupport.BB({
  'Borough Code-1': '1',
  'Street Name-1': 'BRO',
})
  .then((response) => {
    console.log(response);
  });

geosupport.BF({
  'Borough Code-1': '1',
  'Street Name-1': 'BRO',
})
  .then((response) => {
    console.log(response);
  });

geosupport.BL({
  'BOROUGH BLOCK LOT (BBL)': '1000477501',
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

geosupport.D({
  'B10SC-1 (includes Borough Code 1, B5SC-1 and B7SC-1):': '118030',
})
  .then((response) => {
    console.log(response);
  });

geosupport.DG({
  'B10SC-1 (includes Borough Code 1, B5SC-1 and B7SC-1):': '11803001',
})
  .then((response) => {
    console.log(response);
  });

geosupport.DN({
  'B10SC-1 (includes Borough Code 1, B5SC-1 and B7SC-1):': '11803001010',
})
  .then((response) => {
    console.log(response);
  });

geosupport['N*']({
  'Street Name-1': 'Bridge st',
})
  .then((response) => {
    console.log(response);
  });
