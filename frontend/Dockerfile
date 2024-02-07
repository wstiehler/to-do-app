FROM node:20

WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

COPY package*.json /usr/src/app/

RUN npm install

COPY . /usr/src/app

ENV PORT 3000

EXPOSE $PORT

RUN npm run build

CMD [ "npm", "start" ]


