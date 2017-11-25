const ffi = require('ffi');
// const workAreaTwoFunction1 = require('./parsers/workArea2-1');
const parseWorkArea1 = require('../parsers/work-area-1');

const lib = ffi.Library('./geosupport/lib/libgeo', {
  geo: ['void', ['char *', 'char *']],
});

const rightpad = (str, width) => {
  let paddedString = str.toString();
  while (paddedString.length < width) {
    paddedString += ' ';
  }
  if (paddedString.length > width) {
    return paddedString.slice(0, width);
  }
  return paddedString;
};

// const geocode = (params) => {
//   const { houseNumber, boroCode, streetName, zipCode } = params;
//   let wa1 = `1B${rightpad(houseNumber, 16)}${rightpad('', 38)}${boroCode}${rightpad('', 10)}${rightpad(streetName, 32)}C${rightpad(zipCode, 5)}`;
//   wa1 = wa1.toUpperCase();
//   const wa1Buffer = new Buffer(1200);
//   const wa2Buffer = new Buffer(4300);
//
//   wa1Buffer.write(wa1, 'utf8');
//
//   lib.geo(wa1Buffer, wa2Buffer);
//
//   const wa1Response = wa1Buffer.toString();
//   const wa2Response = wa2Buffer.toString();
//   console.log(wa1Response, wa2Response)
//   return parseBuffer(wa1Response, wa2Response);
// };

const functionB = (boro, string) => {
  let workArea1 = `BF${rightpad('', 54)}${boro.toString()}${rightpad('', 10)}${rightpad(string, 32)}`;
  workArea1 = workArea1.toUpperCase();
  const workArea1Buffer = new Buffer(1200);
  const workArea2Buffer = new Buffer(0);

  workArea1Buffer.write(workArea1, 'utf8');

  lib.geo(workArea1Buffer, workArea2Buffer);

  const workArea1Response = workArea1Buffer.toString();
  return parseWorkArea1(workArea1Response);
};

module.exports = { functionB };
