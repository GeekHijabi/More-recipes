import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../models';

dotenv.load();
const secret = process.env.secretKey;
const users = db.user;
const salt = bcrypt.genSaltSync(5);

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
            firstName: req.body.firstName.trim(),
            lastName: req.body.lastName.trim(),
            userName: req.body.userName.trim().toLowerCase().replace(/ +/g, ''),
            email: req.body.email,
            password: bcrypt
              .hashSync(req.body.password, salt, null)
          })
          .then(display => res.status(201).json({
            message: 'You have successfully created an account',
            display
          }))
          .catch(error => res.status(400).send(error));
      }).catch(error => res.status(500).send(error));
  },

  signin(req, res) {
    const { userName } = req.body;
    return users
      .findOne({
        where: {
          $or: [
            {
              userName: req.body.userName
                .trim().toLowerCase().replace(/ +/g, '')
            },
            { email: req.body.email }
          ]
        },
      })
      .then((user) => {
        if (!user) {
          return res.status(400).json({ statusCode: 400, message: 'User is not registered' });
        }
        const token = jwt.sign({ user }, secret);
        const { password } = user;
        if (!bcrypt.compareSync(req.body.password, password)) {
          return res.status(404).send({
            message: 'Username/Email invalid'
          });
        }
        return res.status(200).json({
          status: 'success',
          message: `You have successfully signed in ${userName}!`,
          data: { token }
        });
      });
  }
};
