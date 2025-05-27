FROM node:20

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --production --frozen-lockfile

COPY .env.* ./
COPY ./dist ./dist

COPY dist/main.js dist/server.js

EXPOSE 8080

CMD ["node", "dist/server.js"]