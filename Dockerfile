FROM node:12-alpine as nodebuild
WORKDIR /var/www
ADD ./app /var/www
RUN npm i && npm run build

FROM nginx:alpine
COPY --from=nodebuild /var/www/dist/qoncept /usr/share/nginx/html

