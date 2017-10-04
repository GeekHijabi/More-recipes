import jwt from 'jsonwebtoken';

const authenticate = {
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

export default authenticate;
