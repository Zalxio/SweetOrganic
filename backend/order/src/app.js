const express = require('express');
const cors = require('cors');
const { createConnection } = require('typeorm');
const Order = require('./entity/order');
const amqp = require('amqplib/callback_api');

createConnection().then(db => {
    const orderRepository = db.getRepository(Order);

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

            /* recupere toute les commandes
            app.get('/apio/orders', async (req, res) => {
                const orders = await orderRepository.find();
                res.json(orders);
            });
            */

            // ajoute une commande
            app.post('/apio/order', async (req, res) => {
                const order = await orderRepository.create(req.body);
                const result = await orderRepository.save(order);
                channel.sendToQueue('order_created', Buffer.from(JSON.stringify(result)));
                return res.send(result);
            });

            // recupere toute les commandes d'un utilisateur
            app.get('/apio/orders/:id', async (req, res) => {
                const orders = await orderRepository.find({where: { idUser: req.params.id }});;
                res.json(orders);
            });

            // recupere une commande 
            app.get('/apio/order/:id', async (req, res) => {
                const order = await orderRepository.findOne(req.params.id);
                return res.send(order);
            });

            /* modifie une commande donnée
            app.put('/apio/order/:id', async (req, res) => {
                const order = await orderRepository.findOne(req.params.id);
                orderRepository.update(order, req.body);
                const result = await orderRepository.save(order);
                channel.sendToQueue('order_updated', Buffer.from(JSON.stringify(result)));
                return res.send(result);
            });
            */

            /* supprime une commande
            app.delete('/apio/order/:id', async (req, res) => {
                const result = await orderRepository.delete(req.params.id);
                channel.sendToQueue('order_deleted', Buffer.from(req.params.id));
                return res.send(result);
            });
            */

            console.log('Listening to port: 8002');
            app.listen(8002);
            process.on('beforeExit', () => {
                console.log('closing');
                connection.close();
            });
        });
    });
});
