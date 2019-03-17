const parseCSV = require('./parse-CSV');

const flag = (trueValue, falseValue) => (d) => {
  if ((typeof d) === 'boolean') {
    return d ? trueValue : falseValue;
  }

  return d || falseValue;
};

const listOfWorkareas = (layouts, length) => (d) => {
  // split input value into array of characters of length
  // get rid of workAreas that don't have any values
  const workAreas = d.match(new RegExp(`.{${length}}`, 'g'))
    .filter(workArea => workArea.trim().length > 0);

  return workAreas.map(workArea => parseWorkArea(layouts, workArea));
};

const lgiLayouts = parseCSV('work_area_layouts/output/LGI.csv');
const lgiExtendedLayouts = parseCSV('work_area_layouts/output/LGI-extended.csv');
const binsLayouts = parseCSV('work_area_layouts/output/BINs.csv');
const binsTpadLayouts = parseCSV('work_area_layouts/output/BINs-tpad.csv');
const intersectionLayouts = parseCSV('work_area_layouts/output/INTERSECTION.csv');


const formatters = {
  function: v => v, // not sure why we need to format the function code
  CT: value => value.replace(/\s/g, '0'), // replace census tract spaces with zeros

  // flags
  auxseg: flag('Y', 'N'),
  cross_street_names: flag('E', ''),
  long_work_area_2: flag('L', ''),
  mode_switch: flag('X', ''),
  real_streets_only: flag('R', ''),
  roadbed_request_switch: flag('R', ''),
  street_name_normalization: flag('C', ''),
  tpad: flag('Y', 'N'),

  LGI: listOfWorkareas(lgiLayouts, 53),
  'LGI-extended': listOfWorkareas(lgiExtendedLayouts, 116),
  BINs: listOfWorkareas(binsLayouts, 7),
  'BINs-tpad': listOfWorkareas(binsTpadLayouts, 8),
  intersections: listOfWorkareas(intersectionLayouts, 55),
};

const listOfItems = (value, length) => value
  .match(new RegExp(`.{${length}}`, 'g'))
  .map(d => d.trim())
  .filter(d => d.length > 0);

const parseField = (layouts, name, wa) => {
  const layout = layouts.find(d => d.name === name);
  const { formatter } = layout;

  const rawValue = wa.substring(parseInt(layout.from, 10) - 1, parseInt(layout.to, 10));
  let returnValue = rawValue;

  if (Object.keys(formatters).indexOf(formatter) > -1) {
    returnValue = formatters[formatter](rawValue);
  } else if (parseInt(formatter, 10) > 0) {
    returnValue = listOfItems(rawValue, parseInt(formatter, 10));
  }

  // trim whitespace
  return (typeof returnValue) === 'string' ? returnValue.trim() : returnValue;
};

// converts a work area string into an object using index definitions in layout
// sets keys on object
const parseWorkArea = (layouts, workArea) => {
  const output = {};

  layouts.forEach((layout) => {
    const value = parseField(layouts, layout.name, workArea);
    if (value.length > 0) output[layout.name] = value;
  });

  return output;
};

module.exports = {
  parseWorkArea,
  parseField,
};
