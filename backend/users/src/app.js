// const express = require('express');
// const cors = require('cors');
// const userControllers = require('./controllers/user');
// const amqp = require('amqplib/callback_api');

// amqp.connect('amqp://rabbitmq:5672', (error0, connection) => {
//     if (error0) {
//         throw error0;
//     }

//     connection.createChannel((error1, channel) => {
//         if (error1) {
//             throw error1;
//         }

//         const app = express();

//         app.use((req, res, next) => {
//             res.header('Access-Control-Allow-Origin', '*');
//             res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//             res.header('Access-Control-Allow-Headers', 'Content-Type');
//             next();
//         });

//         app.use(cors({
//             origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200', 'http://localhost:5173']
//         }));

//         app.use(express.json());

//         // creation de route
//         var router = express.Router();

//         // creation d un endpoint de route 
//         router.route('/users')
//             .post(userControllers.postUsers)
//             .get(userControllers.getUsers);

//         // creation d un endpoint de route 
//         router.route('/users/:id')
//             .get(userControllers.getUser)
//             .put(userControllers.putUser)
//             .delete(userControllers.deleteUser);

//         // creation d un endpoint de route pour l'authentification
//         router.route('/users/authenticate')
//             .post(userControllers.authenticateUser);

//         app.use('/apiu/', router);

//         console.log('Listening to port: 8001');
//         app.listen(8001);
//         process.on('beforeExit', () => {
//             console.log('closing');
//             connection.close();
//         });
//     });
// });

const express = require('express');
const cors = require('cors');
const userControllers = require('./controllers/user');
const amqp = require('amqplib/callback_api');

async function startServer() {
    return new Promise((resolve, reject) => {
        amqp.connect('amqp://rabbitmq:5672', (error0, connection) => {
            if (error0) {
                reject(error0);
                return;
            }

            try {
                connection.createChannel((error1, channel) => {
                    if (error1) {
                        reject(error1);
                        return;
                    }
    
                    const app = express();
    
                    app.use((req, res, next) => {
                        res.header('Access-Control-Allow-Origin', '*');
                        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
                        res.header('Access-Control-Allow-Headers', 'Content-Type');
                        // Ajoutez ici les en-têtes "Permissions-Policy" nécessaires
                        res.header('Permissions-Policy', 'origin-trials=browsing-topics');
                        res.header('Permissions-Policy', 'origin-trials=attribution-reporting');
                        res.header('Permissions-Policy', 'origin-trials=run-ad-auction');
                        res.header('Permissions-Policy', 'origin-trials=join-ad-interest-group');
                        res.header('Permissions-Policy', 'origin-trials=idle-detection');
                        next();
                    });
    
                    app.use(
                        cors({
                            origin: [
                                'http://localhost:3000', 
                                'http://localhost:8080', 
                                'http://localhost:4200', 
                                'http://localhost:5173'
                            ],
                        })
                    );
    
                    app.use(express.json());
    
                    const router = express.Router();
    
                    router.route('/users')
                        .post(userControllers.postUsers)
                        .get(userControllers.getUsers);
    
                    router.route('/users/:id')
                        .get(userControllers.getUser)
                        .put(userControllers.putUser)
                        .delete(userControllers.deleteUser);
    
                    router.route('/users/authenticate')
                        .post(userControllers.authenticateUser);
    
                    app.use('/apiu/', router);
    
                    const server = app.listen(8001, () => {
                        console.log('Listening to port: 8001');
                        resolve({ app, server, connection });
                    });
    
                    process.on('beforeExit', () => {
                        console.log('closing');
                        connection.close();
                    });
                    channel.on('error', (error) => {
                        console.error('RabbitMQ channel error:', error);
                    });
                });
            } catch (error) {
                console.error('An error occurred:', error);
            }
        });
    });
}

startServer()
    .then((serverInfo) => {
        // Handle server started successfully
        // You can access the app, server, and connection from serverInfo
        console.log('Server started successfully: ', serverInfo);
    })
    .catch((error) => {
        // Handle any errors that occurred during server startup
        console.error(error);
    });

