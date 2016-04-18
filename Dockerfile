FROM node:4.4
MAINTAINER Daniel Stefanovic
EXPOSE 3000
WORKDIR /src

COPY package.json .
RUN npm install
COPY . .
RUN npm run build
RUN npm test

CMD ["node", "bin/index.js"]
