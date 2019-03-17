const parseCSV = require('./utils/parse-CSV');
const { parseWorkArea } = require('./utils/parse-workarea');

const workArea1Layouts = parseCSV('work_area_layouts/output/WA1.csv');

const parseOutput = (flags, wa1, wa2, functionCode) => {
  let output = parseWorkArea(workArea1Layouts, wa1);

  if (wa2.length > 0) {
    let outputLayoutFilename = '';
    switch (functionCode) {
      case '1':
      case '1E':
        outputLayoutFilename = '1_1E';
        break;
      case '1A':
      case 'BL':
      case 'BN':
        outputLayoutFilename = '1A_BL_BN';
        break;
      default:
        outputLayoutFilename = functionCode;
    }

    const outputLayouts = parseCSV(`work_area_layouts/output/${outputLayoutFilename}.csv`);

    output = { ...output, ...parseWorkArea(outputLayouts, wa2) };
  }

  return output;
};

module.exports = parseOutput;
