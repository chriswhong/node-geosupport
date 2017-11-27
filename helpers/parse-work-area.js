String.prototype.getSubString = function (startPosition, length) { // eslint-disable-line
  return this.toString().substring(startPosition - 1, (startPosition - 1) + length).trim();
};

const parseWorkArea = (workArea, config) => {
  const parsed = Object.keys(config)
    .reduce((obj, key) => {
      const newObj = obj;
      const [startPosition, length, transform] = config[key];
      newObj[key] = workArea.getSubString(startPosition, length);
      if (transform && (newObj[key].length > 0)) newObj[key] = transform(newObj[key]);
      return newObj;
    }, {});

  const output = Object.keys(parsed)
    .filter(key => parsed[key].length > 0)
    .reduce((obj, key) => {
      const newObj = obj;
      newObj[key] = parsed[key];
      return newObj;
    }, {});

  return output;
};

module.exports = parseWorkArea;
