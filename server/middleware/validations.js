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
  req.checkBody(
    {
      userName: {
        notEmpty: true,
        isLength: {
          options: [{ min: 6 }],
          errorMessage: 'Please provide a username with atleast 5 characters.'
        }
      },
      email: {
        notEmpty: true,
        isEmail: {
          errorMessage: 'Provide a valid a Email Adrress'
        }
      },
      password: {
        notEmpty: true,
        isLength: {
          options: [{ min: 8 }],
          errorMessage: 'Provide a valid password with minimum of 8 characters'
        }
      }
    }
  );
  const errors = req.validationErrors();
  if (errors) {
    const allErrors = [];
    errors.forEach((error) => {
      allErrors.push({
        error: error.msg,
      });
    });
    return res.status(409)
      .json(allErrors);
  }
  next();
};

