FROM node:latest AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

ENV NODE_ENV production

COPY . .

RUN npm run build
