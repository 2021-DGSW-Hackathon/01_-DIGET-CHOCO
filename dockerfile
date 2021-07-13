FROM node:12
WORKDIR /usr/src/dauth

COPY . .

RUN npm install
RUN npm run build

CMD ["npm", "run", "start:prod"]