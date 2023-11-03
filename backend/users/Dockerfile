FROM node

ENV DATABASE_HOST=users
ENV DATABASE_TABLE=user

WORKDIR /app/users

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8001

CMD ["npm", "start"]