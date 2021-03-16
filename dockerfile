FROM node:12-alpine AS base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

from base as build

COPY . .

RUN npm run build

FROM base as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist

CMD ["node", "dist/main"]