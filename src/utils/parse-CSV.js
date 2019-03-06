const fs = require('fs');
const path = require('path');
const csvjson = require('csvjson');

const options = {
  delimiter: ',',
  quote: '"',
};

module.exports = (pathToFile) => {
  const data = fs.readFileSync(path.join(__dirname, '../csv', pathToFile), { encoding: 'utf8' });
  return csvjson.toObject(data, options);
};
