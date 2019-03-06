const parseCSV = require('./utils/parse-CSV');
const parseField = require('./utils/parse-field');

const workArea1Layouts = parseCSV('work_area_layouts/input/WA1.csv');

const parseWorkArea = (output, layouts, wa) => {
  layouts.forEach((layout) => {
    output[layout.name] = parseField(layouts, layout.name, wa);
  });

  return output;
};

// trim whitespace, only return keys that contain data
const cleanOutput = (output) => {
  Object.keys(output).forEach((key) => {
    output[key] = output[key].trim();
    if (output[key].length === 0) delete output[key];
  });

  return output;
};

const parseOutput = (flags, wa1, wa2, functionCode) => {
  let output = {};

  output = parseWorkArea(output, workArea1Layouts, wa1);

  let outpuLayoutFilename = '';
  switch (functionCode) {
    case '1':
      outpuLayoutFilename = '1_1E';
      break;
    default:
      outpuLayoutFilename = functionCode;
  }


  const outputLayouts = parseCSV(`work_area_layouts/output/${outpuLayoutFilename}.csv`);

  output = parseWorkArea(output, outputLayouts, wa2);

  return cleanOutput(output);
};

module.exports = parseOutput;
