FROM node

WORKDIR /src

COPY package.json .
RUN npm install
COPY . .
RUN npm run build
RUN npm test
EXPOSE 3000
CMD ["node", "bin/index.js"]
