FROM node:8-slim

WORKDIR /code

COPY . /code
RUN npm install
RUN mv /code/node_modules /node_modules

EXPOSE 8080

CMD ["npm", "start"]