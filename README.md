# node-geosupport

Some hacking around with NYC Planning's geosupport library (linix .so), and an attempt to build node bindings.  This could be used to build a simple express.js api, or just to use locally for blazing fast geocoding of NYC address from node.js scripts.

This repo was created around tinkering with node bindings for geosupport inside a Docker container.

## Prerequisites  

You will need to download geosupport for linux and add its contents to `/geosupport` in the root of this repo.  

## To Build

`docker build -t "node_geosupport" .`

## To Run

`docker run -it -v $PWD:/src node_geosupport`
