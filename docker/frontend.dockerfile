FROM node:10-alpine as frontendFiles

WORKDIR /build

COPY ./package.json ./package-lock.json ./
RUN npm ci

COPY ./angular.json ./tsconfig.json ./tsconfig.app.json ./tsconfig.spec.json ./
COPY ./src ./src

RUN npm run ng build -- --prod

RUN find dist/homeadventure -type f -exec gzip -k9 {} +

FROM nginx:alpine as webserver

COPY ./build/nginx/default.conf /etc/nginx/conf.d/
COPY --from=frontendFiles /build/dist/homeadventure/ /code/
