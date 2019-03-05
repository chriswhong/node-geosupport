# sets up a container with the geosupport v19A linux binary in a known location and
# and the appropriate environment variables set
FROM node

# update and install
RUN apt-get update -y -q && \
  apt-get install curl -y -q && \
  apt-get install unzip -y -q

# make and use geosupport directory
RUN mkdir /geosupport
WORKDIR /geosupport
RUN mkdir tmp

# get geosupport
RUN curl https://www1.nyc.gov/assets/planning/download/zip/data-maps/open-data/linux_geo19a_191.zip -o tmp/linux_geo19a_191.zip

# unzip files and move everything up one level
RUN unzip tmp/linux_geo19a_191.zip -d .
RUN mv version-19a_19.1/* .

# set required geosupport environment variables
ENV LD_LIBRARY_PATH="/geosupport/lib/"
ENV GEOFILES="/geosupport/fls/"
