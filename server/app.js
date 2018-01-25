import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import 'dotenv';

import routes from './routes';

const app = express();
const port = process.env.PORT || 3000;
app.set('port', port);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
routes(app);
app.use('/api-docs', express.static('api_docs'));
app.use('/', express.static('client/dist'));
app.use('*', express.static('client/dist'));


app.listen(port);
console.log(`server has started on port: ${port}`);

app.use(express.static('server/'));

export default app;
