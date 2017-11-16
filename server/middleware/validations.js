import dotenv from 'dotenv';

dotenv.load();

export const signInField = (req, res, next) => {
  const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!req.body.userName || req.body.userName.trim() === '') {
    return res.status(400).json({
      message: 'Supply a valid username / email address'
    });
  }
  if (req.body.email && !filter.test(req.body.email)) {
    return res.status(400).json({
      message: 'Please supply valid username / email address'
    });
  }
  if (!req.body.password || req.body.password.trim() === '') {
    return res.status(400).json({ message: 'Password is required' });
  }
  next();
};


export const signUpField = (req, res, next) => {
  const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!req.body.userName ||
    req.body.userName.length < 2 ||
    req.body.userName.toLowerCase().replace(/ +/g, '').trim() === '') {
    return res.status(411).json({
      errorMessage: 'Please provide a valid username with atleast 5 characters.'
    });
  }
  if (!req.body.email || !filter.test(req.body.email)) {
    return res.status(422).json({
      message: 'Please supply valid email address'
    });
  }
  if (!req.body.password || req.body.password.trim() === '') {
    return res.status(406)
      .json({
        message: 'password cannot be empty'
      });
  }
  if (!req.body.firstName || req.body.firstName.trim() === '') {
    return res.status(406)
      .json({
        message: 'Input a valid first Name'
      });
  }
  if (!req.body.lastName || req.body.lastName.trim() === '') {
    return res.status(406)
      .json({
        message: 'Input a valid last Name'
      });
  }
  if (req.body.password.length < 8) {
    return res.status(411).json({
      message: 'password must be 8 characters or more'
    });
  }
  next();
};


export const validateGetRecipe = (req, res, next) => {
  if (!req.body.description) {
    return res.status(400).json({
      message: 'Input a description for your recipe'
    });
  }
  if (!req.body.recipeName) {
    return res.status(400).json({
      message: 'Input a name for your recipe'
    });
  }
  if (!req.body.ingredients) {
    return res.status(400).json({
      message: 'Input ingredients for your recipes'
    });
  }
  next();
};

export const recipeValidation = (req, res, next) => {
  if (!req.body.description && !req.body.recipeName && !req.body.ingredients) {
    return res.status(400).json({
      error: 'Input a valid recipe name'
    });
  }
  next();
};

export const reviewsValidation = (req, res, next) => {
  if (!req.body.reviews || req.body.reviews.trim() === '') {
    return res.status(400).json({
      error: 'review cannot be empty'
    });
  }
  next();
};
