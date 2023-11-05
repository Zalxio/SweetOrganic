// const express = require('express');
// const cors = require('cors');
// const { createConnection } = require('typeorm');
// const Order = require('./entity/order');
// const amqp = require('amqplib/callback_api');

// createConnection().then(db => {
//     const orderRepository = db.getRepository(Order);

//     amqp.connect('amqp://rabbitmq:5672', (error0, connection) => {
//         if (error0) {
//             throw error0;
//         }

//         connection.createChannel((error1, channel) => {
//             if (error1) {
//                 throw error1;
//             }

//             const app = express();

//             app.use((req, res, next) => {
//                 res.header('Access-Control-Allow-Origin', '*');
//                 res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//                 res.header('Access-Control-Allow-Headers', 'Content-Type');
//                 next();
//             });

//             app.use(cors({
//                 origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200', 'http://localhost:5173']
//             }));

//             app.use(express.json());

//             /* recupere toute les commandes
//             app.get('/apio/orders', async (req, res) => {
//                 const orders = await orderRepository.find();
//                 res.json(orders);
//             });
//             */

//             // ajoute une commande
//             app.post('/apio/order', async (req, res) => {
//                 const order = await orderRepository.create(req.body);
//                 const result = await orderRepository.save(order);
//                 channel.sendToQueue('order_created', Buffer.from(JSON.stringify(result)));
//                 return res.send(result);
//             });

//             // recupere toute les commandes d'un utilisateur
//             app.get('/apio/orders/:id', async (req, res) => {
//                 const orders = await orderRepository.find({where: { idUser: req.params.id }});;
//                 res.json(orders);
//             });

//             // recupere une commande 
//             app.get('/apio/order/:id', async (req, res) => {
//                 const order = await orderRepository.findOne(req.params.id);
//                 return res.send(order);
//             });

//             /* modifie une commande donnée
//             app.put('/apio/order/:id', async (req, res) => {
//                 const order = await orderRepository.findOne(req.params.id);
//                 orderRepository.update(order, req.body);
//                 const result = await orderRepository.save(order);
//                 channel.sendToQueue('order_updated', Buffer.from(JSON.stringify(result)));
//                 return res.send(result);
//             });
//             */

//             /* supprime une commande
//             app.delete('/apio/order/:id', async (req, res) => {
//                 const result = await orderRepository.delete(req.params.id);
//                 channel.sendToQueue('order_deleted', Buffer.from(req.params.id));
//                 return res.send(result);
//             });
//             */

//             console.log('Listening to port: 8002');
//             app.listen(8002);
//             process.on('beforeExit', () => {
//                 console.log('closing');
//                 connection.close();
//             });
//         });
//     });
// });

const express = require('express');
const cors = require('cors');
const { createConnection } = require('typeorm');
const orderControllers = require('./controllers/order');
const amqp = require('amqplib/callback_api');

async function startServer() {
    const db = await createConnection();

    amqp.connect('amqp://rabbitmq:5672', async (error0, connection) => {
        if (error0) {
            throw error0;
        }

        try {
            connection.createChannel(async (error1, channel) => {
                if (error1) {
                    throw error1;
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
                            'http://localhost:5173',
                        ],
                    })
                );
    
                app.use(express.json());

                const router = express.Router();

                router.route('/orders')
                    .post(orderControllers.postOrders)
                    .get(orderControllers.getOrders);
                
                router.route('/orders/:id')
                    .get(orderControllers.getOrder)
                    .put(orderControllers.putOrder)
                    .delete(orderControllers.deleteOrder);

                app.use('/apio', router);

                console.log('Listening to port: 8002');
                app.listen(8002);
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
