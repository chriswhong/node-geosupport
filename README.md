# node-geosupport

Some hacking around with NYC Planning's geosupport library (a linux .so), and an attempt to build node bindings.  I'm developing on a Mac, so I am using Docker to create a virtual linux environment.  

`/src/node-geosupport` uses `ffi` to make use of `libgeo.so`.  It exposes a single method, `geocode`, which currently calls function 1B of geosupport, and expects an array of objects with the following parameters:

```
{
  houseNumber: '86-54',
  streetName: 'WINCHESTER BOULEVARD',
  zipCode: '11427',
  boroCode: 4,
}
```

It outputs an array of results:

```
[ { firstBoroName: 'QUEENS   ',
    houseNumberDisplay: '86-54           ',
    houseNumberSort: '100086054AA',
    firstBoroStreetCode: '46789001010',
    firstStreetNameNormalized: 'WINCHESTER BOULEVARD            ',
    communityDistrict: '413',
    zipCode: '11427',
    electionDistrict: '011',
    atomicPolygon: '333',
    censusTract10: '1301  ',
    censusBlock10: '3009',
    ntaName: 'Bellerose                                                                  ',
    latitude: '40.732236',
    longitude: '-73.735847 ',
    bbl: '4079420027' } ]
```



`sample.js` is a sample script that geocodes one address using the `node-geosupport` package

## Prerequisites  

You will need to download geosupport for linux and add its contents to `/geosupport` in the root of this repo.  
## Dockerfile

Geosupport binaries are only available for Windows and Linux, so Docker is necessary to use geosupport with node.js on a Mac.

The `Dockerfile` in the root of this repo can be used to build a linux environment from the `node` base image, which also has geosupport binaries in a known location and the appropriate environment variables.

Once built, you can use this image to run a Mac-friendly development container.

### To Build

`docker build -t "node_geosupport" .`

## To Run

This runs the container and executes `sample.js`

`docker run -it -v $PWD:/src node_geosupport`

## Development

Start an ephemeral linux container with this repo mapped as a volume that can run node commands:

`docker run -it -v $PWD:/node-geosupport -w /node-geosupport node_geosupport /bin/bash`

`npm install`

`node sample.js`

## TODO

- Figure out what it would take to make this a real npm module.  (The geosupport files are large, and are updated a few times a year.  It may be possible to have the package download them from DCP as a postinstall npm command)

- Add more geosupport functions.  Function 1B is the most commonly used, and returns geographic data for an address or known place.

## Things to build once this is a real package

- An express.js web api would be useful.
- A bulk geocoder that takes a CSV and spits out another CSV with new columns from the geosupport results

## About geosupport

[Read the ]Geosupport User Programming Guide](https://www1.nyc.gov/assets/planning/download/pdf/data-maps/open-data/upg.pdf?r=17b)

Geosupport is the city's official geocoder, maintained by the department of city planning.  It works by passing in two buffers into `libgeo.so`, known as "work area 1" and "work area 2".  Input variables must be added at specific location in each buffer to be parsed correctly.  `libgeo.so` outputs the same buffers, but adds the output data into specific areas.  Each work area must be assembled and parsed differently depending on which geosupport function is being called.  Refer to the user guide for details.

The bindings in `node-geoclient` basically build the input buffer string from JSON, and parse the output buffer string into JSON.
