FROM node:14.3.0-alpine as build_image
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
RUN npm run build
EXPOSE 80

FROM node:14.3.0-alpine
WORKDIR /app
COPY --from=build_image /app/dist /app
EXPOSE 80
CMD ["node", "bin/www/server.js"]