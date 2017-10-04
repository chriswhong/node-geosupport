#!/bin/sh

mkdir -p ./temp
curl -sS http://www1.nyc.gov/assets/planning/download/zip/data-maps/open-data/gdelx_17c.zip > ./temp/geosupport.zip
mkdir -p ./geosupport
unzip ./temp/geosupport.zip -d ./temp
cp -R ./temp/version*/* ./geosupport
rm -rf ./temp
