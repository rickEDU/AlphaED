# syntax=docker/dockerfile:1

FROM node:latest
WORKDIR /ex3
COPY package*.json . 
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]