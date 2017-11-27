const ffi = require('ffi');
const parseWorkArea2Function1 = require('../parsers/work-area-2/function-1');
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

const function1 = (params) => {
  const { houseNumber, boroCode, streetName, zipCode } = params;
  let workArea1 = `1B${rightpad(houseNumber, 16)}${rightpad('', 38)}${boroCode}${rightpad('', 10)}${rightpad(streetName, 32)}C${rightpad(zipCode, 5)}`;
  workArea1 = workArea1.toUpperCase();
  const workArea1Buffer = new Buffer(1200);
  const workArea2Buffer = new Buffer(300);

  workArea1Buffer.write(workArea1, 'utf8');

  lib.geo(workArea1Buffer, workArea2Buffer);

  const workArea1Response = workArea1Buffer.toString();
  const workArea2Response = workArea2Buffer.toString();

  const workArea1Data = parseWorkArea1(workArea1Response);
  const workArea2Data = parseWorkArea2Function1(workArea2Response);

  return workArea2Data
};

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

module.exports = { function1, functionB };
