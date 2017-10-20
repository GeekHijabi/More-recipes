import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import db from '../models/';
import recipes from '../controllers/recipes';

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


export const checkUserValidity = (req, res, next) => {
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
  if (!filter.test(req.body.email)) {
    return res.status(400)
      .json({ message: 'Invalid email address!' });
  }
  next();
};
