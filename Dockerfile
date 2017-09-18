FROM node:6.11.3-alpine

COPY ./ /app

WORKDIR /app

RUN npm install

CMD ["node", "index.js"]

EXPOSE 80