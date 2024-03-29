FROM node:19.3.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ /app

RUN npm run build

ENTRYPOINT [ "npm", "run", "prod" ]
