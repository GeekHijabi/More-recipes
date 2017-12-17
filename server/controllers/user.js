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
          .then(Userdetail => res.status(201).json(Userdetail));
      }).catch(() => res.status(500).json('Internal server error'));
  },

  signin(req, res) {
    const { identifier } = req.body;
    User
      .findOne(({
        where: {
          $or: [
            {
              email: identifier
            },
            {
              userName: identifier
            }
          ]
        },
      }))
      .then((userDetail) => {
        if (!userDetail) {
          return res.status(404).json({
            error: 'User is not registered'
          });
        }
        const token = jwt.sign(
          { userDetail }
          , secret
          , { expiresIn: '24h' }
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
  },

  updateuserprofile(req, res) {
    const { userDetail } = req.decoded;
    User
      .findOne(({
        where: {
          $or: [
            {
              email: userDetail.email
            },
            {
              userName: userDetail.userName
            }
          ]
        },
      })).then((Userfound) => {
        if (Userfound) {
          return Userfound
            .update({
              firstName: req.body.firstName || Userfound.firstName,
              lastName: req.body.lastName || Userfound.lastName,
              bio: req.body.bio || Userfound.bio,
              summary: req.body.summary || Userfound.summary,
              imageUrl: req.body.imageUrl || Userfound.imageUrl
            }, {
              where: {
                id: req.params.userId,
              }
            })
            .then(updatedProfile => res.status(200).json({
              status: 'success',
              updatedProfile
            }));
        }
        if (!Userfound) {
          return res.status(404).send({ error: 'User not found' });
        }
        return res.status(401)
          .send({
            error: 'You cannot update a profile that does not belong to you'
          });
      }).catch(() => res.status(400).json({
        error: 'User not found'
      }));
  },

};
