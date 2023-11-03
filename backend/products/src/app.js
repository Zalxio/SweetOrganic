/*const express = require('express');
const cors = require('cors');
const productControllers = require('./controllers/product');
const amqp = require('amqplib/callback_api');
const OAuth2Server = require('express-oauth-server');
const bodyParser = require('body-parser');

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

          // Enable CORS
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        });
        
        app.use(cors({
            origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200', 'http://localhost:5173'],
        }));

        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

          // Define your OAuth2 model
          const oauth2Model = require('./oauth2/model');

          // Configure OAuth2
          const oauth2 = new OAuth2Server({
            model: oauth2Model,
            useErrorHandler: true,
          });

          app.oauth = oauth2;

          const router = express.Router();

          router.route('/products')
            .post(productControllers.postProducts)
            .get(app.oauth.authenticate(), productControllers.getProducts);

          router.route('/products/:id')
            .get(app.oauth.authenticate(), productControllers.getProduct)
            .put(app.oauth.authenticate(), productControllers.putProduct)
            .delete(app.oauth.authenticate(), productControllers.deleteProduct);

          app.use('/apip', router);

          // Start the server
          const server = app.listen(8000, () => {
            console.log('Listening on port 8000');
            resolve({ app, server, connection });
          });

          // Handle any errors
          process.on('beforeExit', () => {
            console.log('Closing');
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
  })
  .catch((error) => {
    // Handle any errors that occurred during server startup
    console.error(error);
  });*/



// const express = require('express');
// const cors = require('cors');
// const productControllers = require('./controllers/product')
// const amqp = require('amqplib/callback_api');
// //const multer = require('multer');
// //const upload = multer({ dest: 'uploads/' }); // Répertoire de destination pour stocker les fichiers téléchargés

// amqp.connect('amqp://rabbitmq:5672', (error0, connection) => {
//     if (error0) {
//         throw error0;
//     }

//     connection.createChannel((error1, channel) => {
//         if (error1) {
//             throw error1;
//         }

//         const app = express();

//         // Créez un middleware Multer pour gérer les données multipart/form-data
//         //const storage = multer.memoryStorage(); // Stockage en mémoire pour les fichiers
//         //const upload = multer({ storage });

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

//         //app.use(upload.single('image')); // Utilisez multer pour traiter le champ 'image' du formulaire

//         //app.use('/uploads', express.static('uploads')); // Rendre le répertoire 'uploads' accessible depuis le Web

//         var router = express.Router();

//         // creation d un endpoint de route 
//         router.route('/products')
//             .post(productControllers.postProducts)
//             .get(productControllers.getProducts);

//         // creation d un endpoint de route 
//         router.route('/products/:id')
//             .get(productControllers.getProduct)
//             .put(productControllers.putProduct)
//             .delete(productControllers.deleteProduct);
        
//         app.use('/apip', router);
        
//         console.log('Listening to port: 8000');
//         app.listen(8000);
//         process.on('beforeExit', () => {
//             console.log('closing');
//             connection.close();
//         });
//     });
// });

//////////////////////////////////////////////////////////////////////////////////

const express = require('express');
const cors = require('cors');
const productControllers = require('./controllers/product');
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
    
                    router.route('/products')
                        .post(productControllers.postProducts)
                        .get(productControllers.getProducts);
    
                    router.route('/products/:id')
                        .get(productControllers.getProduct)
                        .put(productControllers.putProduct)
                        .delete(productControllers.deleteProduct);

                    app.use('/apip', router);
   
                    const server = app.listen(8000, () => {
                        console.log('Listening to port: 8000');
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
    })
    .catch((error) => {
        // Handle any errors that occurred during server startup
        console.error(error);
    });

