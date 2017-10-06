import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import db from '../models/';
import recipes from '../controllers/recipes';
import users from '../controllers/users';

dotenv.load();

export const confirmUserInput = (req, res, next) => {
  if (!req.body.userName) {
    return res.status(400).json({ message: 'No username supplied' });
  }
  if (!req.body.email) {
    return res.status(400).json({ message: 'Please supply valid email address' });
  }
  if (!req.body.password) {
    return res.status(400).json({ message: 'Password is required' });
  }
  next();
};


export const checkUserValidity = (req, res, next) =>
{
  const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (req.body.userName.length < 5) {
    return res.status(400).json({ errorMessage: 'Please provide a username with atleast 5 characters.' });
  }
  if (!req.body.email) {
    return res.status(400).json({ message: 'Please supply valid email address' });
  }
  if (req.body.password.length < 8) {
    return res.status(400).json({ message: 'password must be 8 characters or more' });
  }
  if (typeof (req.body.username) !== 'string') {
    return res.status(409).json({ message: 'Invalid Username' });
  }
  if (!filter.test(req.body.email)) { return res.status(400)
    .json({ message: "Invalid email address!" });}
  next();
};


export const validateUsers = (req, res, next) => {
  users
    .findOne({
      where: {
        username: req.body.username
      },
    })
    .then((user) => {
      if (user) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      users
        .findOne({
          where: {
            email: req.body.email
          },
        })
        .then((email) => {
          if (email) {
            return res.status(400).json({ message: 'Email already exists' });
          }
          next();
        });
    });
};

export const validateLoginUser = (req, res, next) => {
  if (!req.body.username) {
    return res.status(400).json({
      message: 'Please provide your username'
    });
  }
  if (!req.body.password) {
    return res.status(400).json({
      message: 'Please provide your password'
    });
  }
  users
    .findOne({
      where: {
        username: req.body.username
      },
    })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(400).json({ success: false, message: 'Invalid Credentials.' });
      }
      next();
    });
};

export const validateUserId = (req, res, next) => {
  users
    .findOne({
      where: {
        id: req.params.userId
      }
    })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: 'No user Id found'
        });
      }
      next();
    });
};
