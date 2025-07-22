# Usa una imagen base de Node.js
FROM node:18-alpine AS base

# Establece el directorio de trabajo
WORKDIR /app

COPY package.json .

COPY yarn.lock .

COPY . .

RUN yarn install

ENV NODE_ENV production

RUN yarn build

EXPOSE 1337

CMD ["yarn", "start"]