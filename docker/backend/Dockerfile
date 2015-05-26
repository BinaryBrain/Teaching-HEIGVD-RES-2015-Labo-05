FROM node

RUN npm install express

COPY src /src/

WORKDIR /src/

# EXPOSE 3000

RUN npm install -g pm2@0.12.9

WORKDIR /src/

RUN npm install

CMD pm2 start -x /src/index.js --no-daemon
