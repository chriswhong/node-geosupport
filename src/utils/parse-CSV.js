const fs = require('fs');
const path = require('path');
const csvjson = require('csvjson');

module.exports = (pathToFile) => {
  const data = fs.readFileSync(path.join(__dirname, pathToFile), { encoding: 'utf8' });
  return csvjson.toObject(data);
};
