FROM node:lts-bullseye

WORKDIR /usr/src

COPY ["package.json", "package-lock.json", "/usr/src/"]
RUN npm install

COPY . .

CMD ["npm","start"]