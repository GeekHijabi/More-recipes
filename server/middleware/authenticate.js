import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.load();

const authenticate = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-token'];
  if (!token) {
    return res.status(401).send({
      message: 'Unauthorised User!'
    });
  }

  jwt.verify(token, process.env.secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).send({
        error: 'Token could not be authenticated'
      });
    }
    req.decoded = decoded;
    next();
  });
};


export default authenticate;

