const express = require('express');
const cors = require('cors');
const { createConnection } = require('typeorm');
const User = require('./entity/user');
const amqp = require('amqplib/callback_api');

createConnection().then(db => {
    const userRepository = db.getRepository(User);

    amqp.connect('amqp://localhost', (error0, connection) => {
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

            app.get('/apiu/users', async (req, res) => {
                const users = await userRepository.find();
                res.json(users);
            });

            app.post('/apiu/users', async (req, res) => {
                const user = await userRepository.create(req.body);
                const result = await userRepository.save(user);
                channel.sendToQueue('user_created', Buffer.from(JSON.stringify(result)));
                return res.send(result);
            });

            app.get('/apiu/users/:id', async (req, res) => {
                const user = await userRepository.findOne(req.params.id);
                return res.send(user);
            });

            app.put('/apiu/users/:id', async (req, res) => {
                const user = await userRepository.findOne(req.params.id);
                userRepository.merge(user, req.body);
                const result = await userRepository.save(user);
                channel.sendToQueue('user_updated', Buffer.from(JSON.stringify(result)));
                return res.send(result);
            });

            app.delete('/apiu/users/:id', async (req, res) => {
                const result = await userRepository.delete(req.params.id);
                channel.sendToQueue('user_deleted', Buffer.from(req.params.id));
                return res.send(result);
            });

            app.post('/apiu/users/:id/age', async (req, res) => {
                const user = await userRepository.findOne(req.params.id);
                // product.age++;
                const result = await userRepository.save(user);
                return res.send(result);
            });

            console.log('Listening to port: 8001');
            app.listen(8001);
            process.on('beforeExit', () => {
                console.log('closing');
                connection.close();
            });
        });
    });
});
