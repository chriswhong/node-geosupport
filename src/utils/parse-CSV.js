const fs = require('fs');
const csvjson = require('csvjson');

module.exports = (path) => {
  const data = fs.readFileSync(path.join(__dirname, 'path'), { encoding: 'utf8' });
  return csvjson.toObject(data);
};
