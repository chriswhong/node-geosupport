const parseCSV = require('./utils/parse-CSV');
const parseField = require('./utils/parse-field');

const workArea1Layouts = parseCSV('../function_info/work_area_layouts/input/WA1.csv');

const parseWorkArea = (output, layouts, wa) => {
  layouts.forEach((layout) => {
    output[layout.name] = parseField(layouts, layout.name, wa);
  });

  return output;
};

const cleanOutput = (output) => {
  Object.keys(output).forEach((key) => {
    output[key] = output[key].trim();
    if (output[key].length === 0) delete output[key];
  });

  return output;
};

const parseOutput = (flags, wa1, wa2) => {
  let output = {};

  output = parseWorkArea(output, workArea1Layouts, wa1);

  const outputLayouts = parseCSV('../function_info/work_area_layouts/output/1B.csv');

  output = parseWorkArea(output, outputLayouts, wa2);

  return cleanOutput(output);
};

module.exports = parseOutput;
