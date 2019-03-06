const ffi = require('ffi');
const formatInput = require('./format-input');
const parseOutput = require('./parse-output');
const parseCSV = require('./utils/parse-CSV');

// specify the location of geosupport's libgeo.so and how to call it
const lib = ffi.Library(`${process.env.LD_LIBRARY_PATH}/libgeo.so`, {
  geo: ['void', ['char *', 'char *']],
});

// convert work area strings to buffer, call geosupport, convert responses to strings
const callGeolib = (wa1, wa2) => {
  const wa1Buffer = Buffer.alloc(wa1.length);
  const wa2Buffer = Buffer.alloc(wa2.length);

  wa1Buffer.write(wa1);
  wa2Buffer.write(wa2);

  lib.geo(wa1Buffer, wa2Buffer);

  return {
    wa1Response: wa1Buffer.toString(),
    wa2Response: wa2Buffer.toString(),
  };
};

const buildCallForFunctionCode = functionCode => (
  async (params) => {
    const inputParams = params;
    inputParams['Geosupport Function Code'] = functionCode;

    const { flags, wa1, wa2 } = formatInput(inputParams);

    const { wa1Response, wa2Response } = callGeolib(wa1, wa2);

    const output = parseOutput(flags, wa1Response, wa2Response);
    return output;
  });

const buildExports = () => {
  const geosupportFunctions = parseCSV('function_info.csv');

  const exportsObject = {};
  geosupportFunctions.forEach(({ function: functionCode }) => {
    exportsObject[functionCode] = buildCallForFunctionCode(functionCode);
  });
  return exportsObject;
};

module.exports = buildExports();
