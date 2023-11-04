const { createConnection } = require('typeorm');
const User = require('../entity/user');
const {hashPassword, verifyPassword} = require('./auth');
var userRepository;

// connection à la base de donnees
createConnection().then(db => {
    userRepository = db.getRepository(User);
});

// retourne tous les utilisateurs
exports.getUsers = async function (req, res) {
    const users = await userRepository.find();
    res.json(users);
};

// creation d un nouveau utilisateur
exports.postUsers = async function (req, res) {
    const user = await userRepository.create(req.body); // On creer un utilisateur
    user.role = "user"; // on lui passe user comme role
    user.password = await hashPassword(req.body.password); // On chiffre le mdp
    const result = await userRepository.save(user); // On enregistre le user dans la bdd
    return res.send(result);
};

// retourne l utilisateur rechercher
exports.getUser = async function (req, res) {
    const user = await userRepository.findOne(req.params.id);
    return res.send(user);
};

// modifie un utilisateur donnee
exports.putUser = async function (req, res) {
    const user = await userRepository.findOne(req.params.id);
    userRepository.merge(user, req.body);
    const result = await userRepository.save(user);
    return res.send(result);
};

// supprime un utilisateur
exports.deleteUser = async function (req, res) {
    const result = await userRepository.delete(req.params.id);
    return res.send(result);
};

// authentification d'un utilisateur
/*exports.authenticateUser = async function (req, res) {
    const user = await userRepository.findOne({ username: req.body.name });
    if (!user) {
        return res.status(401).send('Utilisateur non trouvé');
    }
    
    // compare le mot de passe fourni avec hash stocké
    if (await verifyPassword(req.body.password, user.password)) {
        return res.status(401).send('Mot de passe incorrect');
    }

    // si tout est correct, renvoie un statut de réussite et le rôle de l'utilisateur
    return res.status(200).json({ message: 'Utilisateur authentifié avec succès', role: user.role });
};*/

// authentification d'un utilisateur
exports.authenticateUser = async function (req, res) {
    const user = await userRepository.findOne({ username: req.body.name });
    if (!user) {
        return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }
    
    // compare le mot de passe fourni avec le hash stocké
    const passwordMatch = await verifyPassword(req.body.password, user.password);
    console.log('Password Match:', passwordMatch);

    if (!passwordMatch) {
        return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    // si tout est correct, renvoie un statut de réussite et le rôle de l'utilisateur
    return res.status(200).json({ message: 'Utilisateur authentifié avec succès', role: user.role });
};

