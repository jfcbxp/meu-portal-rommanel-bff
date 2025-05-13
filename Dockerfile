FROM node:20

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN npm install --production

COPY ./dist ./dist

COPY dist/main.js dist/server.js

COPY .env.* ./

EXPOSE 8080

CMD ["node", "dist/server.js"]
