FROM node

ENV DATABASE_HOST=products
ENV DATABASE_TABLE=product

WORKDIR /app/products

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "start"]