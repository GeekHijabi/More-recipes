[![Build Status](https://travis-ci.org/GeekHijabi/More-recipes.svg?branch=development)](https://travis-ci.org/GeekHijabi/More-recipes)
[![Coverage Status](https://coveralls.io/repos/github/GeekHijabi/More-recipes/badge.svg?branch=development)](https://coveralls.io/github/GeekHijabi/More-recipes?branch=development)
[![Code Climate](https://codeclimate.com/github/GeekHijabi/More-Recipes/badges/gpa.svg)](https://codeclimate.com/github/GeekHijabi/More-Recipes)
_**About**_:
* More-Recipes provides a platform for users to share the awesome and exciting  recipe ideas they have invented or learnt.  Suppose a user comes up with a recipe,  he/she can post it on More-Recipes and  get feedback in form of reviews and votes from other users who explore that recipe. Users can also keep a list of their favorite recipes on the application.


* Technologies:
Written following JavaScript ES6 Syntax and nodejs on the backend, using:

* Nodejs; a JavaScript runtime built on Chrome's V8 JavaScript engine.
* Bootstrap; An open source toolkit for developing with HTML, CSS, and JS.
* Mocha; a feature-rich JavaScript test framework running on Node.js
* Chai; a BDD / TDD assertion library for node and the browser that can be paired with any javascript testing framework.
* Eslint; provides a pluggable linting utility for JavaScript
* nHound CI; comments on style violations on GitHub pull requests.
* Travis CI; a hosted continuous integration and delivery service for GitHub projects.
* Express js; handles backend routing.
* Coveralls; shows the parts of your code that are not covered by your test suites.
* Sequelize; a promise-based ORM for Node.js and io.js.
* PostgreSQL; a powerful, open source object-relational database system.
* Postman; a powerful HTTP client for testing web services.

Endpoints:
* API endpoints for users to create accounts and login to the application:
    * POST: /api/users/signup 
    * POST: /api/users/signin
* API route that allows authenticated user to add a recipe:
    * POST: /api/recipes
* API route that allows authenticated user to modify a recipe they added
    * PUT: /api/recipes/<recipeId>
* API route that allows authenticated user to delete a recipe they added
    * DELETE: /api/recipes/<recipeId>
* API route that allows a user to get all the recipes in the application
    * GET: /api/recipes
* API route that allows an authenticated user post a review for a recipe
     * POST: /api/recipes/<recipeId>/reviews
* API route that allows an authenticated user to get all his/her favorite recipes
    * GET: /api/users/<userId>/recipes
* API route that allows a user to get just recipes with the most upvotes
    * GET: /api/recipes?sort=upvotes&order=desc



