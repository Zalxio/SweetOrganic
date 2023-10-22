const express = require('express');
const cors = require('cors');
const { createConnection } = require('typeorm');
const Product = require('./entity/product');
const amqp = require('amqplib/callback_api');

createConnection().then(db => {
    const productRepository = db.getRepository(Product);

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

            app.get('/apip/products', async (req, res) => {
                const products = await productRepository.find();
                res.json(products);
            });

            app.post('/apip/products', async (req, res) => {
                const product = await productRepository.create(req.body);
                const result = await productRepository.save(product);
                channel.sendToQueue('products_created', Buffer.from(JSON.stringify(result)));
                return res.send(result);
            });

            app.get('/apip/products/:id', async (req, res) => {
                const product = await productRepository.findOne(req.params.id);
                return res.send(product);
            });

            app.put('/apip/products/:id', async (req, res) => {
                const product = await productRepository.findOne(req.params.id);
                productRepository.merge(product, req.body);
                const result = await productRepository.save(product);
                channel.sendToQueue('product_updated', Buffer.from(JSON.stringify(result)));
                return res.send(result);
            });

            app.delete('/apip/products/:id', async (req, res) => {
                const result = await productRepository.delete(req.params.id);
                channel.sendToQueue('product_deleted', Buffer.from(req.params.id));
                return res.send(result);
            });

            app.post('/apip/products/:id/age', async (req, res) => {
                const product = await productRepository.findOne(req.params.id);
                product.likes++;
                const result = await productRepository.save(product);
                return res.send(result);
            });

            console.log('Listening to port: 8000');
            app.listen(8000);
            process.on('beforeExit', () => {
                console.log('closing');
                connection.close();
            });
        });
    });
});
