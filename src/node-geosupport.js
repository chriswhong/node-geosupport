const ffi = require('ffi');
const { formatInput, parseOutput } = require('./utils/io');

const lib = ffi.Library(`${process.env.LD_LIBRARY_PATH}/libgeo.so`, {
  geo: ['void', ['char *', 'char *']],
});

// convert work area strings to buffer, call geosupport, convert responses to strings
const callGeolib = (wa1, wa2) => {
  const wa1Buffer = Buffer.alloc(1200);
  const wa2Buffer = Buffer.alloc(4300);

  wa1Buffer.write(wa1);
  wa2Buffer.write(wa2);

  lib.geo(wa1Buffer, wa2Buffer);

  return {
    wa1Response: wa1Buffer.toString(),
    wa2Response: wa2Buffer.toString(),
  };
};

const call = async (params) => {
  params['Geosupport Function Code'] = '1B';

  const { flags, wa1, wa2 } = formatInput(params);

  const { wa1Response, wa2Response } = callGeolib(wa1, wa2);

  const output = parseOutput(flags, wa1Response, wa2Response);
  return output;
};

module.exports = {
  '1B': call,
};
