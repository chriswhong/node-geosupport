const parseBuffer = (wa1, wa2) => {
  const p = ` ${wa1}`; // prepend one character so substring numbers match with user guide
  const returnCode = p.substring(717, 719);
  console.log('Return Code: ', returnCode);
  console.log('Work Area 1:', wa1);
  //console.log('Work Area 2:', wa2);
  if (returnCode === '00') {

    const wa1Output = { // refer to user guide, p582
      firstBoroName: p.substring(361, 369),
      houseNumberDisplay: p.substring(370, 385),
      houseNumberSort: p.substring(386, 396),
      firstBoroStreetCode: p.substring(397, 407),
      firstStreetNameNormalized: p.substring(408, 439),
      secondBoroStreetCode: p.substring(440, 450),
      secondStreetNameNormalized: p.substring(451, 482),
      thirdBoroStreetCode: p.substring(483, 493),
      thirdStreetNameNormalized: p.substring(494, 525),
      bbl: p.substring(526, 535),
    };

    console.log(wa1Output);

    // // State Plane coords
    // x = +(wa2.substring(125, 132));
    // y = +(wa2.substring(132, 139));

    // address.tract = +(wa2.substring(223, 229));
    // address.block = +(wa2.substring(229, 233));
    // address.lngLat = reproject([x, y]);
    return null;
  }
  return null;
};

module.exports = parseBuffer;
