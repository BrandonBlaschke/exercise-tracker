FROM node:latest
WORKDIR /usr/src

ENV PORT=3000
ENV MONGODB_URL=
ENV JWT_SECRET=

COPY ./server ./server
COPY ./client ./client

WORKDIR /usr/src/client
RUN npm install
RUN npm run build

WORKDIR /usr/src/server
RUN npm install
RUN npm run build

EXPOSE 3000
CMD node ./build/index.js

