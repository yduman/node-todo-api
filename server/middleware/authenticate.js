let {User} = require('../models/user');

// middleware for authentication
let authenticate = (req, res, next) => {
    let token = req.header('x-auth');
    
    User.findByToken(token).then((user) => {
        if (!user)
            return Promise.reject();

        req.user = user;
        req.token = token;
        next();
    }).catch((err) => {
        res.status(401).send(); // send 401 for unauthorized
    });
};

module.exports = {authenticate};