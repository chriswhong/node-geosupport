const parseWorkArea = require('../helpers/parse-work-area');

const workArea1 = (buffer) => {
  const config = { // refer to user guide, p582, p597
    firstBoroName: [361, 9],
    houseNumberDisplay: [370, 16],
    houseNumberSort: [386, 11],
    firstBoroStreetCode: [397, 11],
    firstStreetNameNormalized: [408, 32],
    secondBoroStreetCode: [440, 11],
    secondStreetNameNormalized: [451, 32],
    thirdBoroStreetCode: [483, 11],
    thirdStreetNameNormalized: [494, 32],
    bbl: [526, 10],
    borocode: [526, 1],
    block: [527, 5],
    lot: [532, 4],
    lowHouseNumberDisplay: [537, 16],
    lowHouseNumberSort: [553, 11],
    bin: [564, 7],
    streetAttributeIndicator: [712, 1],
    reasonCode: [713, 1],
    reasonQualifier: [714, 1],
    returnCode: [717, 2],
    message: [719, 80],
    numberOfStreetCodes: [799, 2],
    b7sc: [801, 80, str => str.match(/.{1,8}/g)
      .map(d => d.trim())
      .filter(d => d.length > 0)],
    streetNames: [881, 320, str => str.match(/.{1,32}/g)
      .map(d => d.trim())
      .filter(d => d.length > 0)],
  };

  return parseWorkArea(buffer, config);
};

module.exports = workArea1;
