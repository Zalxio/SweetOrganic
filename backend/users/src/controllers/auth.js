const bcrypt = require('bcryptjs');

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

exports.hashPassword = hashPassword;

// verifier le mdp
async function verifyPassword (password, hash) {
    return await bcrypt.compare(password, hash)
    .then((res) => {
        console.log(res);
        return res;
    })
}

exports.verifyPassword = verifyPassword;