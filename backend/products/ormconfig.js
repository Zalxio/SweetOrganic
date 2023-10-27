module.exports = {
    "type": "mysql",
    "host": process.env.HOST_BBDD || "mysql",
    "port": process.env.PORT_BBDD || 3306,
    "username": process.env.USER_BBDD || "root",
    "password": process.env.PASSWORD_BBDD || "root",
    "database": process.env.DATABASE_BBDD || "yt_node_admin",
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