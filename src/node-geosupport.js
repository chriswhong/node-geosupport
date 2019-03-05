const ffi = require('ffi');
const parseBuffer = require('./parseBuffer');
const csv = require('csvtojson');

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

  wa1Buffer.write(wa1);
  wa2Buffer.write(wa2);

  lib.geo(wa1Buffer, wa2Buffer);

  return {
    wa1Response: wa1Buffer.toString(),
    wa2Response: wa2Buffer.toString(),
  };
};

const createWa1 = async (params) => {
  params['Work Area Format Indicator'] = 'C';

  const layouts = await csv().fromFile('src/function_info/work_area_layouts/input/WA1.csv');

  const buffer = new Buffer(1200);
  buffer.fill(' ');

  Object.keys(params).forEach((key) => {
    const layout = layouts.find(d => d.name === key);
    buffer.write(params[key], parseInt(layout.from, 10) - 1, parseInt(layout.size, 10));
  });
  console.log('O HI', buffer.toString().substring(0, 2))

  return buffer.toString();
}

const createWa2 = (params) => {
 return ''
}

const formatInput = async (params) => {
  const wa1 = await createWa1(params);
  const wa2 = '';

  return { wa1, wa2 };
}

const call = async (params) => {
  params['Geosupport Function Code'] = '1A';
  // const { houseNumber, boroCode, streetName, zipCode } = params;
  // const wa1 = `1B${rightpad(houseNumber, 16)}${rightpad('', 38)}${boroCode}${rightpad('', 10)}${rightpad(streetName, 32)}C${rightpad(zipCode, 5)}`;
  // const wa2 = '';

  const { wa1, wa2 } = await formatInput(params);
  console.log('here', wa1)

  const { wa1Response, wa2Response } = callGeolib(wa1, wa2);
  console.log('there', wa1Response)

  return parseBuffer(wa1Response, wa2Response);
};

module.exports = {
  '1B': call,
};
