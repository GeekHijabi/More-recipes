import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../models';

const { User } = db;

dotenv.load();
const secret = process.env.SECRETKEY;
const salt = bcrypt.genSaltSync(5);

export default {
  signUp(req, res) {
    const {
      firstName,
      lastName,
      userName,
      email
    } = req.body;
    User.findOne({
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
      .then((userFound) => {
        if (userFound) {
          return res.status(409).json({
            error: 'User already exists'
          });
        }
        return User
          .create({
            firstName,
            lastName,
            userName,
            email,
            password: bcrypt
              .hashSync(req.body.password, salt, null)
          })
          .then((user) => {
            const userDetail = {
              userName: user.userName,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName
            };
            res.status(201).json({ userDetail });
          });
      }).catch(() => res.status(500).json('Internal server error'));
  },

  signIn(req, res) {
    const { identifier } = req.body;
    User
      .findOne({
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
      })
      .then((userDetail) => {
        if (!userDetail) {
          return res.status(404).json({
            error: 'User is not registered'
          });
        }
        const { password } = userDetail;
        if (!bcrypt.compareSync(req.body.password, password)) {
          return res.status(401).json({
            error: 'Email/Username and password mismatch'
          });
        }
        const token = jwt.sign(
          { id: userDetail.id }
          , secret
          , { expiresIn: '48h' }
        );
        return res.status(200)
          .json({
            message: 'You have successfully signed in!',
            token
          });
      });
  },

  getCurrentUser(req, res) {
    const { id } = req.decoded;
    User
      .findOne({
        where: {
          id
        },
        attributes: { exclude: ['password'] }
      })
      .then(currentUser =>
        // if (!currentUser) {
        //   return res.status(404).json({
        //     error: 'No current user'
        //   });
        // }
        res.status(200).json(currentUser))
      .catch(() => res.status(500).json({ error: 'Internal server error' }));
  },

  updateUserProfile(req, res) {
    const { id } = req.decoded;
    const {
      firstName,
      lastName,
      bio,
      summary,
      imageUrl
    } = req.body;
    User
      .findOne(({
        where: {
          id
        },
        attributes: { exclude: ['password'] }
      })).then((userProfile) => {
        if (!userProfile) {
          return res.status(404).json({
            error: 'User not found'
          });
        }
        if (id !== userProfile.id) {
          return res.status(403)
            .json({
              error: 'You are not authorized to perform this action'
            });
        }
        return userProfile
          .update({
            firstName: firstName || userProfile.firstName,
            lastName: lastName || userProfile.lastName,
            bio: bio || userProfile.bio,
            summary: summary || userProfile.summary,
            imageUrl: imageUrl || userProfile.imageUrl
          })
          .then(updatedProfile => res.status(200).json({
            updatedProfile
          }));
      }).catch(() => res.status(500).json({
        error: 'Internal server error'
      }));
  }
};
