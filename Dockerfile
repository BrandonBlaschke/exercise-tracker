FROM node:latest
WORKDIR /usr/src

ENV PORT=3000
ENV MONGODB_URL=mongodb+srv://exercise-tracker:pzsD9lpD0zXQjsq%21itG%29@cluster0-kt6dd.mongodb.net/data?retryWrites=true&w=majority
ENV JWT_SECRET=jddfj&^$#@sNFj

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

