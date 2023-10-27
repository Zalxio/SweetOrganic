FROM node

ENV DATABASE_HOST=yt_node_admin

WORKDIR /app/products

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "start"]