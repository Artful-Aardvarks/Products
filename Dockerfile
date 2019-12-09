FROM node:8.0
RUN mkdir /Products
ADD . /Products
WORKDIR /Products
RUN npm install

EXPOSE 3000
CMD ["node", "server/index.js"]