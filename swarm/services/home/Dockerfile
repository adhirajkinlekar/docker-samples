FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

# docker build -t adhirajk/home-service:1.0.0 .

# docker push adhirajk/home-service:1.0.0