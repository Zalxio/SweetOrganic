module.exports = {
    "type": "mysql",
    "host": process.env.HOST_BBDD || "127.0.0.1",
    "port": process.env.PORT_BBDD || 3306,
    "username": process.env.USER_BBDD || "sweetorganic",
    "password": process.env.PASSWORD_BBDD || "sweetorganic",
    "database": process.env.DATABASE_BBDD || "orders",
    "synchronize": true,
    "logging": false,
    "entities": [
       "src/entity/*.js"
    ],
    "migrations": [
       "src/migration/*.js"
    ],
    "subscribers": [
       "src/subscriber/*.js"
    ],
    "cli": {
       "entitiesDir": "common/entity",
       "migrationsDir": "common/migration",
       "subscribersDir": "common/subscriber"
    }
 }