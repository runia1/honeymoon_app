'use strict';

import express from 'express';

//DEFINE THE APP
const app = express();

//DEFINE ALL STATIC ROUTES
app.use(express.static(__dirname + '/default'));

//ROUTES NOT YET HANDLED GET FORWARDED TO INDEX
app.use('*', express.static(__dirname + '/default/index.html'));

// PORT 443 -> 8080
app.listen(8080, () => {
  console.log('listening on port 8080');
});