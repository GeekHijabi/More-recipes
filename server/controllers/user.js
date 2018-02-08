import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import path from 'path';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
// import handlebars from '../middleware/HandleBars';
import db from '../models';

const emailAddress = process.env.MAILER_EMAIL_ID;
const pass = process.env.MAILER_PASSWORD;

const { User } = db;


const smtpTransport = nodemailer.createTransport({
  service: process.env.MAILER_SERVICE_PROVIDER,
  auth: {
    user: emailAddress,
    pass
  }
});

const handlebarsOptions = {
  viewEngine: 'handlebars',
  viewPath: path.resolve('./server/templates/'),
  extName: '.html'
};

smtpTransport.use('compile', hbs(handlebarsOptions));

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
        attributes: { exclude: ['password', 'reset_password_token'] }
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
      .findOne({
        where: {
          id
        },
        attributes: { exclude: ['password', 'reset_password_token'] }
      }).then((userProfile) => {
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
  },

  forgotPassword(req, res) {
    const { id } = req.decoded;
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then((userFound) => {
      if (!userFound) {
        return res.status(404).json({
          error: 'user not found'
        });
      }
      if (id === userFound.id) {
        const token = jwt.sign({
          id: userFound.dataValues.id
        }, secret, { expiresIn: 86400 });
        userFound.update({
          reset_password_token: token,
        });
        const data = {
          to: userFound.email,
          from: emailAddress,
          template: 'forgot-password-email',
          subject: 'Password help has arrived!',
          context: {
            url: `http://${req.headers.host}/api/v1/${id}/reset-password?token=${token}`,
            name: userFound.userName.split(' ')[0]
          }
        };
        smtpTransport.sendMail(data, (err) => {
          if (!err) {
            return res.json({ message: 'Kindly check your email for further instructions' });
          }
          return res.json({ message: 'Not sending' });
        });
      }
      if (id !== userFound.id) {
        return res.status(403)
          .json({
            message: 'You are not authorized to perfom this action'
          });
      }
    });
  },

  resetPassword(req, res) {
    const { id } = req.decoded;
    const { token, newPassword } = req.body;
    User.findOne({
      where: {
        reset_password_token: token
      }
    }).then((userFound) => {
      if (!userFound) {
        return res.status(404).json({
          error: 'user not found'
        });
      }
      if (id === userFound.id) {
        const hashedPassword = bcrypt.hashSync(newPassword, salt, null);
        userFound.update({
          password: hashedPassword,
        });
        const data = {
          to: userFound.email,
          from: emailAddress,
          template: 'reset-password-email',
          subject: 'Password Reset Confirmation',
          context: {
            name: userFound.userName.split(' ')[0]
          }
        };

        smtpTransport.sendMail(data, (err) => {
          if (!err) {
            return res.json({ message: 'Password reset successfully' });
          }
          return (err);
        });
      } else {
        return res.status(422).send({
          message: 'Passwords do not match'
        });
      }
    });
  },

};
