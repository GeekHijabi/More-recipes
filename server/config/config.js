const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  development: {
    username: 'hamdalah',
    password: 'hamdalah',
    database: 'morerecipes',
    host: '127.0.0.1',
    port: '5432',
    secret_key: process.env.SECRET_KEY,
    dialect: 'postgres'
  },
  test: {
    username: 'hamdalah',
    password: 'hamdalah',
    database: 'morerecipes',
    host: '127.0.0.1',
    port: '5432',
    secret_key: process.env.SECRET_KEY,
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  }
};
