// products/authMiddleware.js

const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Authentification requise' });

    jwt.verify(token, 'your-secret-key', (err, user) => {
        if (err) return res.status(403).json({ message: 'Jetons JWT non valides' });
        req.user = user; // Vous pouvez accéder aux données de l'utilisateur authentifié dans vos contrôleurs
        next();
    });
}

module.exports = authenticateToken;
