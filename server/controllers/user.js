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
    users.findOne(({
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
      .then((user) => {
        if (user) {
          return res.status(422).json({
            message: 'User already exists'
          });
        }
        return users
          .create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,
            password: bcrypt
              .hashSync(req.body.password, salt, null)
          })
          .then(detail => res.status(201).json(detail));
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
      .then((userDetail) => {
        if (!userDetail) {
          return res.status(404).json({ message: 'User is not registered' });
        }
        const token = jwt.sign({ userDetail }, secret);
        const { password } = userDetail;
        if (!bcrypt.compareSync(req.body.password, password)) {
          return res.status(404).send({
            message: 'Email and password mismatch'
          });
        }
        return res.status(200)
          .json({
            message: `You have successfully signed in ${userName}!`,
            token
          });
      });
  }
};
