const parseCSV = require('./utils/parse-CSV');
const parseField = require('./utils/parse-field');

const workArea1Layouts = parseCSV('work_area_layouts/input/WA1.csv');

const createWa1 = (params) => {
  params['Work Area Format Indicator'] = 'C';

  const buffer = Buffer.alloc(1200, ' ');

  Object.keys(params).forEach((key) => {
    // TODO normalize and validate inputs
    const layout = workArea1Layouts.find(d => d.name === key);
    buffer.write(params[key], parseInt(layout.from, 10) - 1, parseInt(layout.size, 10));
  });

  return buffer.toString();
};

const createWa2 = (flags) => {
  const functions = parseCSV('function_info.csv');

  // get length
  const functionConfig = functions.find(d => d.function === flags.function);
  console.log('functionConfig', functionConfig, flags)
  const length = parseInt(functionConfig[flags.mode], 10);
  console.log('length', length)

  if (length == null) return null;

  if (flags.auxseg) return length + 500;

  const buffer = Buffer.alloc(length, ' ');
  buffer.fill(' ');

  return buffer.toString();
};

const getMode = (flags) => {
  if (flags.mode_switch) {
    return 'extended';
  } else if (flags.long_work_area_2 && flags.tpad) {
    return 'long+tpad';
  } else if (flags.long_work_area_2) {
    return 'long';
  }

  return 'regular';
};

const getFlags = (wa1, layouts) => {
  const flags = {
    function: parseField(layouts, 'Geosupport Function Code', wa1).trim(),
    mode_switch: parseField(layouts, 'Mode Switch', wa1) === 'X',
    long_work_area_2: parseField(layouts, 'Long Work Area 2 Flag', wa1) === 'L',
    tpad: parseField(layouts, 'TPAD Switch', wa1) === 'Y',
    auxseg: parseField(layouts, 'Auxiliary Segment Switch', wa1) === 'Y',
  };

  flags.mode = getMode(flags);

  return flags;
};

const formatInput = (params) => {
  const wa1 = createWa1(params);
  const flags = getFlags(wa1, workArea1Layouts);
  const wa2 = createWa2(flags);

  return { flags, wa1, wa2 };
};

module.exports = formatInput;
