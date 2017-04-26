FROM node

RUN mkdir /install
ADD package.json /install/package.json
RUN cd /install && npm install
ENV NODE_PATH=/install/node_modules
ENV LD_LIBRARY_PATH="/src/geosupport/lib/"
ENV GEOFILES="/src/geosupport/fls/"

WORKDIR /src

CMD ["node","script.js"]
