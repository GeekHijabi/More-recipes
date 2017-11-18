import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../models';

const { User } = db;

dotenv.load();
const secret = process.env.secretKey;
const salt = bcrypt.genSaltSync(5);

export default {
  signup(req, res) {
    User.findOne(({
      where: {
        $or: [
          {
            userName: req.body.userName
              .trim().toLowerCase().replace(/ +/g, '')
          },
          { email: req.body.email }
        ]
      },
    }))
      .then((userFound) => {
        if (userFound) {
          return res.status(422).json({
            error: 'User already exists'
          });
        }
        return User
          .create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,
            password: bcrypt
              .hashSync(req.body.password, salt, null)
          })
          .then(detail => res.status(201).json(detail));
      }).catch(() => res.status(500).json('Internal server error'));
  },

  signin(req, res) {
    const { userName, email } = req.body;
    User
      .findOne(({
        where: {
          $or: [
            {
              email
            },
            {
              userName
            }
          ]
        },
      }))
      .then((userDetail) => {
        if (!userDetail) {
          return res.status(404).json({
            message: 'User is not registered'
          });
        }
        const token = jwt.sign(
          { userDetail }
          , secret
          , { expiresIn: 60 * 60 * 24 }
        );
        const { password } = userDetail;
        if (!bcrypt.compareSync(req.body.password, password)) {
          return res.status(409).send({
            error: 'Email and password mismatch'
          });
        }
        return res.status(200)
          .json({
            message: 'You have successfully signed in!',
            token
          });
      });
  }
};
