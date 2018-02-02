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
            userName,
            email,
            password: bcrypt
              .hashSync(req.body.password, salt, null)
          })
          .then((user) => {
            const userDetail = {
              userName: user.userName,
              email: user.email
            };
            res.status(201).json({ userDetail });
          });
      }).catch(error => res.status(500).json({ error: error.message }));
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
          return res.status(401).json({
            error: 'Email/Username and password mismatch'
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
      }).catch(error => res.status(500).json({
        error: error.message
      }));
  },

  getCurrentUser(req, res) {
    const { id } = req.decoded;
    const { userId } = req.params;
    User
      .findOne({
        where: {
          id: userId
        },
        attributes: { exclude: ['password'] }
      })
      .then((currentUser) => {
        if (!currentUser) {
          return res.status(404).json({
            error: 'No current user'
          });
        }
        if (currentUser.id === id) {
          return res.status(200).json(currentUser);
        }
        if (currentUser.id !== id) {
          return res.status(403).json({
            error: 'You cannot perform this action'
          });
        }
      })
      .catch(() => res.status(500).json({
        error: 'Internal server error'
      }));
  },

  updateUserProfile(req, res) {
    const { id } = req.decoded;
    const {
      userName,
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
            userName: userName || userProfile.userName,
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
