const Order = require('../entity/order');
const { createConnection } = require('typeorm');
var orderRepository;

createConnection().then(db => {
    orderRepository = db.getRepository(Order);
});

// retourne le liste de toutes les commandes
exports.getOrders = async function (req, res) {
    const orders = await orderRepository.find();
    res.json(orders);
};

// creation d une nouvelle commande
exports.postOrders = async function (req, res) {
    const order = await orderRepository.create(req.body);
    const result = await orderRepository.save(order);
    //channel.sendToQueue('orders_created', Buffer.from(JSON.stringify(result)));
    return res.send(result);
};

// retourne une commande
exports.getOrder = async function (req, res) {
    const order = await orderRepository.findOne(req.params.id);
    return res.send(order);
};

// modifie une commande
exports.putOrder = async function (req, res) {
    const order = await orderRepository.findOne(req.params.id);
    orderRepository.merge(order, req.body);
    const result = await orderRepository.save(order);
    //channel.sendToQueue('order_updated', Buffer.from(JSON.stringify(result)));
    return res.send(result);
};

// supprime une commande
exports.deleteOrder = async function (req, res) {
    const result = await orderRepository.delete(req.params.id);
    //channel.sendToQueue('order_deleted', Buffer.from(req.params.id));
    return res.send(result);
};

