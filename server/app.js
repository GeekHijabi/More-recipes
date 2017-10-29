import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import 'dotenv';

import routes from './routes';

const app = express();
const port = process.env.PORT || 5000;
app.set('port', port);

const env = process.env.NODE_ENV || 'development';
if (env === 'production') {
  // for serving static react client app on heroku
  app.use('/', express.static(path.resolve(__dirname, '../../client/dist')));
} else {
  // for serving static react client app on server localhost:port
  app.use('/', express.static(path.resolve(__dirname, '../client/dist')));
}

// process.env.secretKey;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);
app.listen(port);
console.log(`server has started on port: ${port}`);

export default app;

