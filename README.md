[![Build Status](https://travis-ci.org/GeekHijabi/More-recipes.svg?branch=development)](https://travis-ci.org/GeekHijabi/More-recipes)
[![Coverage Status](https://coveralls.io/repos/github/GeekHijabi/More-recipes/badge.svg?branch=development)](https://coveralls.io/github/GeekHijabi/More-recipes?branch=development)
[![Maintainability](https://api.codeclimate.com/v1/badges/fd85a9dcb3df2fd5ad26/maintainability)](https://codeclimate.com/github/GeekHijabi/More-recipes/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/fd85a9dcb3df2fd5ad26/test_coverage)](https://codeclimate.com/github/GeekHijabi/More-recipes/test_coverage)


#More Recipes
-------------------

More-Recipes provides a platform for user to share the awesome and exciting  recipe ideas they have invented or learnt.  Suppose a user comes up with a recipe,  they can post it on More-Recipes and  get feedback in form of reviews and votes from other user who explore that recipe. user can also keep a list of their favorite recipes on the application.

## Explore app at:
---
* https://morerecipes-27.herokuapp.com


## Technologies
-------------------
Written following JavaScript ES6 Syntax and nodejs on the backend, using:

* Nodejs: a JavaScript runtime built on Chrome's V8 JavaScript engine.
* Bootstrap: An open source toolkit for developing with HTML, CSS, and JS.
* Mocha: a feature-rich JavaScript test framework running on Node.js
* Chai: a BDD / TDD assertion library for node and the browser that can be paired with any javascript testing framework.
* Eslint: provides a pluggable linting utility for JavaScript
* Hound CI: comments on style violations on GitHub pull requests.
* Travis CI: a hosted continuous integration and delivery service for GitHub projects.
* Express js: handles backend routing.
* Coveralls: shows the parts of code that are not covered by test suites.
* Sequelize: a promise-based ORM for Node.js and io.js.
* PostgreSQL: a powerful, open source object-relational database system.
* Postman: a powerful HTTP client for testing web services.
* React: a declarative, efficient, and flexible JavaScript library for building user interfaces.
* Redux: a predictable state container for JavaScript apps.
* Jest: a framework to test all JavaScript code including React applications
* Webpack:  a build tool that puts all of your assets, including Javascript, images, fonts, and CSS, in a dependency graph.


## Installations
-------------------
* Install Node js and Postgres on your machine
* Clone the repository `git clone https://github.com/GeekHijabi/More-recipes`
* Navigate to directory `cd More-recipes`
* Install all required dependencies with `npm install`
* For easy accessibility, Install sequelize-cli globally for database migrations `npm install -g sequelize-cli`
* Create a `.env` file in your root directory, following the syntax of the `.env-sample` file
* Migrate your database using `sequelize db:migrate` on the command line
* You can undo migrations by running `sequelize db:migrate:undo:all` on the command line
* Run npm start:dev to start the application

### Website Functionality
There are two major users of the app, their functionalities are listed below

#### Non Registered Users
* Sign up to the app
* View a list of all recipes created in the app
* Get a count of upvotes, downvotes and favorites on the app
* View a list of the most popular recipes
* View a list of most upvoted recipe

#### Registered Users
* View their profile snd update information
* View all the recipes available on the app
* Create a recipe
* Update a recipe
* Delete recipe from the recipes they created
* View the details of a single recipe
* Get the details of a recipe including the description and ingredients
* Upvote a recipe
* Downvote a recipe
* Favorite a recipe
* Remove a recipe from favorite list
* Review a recipe
* Delete a review added by them
* Reset password when they forget it

## Test
---
* For backend test, run `npm test`
* For frontend test, run `npm run jest`

## Limitations of The Application
---
* User can only get token on sign in and it expires after 48 hours
* Users not registered cannot see recipe details
* Users cannot deactivate their accounts

## Contributions
---
* Fork this repository to your github account
* Clone the repository - `git clone https://github.com/GeekHijabi/More-recipes.git`
* Create your feature branch - `git checkout -b {feature, chore or bug}-short_feature_description`
* Commit your changes - 
`git commit -m “{commit_message_goes_here}“ or git commit for the interactive interface`
* Push to the remote branch - 
`git push origin {your_branch_name_as_described_above}`
* Create a pull request

## Documentation
--------------------
Documentation of the api endpoint can be found at [MoreRecipes Docs](https://morerecipes-27.herokuapp.com/api-docs/)


## Author
-  Hamdalah Adetunji

## License
---
This is licensed for your use, modification and distribution under the 
[MIT license](https://github.com/GeekHijabi/More-recipes/blob/development/LICENSE).
