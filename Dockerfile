FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

ENV NODE_ENV=production

RUN npm ci 

COPY ./app.js .

ENV PORT=3000

EXPOSE 3000

CMD ["node", "./app.js"]



