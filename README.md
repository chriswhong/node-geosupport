# node-geosupport

Some hacking around with NYC Planning's geosupport library (a linux .so), and an attempt to build node bindings.  I'm developing on a Mac, so I am using Docker to create a virtual linux environment.  

`/src/node-geosupport` uses `ffi` to make use of `libgeo.so`.  It current has the following methods:

`function1`  Executes geosupport function 1, takes an object.  Returns an object with the geosupport lookup results.

```
{
  houseNumber: '86-54',
  streetName: 'WINCHESTER BOULEVARD',
  zipCode: '11427',
  boroCode: 4,
}
```

`functionB` Executes gesupport function BF, takes two arguments, `borocode` (number, 1-5), and `string`, the lookup string.  Returns the 10 next values for streetnames in the borough that match the string.


`sample.js` is a sample script that geocodes one address using `/src/node-geosupport.js`

## Prerequisites  

You will need to download geosupport for linux and add its contents to `/geosupport` in the root of this repo.  

## To Run

This command runs the default `node` docker image, and mounts the current directory in it as a volume (`-v`).  `-e` sets the environment variables that point `libgeo.so` to the correct geosupport files. `-rm` removes the container after it is done running.  `-w` sets the working directory to /app, where the volume mounts. `-c` runs `node sample.js`.

```
docker run -e LD_LIBRARY_PATH="./geosupport/lib/" -e GEOFILES="./geosupport/fls/" --rm -v "$PWD":/app -w /app node sh -c 'node sample.js'
```

*First Run* Before you can run the above command, you must install node dependencies.  However, you can't just run `npm install` locally, as it behaves differently on different OS.  This command will run `npm install` in the container's linux environment, but because you mounted this repo as a volume, the resulting `node_modules` directory will appear as local.  Run this only once (and again if you modify the dependencies)

```
docker run --rm -v "$PWD":/app -w /app node sh -c 'npm install'
```
