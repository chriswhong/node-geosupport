const csv = require('csvtojson');

const createWa1 = (params, layouts) => {
  params['Work Area Format Indicator'] = 'C';

  const buffer = Buffer.alloc(1200, ' ');

  Object.keys(params).forEach((key) => {
    // TODO normalize and validate inputs
    const layout = layouts.find(d => d.name === key);
    buffer.write(params[key], parseInt(layout.from, 10) - 1, parseInt(layout.size, 10));
  });

  return buffer.toString();
};

const createWa2 = (flags, functions) => {
  // get length
  const functionConfig = functions.find(d => d.function === flags.function);
  const length = parseInt(functionConfig[flags.mode], 10);

  if (length == null) return null;

  if (flags.auxseg) return length + 500;

  const buffer = Buffer.alloc(length, ' ');
  buffer.fill(' ');

  return buffer.toString();
};

const parseField = (layouts, name, wa) => {
  const layout = layouts.find(d => d.name === name);

  return wa.substring(parseInt(layout.from, 10) - 1, parseInt(layout.to, 10));
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
    function: parseField(layouts, 'Geosupport Function Code', wa1),
    mode_switch: parseField(layouts, 'Mode Switch', wa1) === 'X',
    long_work_area_2: parseField(layouts, 'Long Work Area 2 Flag', wa1) === 'L',
    tpad: parseField(layouts, 'TPAD Switch', wa1) === 'Y',
    auxseg: parseField(layouts, 'Auxiliary Segment Switch', wa1) === 'Y',
  };

  flags.mode = getMode(flags);

  return flags;
};

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

const formatInput = async (params) => {
  const layouts = await csv().fromFile('src/function_info/work_area_layouts/input/WA1.csv');
  const functions = await csv().fromFile('src/function_info/function_info.csv');


  const wa1 = createWa1(params, layouts);

  const flags = getFlags(wa1, layouts);
  console.log(flags);

  const wa2 = createWa2(flags, functions);

  return { flags, wa1, wa2 };
};

const parseOutput = async(flags, wa1, wa2) => {
  let output = {};

  const layouts = await csv().fromFile('src/function_info/work_area_layouts/output/WA1.csv');

  output = parseWorkArea(output, layouts, wa1);

  const moreLayouts =  await csv().fromFile('src/function_info/work_area_layouts/output/1B.csv');

  output = parseWorkArea(output, moreLayouts, wa2);

  return cleanOutput(output);
};

module.exports = {
  formatInput,
  parseOutput,
};
