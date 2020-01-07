FROM node:12.13-alpine3.9

ARG WORKDIR=/usr/src/app

WORKDIR ${WORKDIR}

COPY package.json ./
COPY ./dist ./

RUN apk --no-cache add --virtual builds-deps build-base python && npm rebuild bcrypt --build-from-source
RUN npm i --production

CMD ["node", "./server.js"]