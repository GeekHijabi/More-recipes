import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

import recipes from './routes/recipes';
// import users from '../routes/users';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended:false }));

//app.use('/api/users', users)
app.use('/api/recipes', recipes);

app.get('/', (req, res) => {
  res.status(200).send({
      Message: 'Welcome to More recipes!'
  });
})

app.use((req, res, next) => {
    const err = res.status(400).send({
        ERROR: '404: Sorry Page Not Found!'
    })
    next(err)
});

export default app;