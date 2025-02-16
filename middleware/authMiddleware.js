const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
    console.log('auth middleware');

    const authHeader = req.headers['authorization']
    console.log(authHeader)
    //const token = req.cookies.token
    //console.log(token + "123")
    

    // if (!authHeader) {
    //     return res.status(401).json({
    //         message : 'Not Authorized'
    //     })
    // }

    const token = authHeader.split(' ')[1];

    if (!token) {
          return res.status(401).json({
            message: 'Not Authorized'
        })
    }

    jwt.verify(token, 'moijopu', (err, decoded) => {
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