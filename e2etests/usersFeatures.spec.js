// const path = require('path');
const { signUpDetails, SignInDetails } = require('./mockData');

const veryShort = 500;
const short = 1000;
const long = 3000;
const baseUrl = 'http://localhost:8080';

module.exports = {
  'Display homepage and ensure all element are available': (browser) => {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body', 5000)
      .assert.containsText('.nav-link', 'Sign in')
      .assert.containsText('.navbar-brand', 'moreRecipe')
      .assert.visible('.body-title-card')
      .assert.visible('.nav-item:nth-child(1) .btn')
      .assert.containsText('.nav-item:nth-child(1) .btn', 'Sign in')
      .assert.containsText('.nav-item:nth-child(2) .btn', 'Sign up')
      .assert.containsText('.heading', 'Currently Trending')
      .assert.visible('img.bg')
      .assert.visible('.page-footer')
      .assert.containsText('.footer-copyright', '© 2017 copyright: morerecipes27@gmail.com')
      .pause(long)
      .click('.nav-item:nth-child(2)');
  },

  'User receives an error if a required field for signup is empty': (browser) => {
    browser
      .url(`${baseUrl}/signup`)
      .resizeWindow(1700, 800)
      .maximizeWindow()
      .pause(long)
      .waitForElementVisible('.card-body.mx-4', 5000)
      .setValue('input[name=userName]', '')
      .pause(short)
      .click('button.btn.btn-white.btn-rounded.float')
      .waitForElementVisible('.error-name', 5000)
      .assert.containsText('.error-name', 'This field is required')
      .pause(short)
      .setValue('input[name=email]', 'test')
      .pause(short)
      .click('button.btn.btn-white.btn-rounded.float')
      .waitForElementVisible('.error-email', 5000)
      .assert.containsText('.error-email', 'Email is Invalid')
      .pause(short)
      .setValue('input[name=password]', 'test')
      .pause(short)
      .click('button.btn.btn-white.btn-rounded.float')
      .waitForElementVisible('.error-password', 5000)
      .assert.containsText('.error-password', 'Password is too short, Must be min. of 8')
      .pause(short)
      .setValue('input[name=confirmPassword]', 'tester123')
      .pause(short)
      .click('button.btn.btn-white.btn-rounded.float')
      .waitForElementVisible('.error-confirmPassword', 5000)
      .assert.containsText('.error-confirmPassword', 'Password does not match')
      .pause(short);
  },

  'User can sign up': (browser) => {
    browser
      .url(`${baseUrl}/signup`)
      .pause(long)
      .waitForElementVisible('body', 5000)
      .setValue('input[name=userName]', signUpDetails.userName)
      .setValue('input[name=email]', signUpDetails.email)
      .setValue('input[name=password]', signUpDetails.password)
      .setValue('input[name=confirmPassword]', signUpDetails.confirmPassword)
      .click('button.btn.btn-white.btn-rounded.float')
      .waitForElementVisible('.toast-message', 5000)
      .assert.containsText('.toast-message', 'You have successfully signed in')
      .pause(2000)
      .waitForElementVisible('.toast-message', 5000)
      .assert.urlContains('/recipes')
      .waitForElementVisible('footer', short)
      .pause(long)
      .click('#dropdownMenuButton')
      .pause(long)
      .click('.dropdown-item:nth-child(4)');
  },

  'User cannot sign up with data that already exists': (browser) => {
    browser
      .url(`${baseUrl}/signup`)
      .resizeWindow(1700, 800)
      .maximizeWindow()
      .pause(long)
      .waitForElementVisible('.card-body.mx-4', 5000)
      .setValue('input[name="userName"]', signUpDetails.userName)
      .setValue('input[name=email]', signUpDetails.email)
      .setValue('input[name=password]', signUpDetails.password)
      .setValue('input[name=confirmPassword]', signUpDetails.confirmPassword)
      .click('button.btn.btn-white.btn-rounded.float')
      .waitForElementVisible('.alert.alert-danger.alert-dismissible.fade.show', 5000)
      .assert.containsText(
        '.alert.alert-danger.alert-dismissible.fade.show',
        'User already exists'
      );
  },


  'User receives an error if a required field for signin is empty': (browser) => {
    browser
      .url(`${baseUrl}/signin`)
      .pause(long)
      .waitForElementVisible('.card-body.mx-4', 5000)
      .setValue('input[name=identifier]', '')
      .pause(short)
      .click('button.btn.btn-white.btn-rounded.float')
      .waitForElementVisible('.error-identifier', 5000)
      .assert.containsText('.error-identifier', 'This field is required')
      .pause(short)
      .setValue('input[name=password]', 'test')
      .pause(short)
      .click('button.btn.btn-white.btn-rounded.float')
      .waitForElementVisible('.error-password', 5000)
      .assert.containsText('.error-password', 'Password is too short, Must be min. of 8')
      .pause(short);
  },


  'User can sign in to the app': (browser) => {
    browser
      .url(`${baseUrl}/signin`)
      .pause(long)
      .waitForElementVisible('body', 5000)
      .setValue('input[name=identifier]', SignInDetails.identifier)
      .setValue('input[name=password]', SignInDetails.password)
      .click('button.btn.btn-white.btn-rounded.submit.float')
      .waitForElementVisible('.toast-message', 5000)
      .assert.containsText('.toast-message', 'You have successfully signed in')
      .pause(2000)
      .waitForElementVisible('.toast-message', 5000);
  },

  'AllRecipes: user sees a message when there\'s no recipe on the app':
  (browser) => {
    browser
      .url(`${baseUrl}/recipes`)
      .pause(long)
      .assert.visible('.styleText')
      .assert.containsText('.styleText', 'No recipes yet, Come back soon for amazing recipes!')
      .pause(short);
  },

  'AllRecipes: user sees a message when no recipe has been created':
  (browser) => {
    browser
      .url(`${baseUrl}/admin`)
      .pause(long)
      .assert.visible('.styleText')
      .assert.containsText('.styleText', 'You have not created any recipe yet!, click the icon above to add a new recipe')
      .pause(short);
  },

  'User gets an error if required fields for creating recipe is empty':
    (browser) => {
      browser
        .url(`${baseUrl}/admin`)
        .assert.visible('.fa.fa-plus-circle')
        .click('.fa.fa-plus-circle')
        .pause(veryShort)
        .assert.visible('.modal-content', 5000)
        .setValue('input[name=recipeName]', ' ')
        .pause(short)
        .click('button.submit-btn.btn.btn-secondary')
        .waitForElementVisible('.error-recipeName', 5000)
        .assert.containsText('.error-recipeName', 'This field is required')
        .pause(short)
        .setValue('textarea[name=ingredients]', ' ')
        .pause(short)
        .click('button.submit-btn.btn.btn-secondary')
        .waitForElementVisible('.error-ingredients', 5000)
        .assert.containsText('.error-ingredients', 'This field is required')
        .pause(short)
        .setValue('textarea[name=description]', ' ')
        .pause(short)
        .click('button.submit-btn.btn.btn-secondary')
        .waitForElementVisible('.error-description', 5000)
        .assert.containsText('.error-description', 'This field is required')
        .pause(short);
    },

  'User can create a recipe':
    (browser) => {
      browser
        .url(`${baseUrl}/admin`)
        .assert.visible('.fa.fa-plus-circle')
        .click('.fa.fa-plus-circle')
        .pause(veryShort)
        .assert.visible('.modal-content', 5000)
        .setValue('input[name=recipeName]', 'rice')
        .click('button.submit-btn.btn.btn-secondary')
        .setValue('textarea[name=ingredients]', 'rice, oil')
        .click('button.submit-btn.btn.btn-secondary')
        .setValue('textarea[name=description]', 'boil rice')
        .pause(short)
        .click('button.submit-btn.btn.btn-secondary')
        .pause(short)
        .waitForElementVisible('.toast-message', 5000)
        .assert.containsText('.toast-message', 'Recipe Created Successfully')
        .assert.visible('#recipe-1')
        .pause(long)
        .click('.fa.fa-plus-circle')
        .pause(veryShort)
        .assert.visible('.modal-content', 5000)
        .setValue('input[name=recipeName]', 'beans')
        .click('button.submit-btn.btn.btn-secondary')
        .setValue('textarea[name=ingredients]', 'beans, oil')
        .click('button.submit-btn.btn.btn-secondary')
        .setValue('textarea[name=description]', 'boil beans')
        .pause(short)
        .click('button.submit-btn.btn.btn-secondary')
        .pause(short)
        .waitForElementVisible('.toast-message', 5000)
        .assert.containsText('.toast-message', 'Recipe Created Successfully')
        .assert.visible('#recipe-2')
        .pause(long)
        .click('.fa.fa-plus-circle')
        .pause(veryShort)
        .assert.visible('.modal-content', 5000)
        .setValue('input[name=recipeName]', 'garri')
        .click('button.submit-btn.btn.btn-secondary')
        .setValue('textarea[name=ingredients]', 'water, garri')
        .click('button.submit-btn.btn.btn-secondary')
        .setValue('textarea[name=description]', 'make eba')
        .pause(short)
        .click('button.submit-btn.btn.btn-secondary')
        .pause(short)
        .waitForElementVisible('.toast-message', 5000)
        .assert.containsText('.toast-message', 'Recipe Created Successfully')
        .assert.visible('#recipe-3');
    },

  'User can not create recipe with same name twice':
    (browser) => {
      browser
        .url(`${baseUrl}/admin`)
        .assert.visible('.fa.fa-plus-circle')
        .click('.fa.fa-plus-circle')
        .pause(veryShort)
        .assert.visible('.modal-content', 5000)
        .setValue('input[name=recipeName]', 'rice')
        .click('button.submit-btn.btn.btn-secondary')
        .setValue('textarea[name=ingredients]', 'rice, oil')
        .click('button.submit-btn.btn.btn-secondary')
        .setValue('textarea[name=description]', 'boil rice')
        .pause(short)
        .click('button.submit-btn.btn.btn-secondary')
        .pause(short)
        .waitForElementVisible('.alert.alert-danger.alert-dismissible.fade.show', 5000)
        .assert.containsText(
          '.alert.alert-danger.alert-dismissible.fade.show',
          'You cannot create same recipe twice'
        );
    },

  'Edit Recipe: users can edit recipes created by them':
    (browser) => {
      browser
        .url(`${baseUrl}/admin`)
        .pause(long)
        .click('#recipe-3 .fa.fa-edit')
        .pause(long)
        .assert.value('input[name=recipeName]', 'garri')
        .clearValue('input[name=recipeName]')
        .pause(veryShort)
        .click('button.submit-btn.btn.btn-secondary');
    },

  'Delete Recipe: users can delete recipes created by them':
    (browser) => {
      browser
        .url(`${baseUrl}/admin`)
        .pause(long)
        .click('#recipe-2 .fa.fa-trash')
        .pause(long)
        .click('.swal-button.swal-button--confirm.swal-button--danger')
        .waitForElementVisible('.swal-text', short)
        .assert.containsText('.swal-text', 'Poof! Your recipe has been deleted!')
        .assert.elementNotPresent('#recipe-2')
        .pause(short);
    },

  'Recipe Details: users can view recipe details':
    (browser) => {
      browser
        .url(`${baseUrl}/admin`)
        .pause(long)
        .click('#recipe-3 .btn.card-view')
        .pause(veryShort)
        .assert.containsText('.food_name', 'garri')
        .pause(long)
        .waitForElementVisible('.fa.fa-heart.fa-2x', 5000)
        .click('.fa.fa-heart.fa-2x')
        .assert.containsText('.detail-value', 0)
        .pause(veryShort)
        .waitForElementVisible('.fa.fa-thumbs-o-up.fa-2x', 5000)
        .click('.fa.fa-thumbs-o-up.fa-2x')
        .assert.containsText('.detail-value', 0)
        .pause(short)
        .waitForElementVisible('.fa.fa-thumbs-o-down.fa-2x', 5000)
        .click('.fa.fa-thumbs-o-down.fa-2x')
        .pause(short)
        .waitForElementVisible('.fa.fa-eye.fa-2x', 5000)
        .click('.fa.fa-eye.fa-2x')
        .assert.containsText('.detail-value', 0)
        .waitForElementVisible('#dropdownMenuButton', 5000)
        .click('#dropdownMenuButton')
        .pause(long)
        .click('.dropdown-item:nth-child(3)');
    },

  'Favorite: user see their favorite recipes':
    (browser) => {
      browser
        .url(`${baseUrl}/favorites`)
        .pause(long)
        .assert.visible('#recipe-3')
        .pause(short)
        .click('.fa.fa-user-circle-o.fa-2x')
        .pause(long);
    },

  'Profile: user see their profile page':
    (browser) => {
      browser
        .url(`${baseUrl}/profile`)
        .pause(long)
        .click('.fa.fa-user-circle-o.fa-2x')
        .click('.fa.fa-edit.fa-2x')
        .setValue('input[name=bio]', 'nice')
        .setValue('input[name=summary]', 'cool')
        .pause(veryShort)
        .click('button.submit-btn.btn.btn-secondary')
        .pause(long);
    },


  'AllRecipes: user can get all the recipes available':
    (browser) => {
      browser
        .url(`${baseUrl}/recipes`)
        .pause(long)
        .assert.elementNotPresent('.styleText')
        .assert.visible('#recipe-1')
        .assert.visible('#recipe-3')
        .pause(short);
    },
  'user gets redirected to a 404 page when route is invalid':
    (browser) => {
      browser
        .url(`${baseUrl}/recip`)
        .pause(long)
        .assert.containsText('.pageStyle', 'Page Not Found')
        .assert.attributeEquals('img', 'src', `${baseUrl}/eee4609128264a613720a2ff6f6d34c7.gif`)
        .pause(long)
        .end();
    },

};

