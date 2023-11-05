const Paiement = require('../entity/paiement');
const { createConnection } = require('typeorm');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
var paiementRepository;

createConnection().then(db => {
    paiementRepository = db.getRepository(Paiement);
});

// retourne le liste de tous les paiements
exports.getPaiements = async function (req, res) {
    const paiements = await paiementRepository.find();
    res.json(paiements);
};

// creation d un nouveau paiement
/*exports.postPaiements = async function (req, res) {
    const paiement = await paiementRepository.create(req.body);
    const result = await paiementRepository.save(paiement);
    //channel.sendToQueue('paiements_created', Buffer.from(JSON.stringify(result)));
    return res.send(result);
};*/

exports.postPaiements = async function (req, res) {
    try {
        const { amount, currency, description, customerId } = req.body;

        // Créez un paiement avec Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: currency,
            description: description,
            customer: customerId, // ID du client Stripe
        });

        // Vous pouvez également enregistrer les détails du paiement dans votre base de données
        const paiement = await paiementRepository.create({
            amount: amount,
            currency: currency,
            description: description,
            customerId: customerId,
        });
        const result = await paiementRepository.save(paiement);

        // Envoyez une réponse avec le paiement Stripe et l'enregistrement local
        return res.json({ stripePayment: paymentIntent, localPayment: result });
    } catch (error) {
        return res.status(500).json({ error: 'Une erreur est survenue lors de la création du paiement.' });
    }
};

// retourne un paiement
exports.getPaiement = async function (req, res) {
    const paiement = await paiementRepository.findOne(req.params.id);
    return res.send(paiement);
};

// modifie un paiement
exports.putPaiement = async function (req, res) {
    const paiement = await paiementRepository.findOne(req.params.id);
    paiementRepository.merge(paiement, req.body);
    const result = await paiementRepository.save(paiement);
    //channel.sendToQueue('paiement_updated', Buffer.from(JSON.stringify(result)));
    return res.send(result);
};

// supprime un paiement
exports.deletePaiement = async function (req, res) {
    const result = await paiementRepository.delete(req.params.id);
    //channel.sendToQueue('paiement_deleted', Buffer.from(req.params.id));
    return res.send(result);
};
