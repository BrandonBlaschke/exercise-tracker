FROM node:latest
WORKDIR /usr/src

ENV PORT=3000
ENV MONGODB_URL=mongodb://127.0.0.1:27017/exercise-tracker-test
ENV JWT_SECRET=jddfj&^$#@sNFj

COPY . ./
RUN npm install
RUN npm run build
# RUN ls build/src
CMD node ./build/src/index.js

