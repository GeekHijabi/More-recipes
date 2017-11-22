[![Build Status](https://travis-ci.org/GeekHijabi/More-recipes.svg?branch=development)](https://travis-ci.org/GeekHijabi/More-recipes)
[![Coverage Status](https://coveralls.io/repos/github/GeekHijabi/More-recipes/badge.svg?branch=development)](https://coveralls.io/github/GeekHijabi/More-recipes?branch=development)
[![Maintainability](https://api.codeclimate.com/v1/badges/fd85a9dcb3df2fd5ad26/maintainability)](https://codeclimate.com/github/GeekHijabi/More-recipes/maintainability)


#More Recipes
-------------------

More-Recipes provides a platform for user to share the awesome and exciting  recipe ideas they have invented or learnt.  Suppose a user comes up with a recipe,  he/she can post it on More-Recipes and  get feedback in form of reviews and votes from other user who explore that recipe. user can also keep a list of their favorite recipes on the application.

## Technologies
-------------------
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

## Installations
-------------------
* Install Node js and Postgres on your machine
* Clone the repository [git clone https://github.com/GeekHijabi/More-recipes]
* Navigate to directory [cd More-recipes]
* Install all required dependencies with [npm install]
* Install postgres
* For easy accessibility, Install sequelize-cli globally for database migrations [ npm install -g sequelize-cli ]
* Create a [.env] file in your root directory, following the syntax of the [.env] file
* Migrate your database using [sequelize db:migrate] on the command line
* You can undo migrations by running [sequelize db:migrate:undo:all] on the command line
* Run npm server:dev to start the application

## Dependencies
--------------------
> - babel-cli    - babel-core    - babel-preset-es2015   - babel-preset-stage-2
> - bcrypt   - body-parser    - chai   - coveralls    - dotenv  - expect
> - express  - express-validator  - jsonwebtoken   - mocha   - mocha-lcov-reporter
> - morgan   - nyc    - pg   - pg-hstore  - sequelize   - sequelize-cli   - supertest

## Endpoints
--------------------
<h3>API ENDPOINTS</h3>
<hr>
<table>
  <tr>
      <th>Request</th>
      <th>End Point</th>
      <th>Action</th>
      <th>Parameters</th>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/user/signup</td>
      <td>Create an account</td>
      <td>{
    <br>
      firstName: 'test',<br>
      lastName: 'test',<br>
      email: 'test@tester.com',<br>
      username: 'tester',<br>
      password: 'tester123',<br>}
    <br>
    </td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/user/signin</td>
      <td>Login to the app</td>
      <td>{
    <br>
      email: 'test@tester.com',<br>
      username: 'tester',<br>
      password: 'tester123',<br>}
    <br>
    </td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/recipes</td>
      <td>Create New Recipe</td>
      <td>{
    <br>
      recipeName: 'recipe name',<br>
      description: 'description',<br>
      ingredients: 'ingredients',<br>}
    <br>
    </td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/recipes?sort=upvotes&order=des </td>
      <td>Gets all recipes and sort by upvotes</td>
      <td>{
    <br>
      order: 'order',<br>
      page: 'page',<br>
      sort: 'upvotes',<br>
      limit: 'limit',<br>}
    <br>
    </td>
  </tr>
  
  <tr>
      <td>DELETE</td>
      <td>/api/v1/recipes/:recipeId</td>
      <td>Delete a recipe</td>
      <td>Supply recipe Id to be deleted</td>
  </tr>
  
  <tr>
      <td>PUT</td>
      <td>/api/v1/recipes/:recipeId</td>
      <td>Modify Recipe</td>
      <td>{
    <br>
      recipeName: 'recipe name',<br>
      description: 'description',<br>
      ingredients: 'ingredients',<br>}
    <br>
    </td>
  </tr>
  
  <tr>
      <td>POST</td>
      <td>/api/v1/recipe/:recipeId/upvote</td>
      <td>Upvote a recipe</td>
      <td>Supply recipe Id to be upvoted</td>
  </tr>

  <tr>
      <td>GET</td>
      <td>/api/v1/user/:userId/favorites</td>
      <td>get all user's favorite recipe</td>
      <td>Supply user Id to view all favorites</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/user/:recipeId/favorites</td>
      <td>add a recipe favorite recipe</td>
      <td>Supply recipe id to  be add to favorites</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/recipes/:recipeId/reviews </td>
      <td>Post a review</td>
      <td>Supply recipe id of recipe to be reviewed</td>
  </tr>
</table>


## Author
-  Hamdalah Adetunji

