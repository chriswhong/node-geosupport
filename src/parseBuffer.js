String.prototype.getSubString = function (location, length) { // eslint-disable-line
  return this.toString().substring(location - 1, (location - 1) + length);
};

const parseBuffer = (wa1, wa2) => {
  const returnCode = wa1.getSubString(717, 2);

  if (returnCode === '00') {
    const output = { // refer to user guide, p582, p597
      firstBoroName: wa1.getSubString(361, 9),
      houseNumberDisplay: wa1.getSubString(370, 16),
      houseNumberSort: wa1.getSubString(386, 11),
      firstBoroStreetCode: wa1.getSubString(397, 11),
      firstStreetNameNormalized: wa1.getSubString(408, 32),
      communityDistrict: wa2.getSubString(150, 3),
      zipCode: wa2.getSubString(153, 5),
      electionDistrict: wa2.getSubString(158, 3),
      atomicPolygon: wa2.getSubString(206, 3),
      censusTract10: wa2.getSubString(224, 6),
      censusBlock10: wa2.getSubString(230, 4),
      ntaName: wa2.getSubString(554, 75),
      latitude: wa2.getSubString(654, 9),
      longitude: wa2.getSubString(663, 11),
      bbl: wa2.getSubString(1534, 10),
    };

    return output;
  }
  return {
    error: 'not found',
  };
};

module.exports = parseBuffer;
