FROM node

ENV DATABASE_HOST=orders
ENV DATABASE_TABLE=order_product

WORKDIR /app/orders

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8002

CMD ["npm", "start"]