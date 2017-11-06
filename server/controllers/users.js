import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../models';

dotenv.load();
const secret = process.env.secretKey;
const users = db.user;

export default {
  signup(req, res) {
    users.findOne({
      where: { email: req.body.email }
    })
      .then((user) => {
        if (user) {
          return res.status(400).json({
            message: 'User already exists'
          });
        }
        return users
          .create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
          })
          .then(display => res.status(201).json({
            status: 'success',
            message: 'You have successfully created an account',
            display
          }))
          .catch(error => res.status(400).send(error));
      }).catch(error => res.status(500).send(error));
  },

  signin(req, res) {
    return users
      .findOne({
        where: { userName: req.body.userName }
      })
      .then((user) => {
        const { password } = req.body;
        if (user) {
          if (bcrypt.compareSync(password, user.password)) {
            const currentUser = {
              userId: user.id,
              password: user.password,
              userName: user.userName,
              email: user.email,
            };
            const token = jwt.sign({ currentUser }, secret, { expiresIn: '24h' });
            res.status(200).json({
              status: 'success',
              message: 'You have successfully signed in!',
              data: { token, userId: user.id }
            });
          } else {
            return res.status(404).send({
              message: 'username/password not correct'
            });
          }
        } else {
          return res.status(404).send({
            message: 'User not found'
          });
        }
      });
  }
};
