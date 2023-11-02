
const { createConnection } = require('typeorm');
const User = require('../entity/user');
var bcrypt = require('bcryptjs');
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
    /*var user = new User();
    user.role = "user"
    user.username = req.body.username
    user.passeword = 
    user.name = req.body.name
    user.lastname = req.body.lastname
    user.age = req.body.age*/

    // On creer un utilisateur 
    const user = await userRepository.create(req.body);
    // on lui passe user comme role
    user.role = "user";
    // On crypte le mdp
    /*console.log("Ohh")
    const hash = bcrypt.hash(req.body.password, 10, function(err, hash) {
        console.log(hash);
        return hash;
    });
    console.log(hash);*/
    user.password = await hashPassword(req.body.password);
    
    const result = await userRepository.save(user);
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

// authentification d'un utilisateur simple sans hashage
exports.authenticateUser = async function (req, res) {
    const user = await userRepository.findOne({ name: req.body.name });
    if (!user) {
        return res.status(401).send('Utilisateur non trouvé');
    }

    // compare le mot de passe fourni avec le mot de passe stocké
    if (req.body.password !== user.password) {
        return res.status(401).send('Mot de passe incorrect');
    }

    // si tout est correct, renvoie un statut de réussite et le rôle de l'utilisateur
    return res.status(200).json({ message: 'Utilisateur authentifié avec succès', role: user.role });
};

// chiffrer le mdp
async function hashPassword (mdp) {
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(mdp, 10, function(err, hash) {
        if (err) reject(err)
            resolve(hash)
        });
    })

    return hashedPassword
}

// verifier le mdp 
async function verifyPassword(){
    
}

