FROM mhart/alpine-node:10

WORKDIR /

COPY package.json .
COPY . .

RUN apk update; apk upgrade; npm i --production;

ENV NODE_PATH /usr/src/app/dist

ENTRYPOINT []
CMD ["node", "server.ts"]
