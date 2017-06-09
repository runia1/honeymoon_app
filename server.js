'use strict';

import express from 'express';
import nodemailer from 'nodemailer';

//SET UP NODEMAILER
const gmailCredentials = require('../keys/gmail.json');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailCredentials.email,
    pass: gmailCredentials.pass
  }
});

//DEFINE THE APP
const app = express();

//DEFINE ALL STATIC ROUTES
app.use(express.static(__dirname + '/default'));

app.use('/node_modules/redux', express.static(__dirname + '/../node_modules/redux'));

app.use('/static-photos', express.static(__dirname + '/../photos'));

//ROUTES NOT YET HANDLED GET FORWARDED TO INDEX
app.use('*', express.static(__dirname + '/default/index.html'));

//LOG ERRORS
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });

  throw err;
});

// PORT 443 -> 8080
app.listen(8080, () => {
  console.log('listening on port 8080');
});

process.on('uncaughtException', (exception) => {
  logError(exception);
});

process.on('unhandledRejection', (reason, p) => {
  const msg = `Unhandled Rejection at Promise: ${p}, reason: ${reason}`;
  logError(msg);
});

const logError = (msg) => {
  msg = `${new Date()} => ERROR: ${msg}`;

  //log it to stderr
  console.error(msg);

  //email it to mrunia
  const mailOptions = {
    from: gmailCredentials.email,
    to: gmailCredentials.email,
    subject: 'Server error [http]',
    text: `An error occurred and your server may be down!\nError: ${msg}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Error Email sent: ' + info.response);
    }
  });
};