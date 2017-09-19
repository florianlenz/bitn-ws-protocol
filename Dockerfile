FROM node:6.11.3-alpine

COPY ./ /app

WORKDIR /app

RUN npm install
RUN npm run build

CMD ["node", "index.js"]

EXPOSE 80