const Product = require('../entity/product');
const { createConnection } = require('typeorm');
var productRepository;

createConnection().then(db => {
     productRepository = db.getRepository(Product);
});

// retourne le liste de tous les produits
exports.getProducts = async function (req, res) {
    const products = await productRepository.find();
    res.json(products);
};

// creation d un nouveau produit
exports.postProducts = async function (req, res) {
    const product = await productRepository.create(req.body);
    const result = await productRepository.save(product);
    //channel.sendToQueue('products_created', Buffer.from(JSON.stringify(result)));
    return res.send(result);
};

// retourne un produit
exports.getProduct = async function (req, res) {
    const product = await productRepository.findOne(req.params.id);
    return res.send(product);
};

// modifie un produit
exports.putProduct = async function (req, res) {
    const product = await productRepository.findOne(req.params.id);
    productRepository.merge(product, req.body);
    const result = await productRepository.save(product);
    //channel.sendToQueue('product_updated', Buffer.from(JSON.stringify(result)));
    return res.send(result);
};

// supprime un produit
exports.deleteProduct = async function (req, res) {
    const result = await productRepository.delete(req.params.id);
    //channel.sendToQueue('product_deleted', Buffer.from(req.params.id));
    return res.send(result);
};

/*
exports.postProduct('/apip/products/:id/age', async (req, res) => {
    const product = await productRepository.findOne(req.params.id);
    product.likes++;
    const result = await productRepository.save(product);
    return res.send(result);
});*/