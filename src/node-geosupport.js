const ffi = require('ffi');
const parseBuffer = require('./parseBuffer');

require('dotenv').config();

const lib = ffi.Library(`${process.env.GEOSUPPORT_PATH}/libgeo.so`, {
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

// convert work area strings to buffer, call geosupport, convert responses to strings
const callGeolib = (wa1, wa2) => {
  const wa1Buffer = new Buffer(1200);
  const wa2Buffer = new Buffer(4300);

  wa1Buffer.write(wa1, 'utf8');
  wa2Buffer.write(wa2, 'utf8');

  lib.geo(wa1Buffer, wa2Buffer);

  return {
    wa1Response: wa1Buffer.toString(),
    wa2Response: wa2Buffer.toString(),
  };
};

const call = (params) => {
  const { houseNumber, boroCode, streetName, zipCode } = params;
  const wa1 = `1B${rightpad(houseNumber, 16)}${rightpad('', 38)}${boroCode}${rightpad('', 10)}${rightpad(streetName, 32)}C${rightpad(zipCode, 5)}`;
  const wa2 = '';

  const { wa1Response, wa2Response } = callGeolib(wa1, wa2);

  return parseBuffer(wa1Response, wa2Response);
};


module.exports = {
  '1B': call,
};
