import path from 'path';
import nodemailer from 'nodemailer';

const hbs = require('nodemailer-express-handlebars'),
  email = process.env.MAILER_EMAIL_ID,
  pass = process.env.MAILER_PASSWORD;

const smtpTransport = nodemailer.createTransport({
  service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
  auth: {
    user: email,
    pass
  }
});

const handlebarsOptions = {
  viewEngine: 'handlebars',
  viewPath: path.resolve('./Email-Template'),
  extName: '.html'
};

smtpTransport.use('compile', hbs(handlebarsOptions));
