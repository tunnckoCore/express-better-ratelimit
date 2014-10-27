/**
 * express-better-ratelimit <https://github.com/tunnckoCore/express-better-ratelimit>
 *
 * Copyright (c) 2014 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var express = require('express')
var limit = require('./index')


var app = express()

app.use(limit({
  duration: 30000, //30 seconds
  max: 5,
  //blackList: ['127.0.0.1']
}));

app.use(function (req, res, next) {
  res.set('Content-Type', 'text/plain')
  res.status(200).send('Hello world')
  next();
});

var port = process.env.PORT || 3333;
app.listen(port);
console.log('Express server start listening on port ' + port);
console.log('Type few times: curl -i http://localhost:'+port);
