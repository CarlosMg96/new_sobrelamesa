const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

      if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length); 
    }

    if (!token) return res.status(401).send({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(500).send({ message: 'Failed to authenticate token' });
        req.userId = decoded.id;
        req.userRole = decoded.role;
        req.userStatus = decoded.status;
        req.userFullName = decoded.fullname;
        next();
    });
};

module.exports = verifyToken;
