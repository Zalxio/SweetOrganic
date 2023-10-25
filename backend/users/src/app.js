const express = require('express');
const cors = require('cors');
const userControllers = require('./controllers/user');
const amqp = require('amqplib/callback_api');

amqp.connect('amqp://127.0.0.1', (error0, connection) => {
    if (error0) {
        throw error0;
    }

    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }

        const app = express();

        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        });

        app.use(cors({
            origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200', 'http://localhost:5173']
        }));

        app.use(express.json());

        // creation de route
        var router = express.Router();

        // creation d un endpoint de route 
        router.route('/users')
            .post(userControllers.postUsers)
            .get(userControllers.getUsers);

        // creation d un endpoint de route 
        router.route('/users/:id')
            .get(userControllers.getUser)
            .put(userControllers.putUser)
            .delete(userControllers.deleteUser);

        // creation d un endpoint de route pour l'authentification
        router.route('/users/authenticate')
            .post(userControllers.authenticateUser);

        app.use('/apiu/', router);

        console.log('Listening to port: 8001');
        app.listen(8001);
        process.on('beforeExit', () => {
            console.log('closing');
            connection.close();
        });
    });
});

