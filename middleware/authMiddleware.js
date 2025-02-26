const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {

    const token = req.cookies.token;
    if (!token) {
          return res.status(401).json({
            message: 'Not Authorized'
        })
    }
    jwt.verify(token, 'test', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const currentTime = Math.floor(Date.now() / 1000); 
        
        if (decoded.exp < currentTime) {
            return res.status(401).json({ message: 'Token expired' });
        }
        req.user = decoded; 
        next();
    })
}