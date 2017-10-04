import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../models';

dotenv.load();
const secret = process.env.SUPER_KEY;
const users = db.user;

export default {
  signup(req, res) {
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
  },

  signin(req, res) {
    return users
      .findOne({
        where: { username: req.body.username }
      })
      .then((user) => {
        const currentUser = {
          userId: user.id,
          username: user.username,
          email: user.email,
        };
        const token = jwt.sign({ currentUser }, secret);
        res.status(200).json({
          status: 'success',
          message: 'You have successfully signed in!',
          data: { token, userId: user.id }
        });
      });
  }
};
