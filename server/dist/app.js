'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

require('dotenv');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = process.env.PORT || 5000;
app.set('port', port);

var env = process.env.NODE_ENV || 'development';
if (env === 'production') {
  // for serving static react client app on heroku
  app.use('/', _express2.default.static(_path2.default.resolve(__dirname, '../../client/dist')));
} else {
  // for serving static react client app on server localhost:port
  app.use('/', _express2.default.static(_path2.default.resolve(__dirname, '../client/dist')));
}

// process.env.secretKey;

app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

(0, _routes2.default)(app);
app.listen(port);
console.log('server has started on port: ' + port);

exports.default = app;