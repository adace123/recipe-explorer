const jwt = require('jsonwebtoken');

module.exports = {
    isAdmin: (req, res, next) => {
        if(req.session.user.email === process.env.ADMIN_EMAIL && req.session.user.password === process.env.ADMIN_PASSWORD) {
            return next();
        }
        
        return res.status(403).json({error: "Not authorized."});
    },
    isLoggedIn: (req, res, next) => {
        if(req.body.token) {
            return next();
        }
        return res.status(403).json({error: "Must be logged in."});
    },
    isAuthorized: (req, res, next) => {
        if(!req.body.token) {
          return res.status(401).json({error: "Forbidden: Token not present"});
        }
        
        jwt.verify(req.body.token, 'keyboard cat', (err, decoded) => {
          return err ? res.status(401).json({err: "Forbidden: Unauthorized user"}) : next();
        });
    }
};