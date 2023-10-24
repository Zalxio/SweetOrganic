const express = require('express');
const cors = require('cors');
const productControllers = require('./controllers/product')
const amqp = require('amqplib/callback_api');
//const multer = require('multer');
//const upload = multer({ dest: 'uploads/' }); // Répertoire de destination pour stocker les fichiers téléchargés

amqp.connect('amqp://127.0.0.1', (error0, connection) => {
    if (error0) {
        throw error0;
    }

    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }

        const app = express();

        // Créez un middleware Multer pour gérer les données multipart/form-data
        //const storage = multer.memoryStorage(); // Stockage en mémoire pour les fichiers
        //const upload = multer({ storage });

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

        //app.use(upload.single('image')); // Utilisez multer pour traiter le champ 'image' du formulaire

        //app.use('/uploads', express.static('uploads')); // Rendre le répertoire 'uploads' accessible depuis le Web

        var router = express.Router();

        // creation d un endpoint de route 
        router.route('/products')
            .post(productControllers.postProducts)
            .get(productControllers.getProducts);

        // creation d un endpoint de route 
        router.route('/products/:id')
            .get(productControllers.getProduct)
            .put(productControllers.putProduct)
            .delete(productControllers.deleteProduct);
        
        app.use('/apip', router);
        
        console.log('Listening to port: 8000');
        app.listen(8000);
        process.on('beforeExit', () => {
            console.log('closing');
            connection.close();
        });
    });
});

