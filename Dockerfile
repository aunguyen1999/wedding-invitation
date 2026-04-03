FROM node:lts-alpine

RUN apk add --no-cache shadow

WORKDIR /app
COPY package*.json ./

RUN npm install

EXPOSE 4321

CMD ["npm", "run", "dev", "--", "--host"]