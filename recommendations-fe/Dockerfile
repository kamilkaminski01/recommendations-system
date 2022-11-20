FROM node:17.3-alpine

WORKDIR /frontend
COPY package.json .
RUN npm install --legacy-peer-deps

COPY . .

CMD ["npm", "start"]
