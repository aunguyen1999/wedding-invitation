FROM node:lts-alpine

RUN apk add --no-cache shadow

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4321

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4321"]