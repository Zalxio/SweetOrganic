FROM node

ENV DATABASE_HOST=payements
ENV DATABASE_TABLE=payement

WORKDIR /app/payement

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8003

CMD ["npm", "start"]