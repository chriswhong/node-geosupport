String.prototype.getSubString = function (location, length) { // eslint-disable-line
  return this.toString().substring(location - 1, (location - 1) + length);
};

const workArea2Function1 = (workArea2) => {
  const parsed = { // refer to user guide, p582, p597
    continuousParityIndicator: [150, 3],
    lowHouseNumberSort: [23, 11],
    highHouseNumberSort: [34, 11],
    dcpPreferredLgc: [45, 2],
    numberCrossStreetsAtLowAddressEnd: [47, 1],
    crossStreetsAtLowAddressEnd: [48, 30],
    numberCrossStreetsAtHighAddressEnd: [78, 1],
    crossStreetsAtHighAddressEnd: [79, 30],
    lionKey: [190, 10],
    specialAddressGeneratedRecordFLag: [119, 1],
    sideOfStreetIndicator: [120, 1],
    segmentLength: [121, 5],
    xcoord: [126, 7],
    ycoord: [133, 7],
    interimAssistanceEligibilityIndicator: [147, 1],
    alternativeBoroughFlag: [148, 1],
    dotStreetlightContractorArea: [149, 1],
    communityDistrict: [150, 3],
    zipCode: [153, 5],
    electionDistrict: [158, 3],
    assemblyDistrict: [161, 2],
    splitElectionDistrictFlag: [163, 1],
    congressionalDistrict: [164, 2],
    stateSenatorialDistrict: [166, 2],
    civilCourtDistrict: [168, 2],
    cityCouncilDistrict: [170, 2],
    healthCenterDistrict: [172, 2],
    healthArea: [174, 4],
    sanitationDistrict: [178, 3],
    santiationSchedulingSection: [181, 2],
    sanitationRegularCollectionSchedule: [183, 5],
    sanitationRecyclingCollectionSchedule: [188, 3],
    policePatrolBoroughCommand: [192, 3],
    policePrecinct: [163, 1],
    fireDivision: [195, 2],
    fireBattalion: [197, 2],
    fireCompanyType: [199, 1],
    fireCompanyNumber: [200, 3],
    splitCommunitySchoolDistrict: [203, 1],
    communitySchoolDistrict: [204, 2],
    atomicPolygon: [206, 3],
    policePatrolBorough: [209, 2],
    featureTypeCode: [211, 1],
    segmentTypeCode: [212, 1],
    alleyOrCrossStreetListFlag: [213, 1],
    coincidenceSegmentCount: [214, 1],
    censusTract1990: [218, 6],
    censusTract2010: [224, 6],
    censusBlock2010: [230, 4],
    censusBlockSuffix2010: [234, 1],
    censusTract2000: [235, 6],
    censusBlock2000: [241, 4],
    censusBlockSuffix2000: [245, 1],
    neighborhoodTabulationArea: [246, 4],
    dsnySnowPriorityCode: [250, 1],
    dsnyOrganicRecyclingSchedule: [251, 5],
    dsnyBulkPickupSchedule: [256, 5],
    hurricaneEvacuationZone: [261, 2],
    addressNumber: [274, 11],
    b7sc: [285, 8],
    segmentIdentifier: [293, 7],
    curveFlag: [300, 1],
  };

  const output = Object.keys(parsed)
    .filter(key => parsed[key].length > 0)
    .reduce((obj, key) => {
      const newObj = obj;
      newObj[key] = parsed[key];
      return newObj;
    }, {});

  return output;
};

module.exports = workArea2Function1;
