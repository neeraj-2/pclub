FROM node:14.15.1 as build

WORKDIR /client

ADD client/package*.json ./

RUN apt-get update && apt-get install build-essential
RUN npm install

COPY client .

ARG OAUTH_CLIENT_ID=''
ENV REACT_APP_CLIENT_ID ${OAUTH_CLIENT_ID}

RUN npm run build

FROM node:14.15.1-alpine

WORKDIR /server

ADD server/package*.json ./

RUN npm install --production

COPY server .
COPY --from=build /client/build build

EXPOSE 4040

CMD [ "npm", "start" ]
