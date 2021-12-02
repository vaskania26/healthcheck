FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci 

COPY ./app.js .

ENV PORT=3000

EXPOSE 3000

CMD ["node", "./app.js"]



