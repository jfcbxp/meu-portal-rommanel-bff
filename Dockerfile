FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY prisma ./prisma
COPY src ./src
COPY .env.* ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./
COPY nest-cli.json ./
RUN yarn build

FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY .env.* ./
COPY --from=builder /app/dist/main.js ./dist/server.js

RUN yarn prisma generate --schema=./prisma/schema.prisma

EXPOSE 8080

CMD ["node", "dist/server.js"]