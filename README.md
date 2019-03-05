# node-geosupport

Node.js bindings for the NYC Department of City Planning's [Geosupport Geocoder](https://www1.nyc.gov/site/planning/data-maps/open-data/dwn-gde-home.page).

The current approach to this project is to serve as a node.js port of the more mature [`python-geosupport`](https://github.com/ishiland/python-geosupport/) library.  `src/function_info` contains CSV files copied directly from `python-geosupport` that include all of the configuration details for creating and parsing geosupport's "Work Areas" (the long buffers passed to and from the geosupport binary).

If new fields are added to geosupport in the future, both packages can be updated easily using the newest version of the CSVs.

## How to Use

This package is still in its early stages and is not yet published.  You can install it from github:

`npm install chriswhong/node-geosupport`

You must also have geosupport desktop edition installed in your environment.  This code was designed around the [Linux Version of Geosupport Desktop](https://www1.nyc.gov/site/planning/data-maps/open-data/dwn-gde-home.page).  (It won't work on a Mac unless you use Docker, see below.)  

Geosupport exists as a collection of files and directories.  

```
geosupport/
  bin/
  doc/
  fls/
  include/
  lib/
  scripts/
```

Set up environment variables:

`LD_LIBRARY_PATH` - the path to the geosupport `lib/` directory (used by geosupport)

`GEOFILES` - the path to the geosupport `fls/` directory (used by geosupport)

Assuming your environment variables are all set up properly, and your geosupport files are in the right place, you can call geosupport's functions and pass input parameters in.

This example uses geosupport function 1B (address search) for __120 Broadway, Manhattan 10271__.

```
const geosupport = require('../index.js');

const params = {
  'House Number - Display Format': '120',
  'Street Name-1': 'BROADWAY',
  'ZIP Code Input': '10271',
  'Borough Code-1': '1',
};

geosupport['1B'](params)
  .then((response) => {
    console.log(response);
  });

```

The response is an object containing only those keys that geosupport returned with non-space values:

```
{ 'First Borough Name': 'MANHATTAN',
  'House Number - Display Format': '120',
  'House Number - Sort Format': '000120000AA',
  'B10SC - First Borough and Street Code': '11361001010',
  'First Street Name Normalized': 'BROADWAY',
  'BOROUGH BLOCK LOT (BBL):': '1000477501',
  'Borough Code': '1',
  'Tax Block': '00047',
  'Tax Lot': '7501',
  'Geosupport Return Code 2 (GRC 2)': '00',
  'Geosupport Return Code (GRC)': '00',
  'Low House Number of Block Face': '000104000AA',
  'High House Number of Block Face': '000120000AA',
  'DCP Preferred LGC': '01',
  'Number of Cross Streets at Low Address End': '1',
  'List of Cross Streets at Low Address End': '128870',
  'Number of Cross Streets at High Address End': '1',
  'List of Cross Streets at High Address End': '132390',
  'LION KEY:': '1075501070',
  'Face Code': '0755',
  'Sequence Number': '01070',
  'Side of Street Indicator': 'R',
  'Segment Length in Feet': '00124',
  'Spatial X-Y Coordinates of Address': '09811890197419',
  'Community Development Eligibility Indicator': 'I',
  'DOT Street Light Contractor Area': '1',
  'COMMUNITY DISTRICT:': '101',
  'Community District Borough Code': '1',
  'Community District Number': '01',
  'ZIP Code': '10271',
  'Election District': '092',
  'Assembly District': '65',
  'Congressional District': '10',
  'State Senatorial District': '26',
  'Civil Court District': '01',
  'City Council District': '01',
  'Health Center District': '15',
  'Health Area': '7700',
  'Sanitation District': '101',
  'Sanitation Collection Scheduling Section and Subsection': '1A',
  'Sanitation Regular Collection Schedule': 'MWF',
  'Sanitation Recycling Collection Schedule': 'EF',
  'Police Patrol Borough Command': '1',
  'Police Precinct': '001',
  'Fire Division': '01',
  'Fire Battalion': '01',
  'Fire Company Type': 'E',
  'Fire Company Number': '004',
  'Community School District': '02',
  'Atomic Polygon': '303',
  'Police Patrol Borough': 'MS',
  'Segment Type Code': 'U',
  'Coincidence Segment Count': '1',
  '1990 Census Tract': '7',
  '2010 Census Tract': '7',
  '2010 Census Block': '1001',
  '2000 Census Tract': '7',
  '2000 Census Block': '3002',
  'Neighborhood Tabulation Area (NTA)': 'MN25',
  'DSNY Snow Priority Code': 'C',
  'DSNY Bulk Pickup Schedule': 'EMWF',
  'Hurricane Evacuation Zone (HEZ)': '5',
  'Underlying B7SC': '11361001',
  'Segment Identifier': '0299595',
  'List of 4 LGCs': '0107',
  'BOE LGC Pointer': '1',
  'Segment Azimuth': '058',
  'Segment Orientation': 'N',
  'SPATIAL COORDINATES OF SEGMENT:': '09811310197331       09811970197437',
  'X Coordinate, Low Address End': '0981131',
  'Y Coordinate, Low Address End': '0197331',
  'X Coordinate, High Address End': '0981197',
  'Y Coordinate, High Address End': '0197437',
  'SPATIAL COORDINATES OF CENTER OF CURVATURE:': '00000000000000',
  'X Coordinate': '0000000',
  'Y Coordinate': '0000000',
  'From LION Node ID': '0015252',
  'To LION Node ID': '0015253',
  'LION Key for Vanity Address': '1075501070',
  'Side of Street of Vanity Address': 'R',
  'Split Low House Number': '000104000AA',
  'Traffic Direction': 'A',
  'Roadway Type': '1',
  'Physical ID': '0000491',
  'Generic ID': '0000378',
  'Street Status': '2',
  'Street Width': '38',
  'From Preferred LGCs First Set of 5': '01',
  'To Preferred LGCs First Set of 5': '01',
  'NTA Name': 'Battery Park City-Lower Manhattan',
  'USPS Preferred City Name': 'NEW YORK',
  Latitude: '40.708546',
  Longitude: '-74.011041',
  'From Actual Segment Node ID': '0015252',
  'To Actual Segment Node ID': '0015253',
  'SPATIAL COORDINATES OF ACTUAL SEGMENT:': '09811310197331       09811970197437',
  'Blockface ID': '0212260870',
  'Number of Travel Lanes on the Street': '2',
  'Number of Parking Lanes on the Street': '2',
  'Number of Total Lanes on the Street': '4',
  'Street Width Maximum': '38',
  'Speed Limit': '25',
  'PUMA Code': '03810',
  'Return Code': '00',
  'No. of Cross Streets at High Address End': '1',
  'List of Cross Street Names at Low Address End': 'PINE STREET',
  'List of Cross Street Names at High Address End': 'THAMES STREET',
  'BOE Preferred B7SC': '11361001',
  'BOE Preferred Street Name': 'BROADWAY',
  'Low House Number of Defining Address Range': '000104000AA',
  'RPAD Self-Check Code (SCC) for BBL': '1',
  'RPAD Building Classification Code': 'RB',
  'Number of Existing Structures on Lot': '0001',
  'Number of Street Frontages of Lot': '05',
  'STROLLING KEY:': '113610R000124000AA',
  Borough: '1',
  '5-Digit Street Code of ON- Street': '13610',
  'High House Number': '000124000AA',
  'Building Identification Number (BIN) of Input Address or NAP': '1001026',
  'Condominium Flag': 'C',
  'DOF Condominium Identification Number': '0871',
  'Condominium Billing BBL': '1000477501',
  'Self-Check Code (SCC) of Billing BBL': '1',
  'Low BBL of this Building\'s Condominium Units': '1000471001',
  'High BBL of this Building\'s Condominium Units': '1000471002',
  'SBVP (SANBORN MAP IDENTIFIER):': '101S005',
  'Sanborn Borough Code': '1',
  'Volume Number': '01',
  'Volume Number Suffix': 'S',
  'Page Number': '005',
  'DCP Commercial Study Area': '11001',
  'Tax Map Number Section & Volume': '10101',
  'X-Y Coordinates of Lot Centroid': '09813330197300',
  'Business Improvement District (BID)': '113140',
  'DCP Zoning Map': '12B',
  'Internal Use': '0107',
  'Number of Entries in List of Geographic Identifiers': '0005',
  'LIST OF GEOGRAPHIC IDENTIFIERS:': '104             124113610011001026R  BROADWAY                                                                        70              84114410011001026L  CEDAR STREET                                                                    15              25127100011001026L  NASSAU STREET                                                                    2              16128870011001026L  PINE STREET                                                                                       101109011001026RN EQUITABLE BUILDING' }
```

## Running in Docker

This repo includes a `Dockerfile` which creates a ready-to-use linux environment, including the latest version of geosupport, and the required geosupport environment variables.

### To build the docker image

Build the image, giving it the tag `node_geosupport`.  This may take a while, as it needs to download a ~190MB zip file.

`docker build -t "node_geosupport" .`

The geosupport files will be located in `/geosupport` on the container's filesystem.

### To run the example in a docker container

Navigate to this repo's directory in your local filesystem, then use this `docker run` command to launch the container's bash terminal with this repo's code mounted as a volume.

`docker run -it -v $PWD:/node-geosupport -w /node-geosupport node_geosupport /bin/bash`

*Be sure to `npm install` from the container's terminal, not from your local machine.  This is because `node-ffi`, the package that acts as a bridge between node.js and the linux .so, installs itself differently in each environment.*

You should be able to see geosupport in action by running `node example/example.js` from the running container.

Use `ctrl-c` to exit the container.

## Things to build once this is a real package

- An express.js web api would be useful.
- A bulk geocoder that takes a CSV and spits out another CSV with new columns from the geosupport results

## About geosupport

Read the [Geosupport User Programming Guide](https://nycplanning.github.io/Geosupport-UPG/)

Geosupport is the city's official geocoder, maintained by the Department of City Planning.  It works by passing in two buffers into `libgeo.so`, known as "work area 1" and "work area 2".  Input variables must be added at specific location in each buffer to be parsed correctly.  `libgeo.so` outputs the same buffers, but adds the output data into specific areas.  Each work area must be assembled and parsed differently depending on which geosupport function is being called.  Refer to the user guide for details.
