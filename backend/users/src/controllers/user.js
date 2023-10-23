
const { createConnection } = require('typeorm');
const User = require('../entity/user');
var bcrypt = require('bcrypt-nodejs');
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

    const user = await userRepository.create(req.body);
    //encryptMDP(user, cb);
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

/*
exports.post = async function (req, res) {
    const user = await userRepository.findOne(req.params.id);
    const result = await userRepository.save(user);
    return res.send(result);
};

// A executer avant chaque appel à user.save() pour chiffrer le mdp
function encryptMDP(user, callback) {
    // On sort si le mdp n a pas changer
    //if (!user.isModified('password')) return callback();
  
    // Si nouveau mdp on le chiffre
    bcrypt.genSalt(5, function(err, salt) {
        if (err) return callback(err);
  
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return callback(err);
            user.password = hash;
            //callback();
        });
    });
    return user;
}
function cb(txt){
    if (txt == null){
        txt = "good"
    } 
    console.log(txt);
}*/