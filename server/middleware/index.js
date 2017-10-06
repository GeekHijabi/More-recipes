import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.load();

export const authenticate = {
  Verify: (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-token'];
    if (!token) {
      return res.status(403).send({
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
  }
};

export const confirmLogin = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['access-token'];
  if (token) {
    jwt.verify(token, key, (err, decoded) => {
      if (err) {
        res.status(401).json({ status: 'unsuccessful', message: 'Token authentication failed' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).json({
      status: 'fail',
      message: 'No token provided.'
    });
  }
  next();
};
