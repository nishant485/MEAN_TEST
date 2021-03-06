var {User} = require('../models/user.model');
const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token)
      return res.status(403).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, 'secret', function(err, decoded) {
      if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      // if everything good, save to request for use in other routes
      req.userId = decoded.id;
      next();
    });
  }
  module.exports = verifyToken;
/* var authenticate = (req, res, next) => {
    var token = req.header('x-auth');
    User.findByToken(token).then((user)=>{
        if(!user){
            return Promise.reject();
        }
        req.user = user;
        req.token = token;
        next();
    }).catch((err) => {
        return res.status(401).json({
            failed: "Failed Authentication"
        });
    });
}*/

// module.exports = {authenticate};
module.exports = verifyToken;
