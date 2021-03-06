const parseCSV = require('./utils/parse-CSV');
const { parseField } = require('./utils/parse-workarea');

const workArea1Layouts = parseCSV('work_area_layouts/input/WA1.csv');

// build work area 1 from the parameters being passed in
const createWa1 = (params) => {
  const newParams = {
    work_area_format: 'C',
    ...params,
  };

  const buffer = Buffer.alloc(1200, ' ');

  Object.keys(newParams).forEach((key) => {
    // TODO normalize and validate inputs
    const layout = workArea1Layouts.find(d => (d.name === key) || d.alt_names.split(',').map(name => name.trim()).includes(key));

    buffer.write(newParams[key], parseInt(layout.from, 10) - 1, parseInt(layout.size, 10));
  });

  return buffer.toString();
};

// build work area 2 based on the flags defined in the creation of work area 1
const createWa2 = (flags) => {
  const functions = parseCSV('function_info.csv');

  // get length
  const functionConfig = functions.find(d => d.function === flags.function);
  const length = parseInt(functionConfig[flags.mode], 10);

  if (length == null) return null;

  if (flags.auxseg) return length + 500;

  const buffer = Buffer.alloc(length, ' ');
  buffer.fill(' ');

  return buffer.toString();
};

const getMode = (flags) => {
  if (flags.mode_switch) {
    return 'extended';
  } if (flags.long_work_area_2 && flags.tpad) {
    return 'long+tpad';
  } if (flags.long_work_area_2) {
    return 'long';
  }

  return 'regular';
};

const getFlags = (wa1) => {
  const flags = {
    function: parseField(workArea1Layouts, 'Geosupport Function Code', wa1).trim(),
    mode_switch: parseField(workArea1Layouts, 'Mode Switch', wa1) === 'X',
    long_work_area_2: parseField(workArea1Layouts, 'Long Work Area 2 Flag', wa1) === 'L',
    tpad: parseField(workArea1Layouts, 'TPAD Switch', wa1) === 'Y',
    auxseg: parseField(workArea1Layouts, 'Auxiliary Segment Switch', wa1) === 'Y',
  };

  flags.mode = getMode(flags);

  return flags;
};

const formatInput = (params) => {
  const wa1 = createWa1(params);
  const flags = getFlags(wa1);
  const wa2 = createWa2(flags);

  return { flags, wa1, wa2 };
};

module.exports = formatInput;
