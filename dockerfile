FROM node:22

WORKDIR /app

COPY package*.json ./
COPY .env ./

RUN npm install

COPY . .

EXPOSE 3333

CMD [ "node", "src/server.js" ]