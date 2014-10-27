/**
 * express-better-ratelimit <https://github.com/tunnckoCore/express-better-ratelimit>
 *
 * Copyright (c) 2014 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

/**
 * Module dependencies.
 */

var express = require('express')
var limit = require('./index')
var request = require('supertest')
var PORT = 3333;

function hello(req, res, next) {
  res.set('Content-Type', 'text/html')
  res.status(200).send('<p>Hello test.</p>')
  next();
}


/**
 * app with non-default options
 */
var appNonDefault = express()
appNonDefault
  .use(limit({
    duration: 30000, //30 seconds
    max: 3, //max requests
    env: 'test'
  }))
  .use(hello)
  .listen(PORT++);

describe('app with non-default options', function () {
  it('should status 200 - 1.2.3.4 - remaining 2/3', function (done) {
    request(appNonDefault)
    .get('/')
    .set('x-expressip', '1.2.3.4')
    .expect(200, '<p>Hello test.</p>')
    .expect('X-RateLimit-Limit', '3')
    .expect('X-RateLimit-Remaining', '2')
    .end(done);
  });
  it('should status 200 - 1.2.3.4 - remaining 1/3', function (done) {
    request(appNonDefault)
    .get('/')
    .set('x-expressip', '1.2.3.4')
    .expect(200, '<p>Hello test.</p>')
    .expect('X-RateLimit-Limit', '3')
    .expect('X-RateLimit-Remaining', '1')
    .end(done);
  });
  it('should status 200 - 1.2.3.4 - remaining 0/3', function (done) {
    request(appNonDefault)
    .get('/')
    .set('x-expressip', '1.2.3.4')
    .expect(200, '<p>Hello test.</p>')
    .expect('X-RateLimit-Limit', '3')
    .expect('X-RateLimit-Remaining', '0')
    .end(done);
  });
  it('should status 429 - 1.2.3.4 - remaining 0/3 /1', function (done) {
    request(appNonDefault)
    .get('/')
    .set('x-expressip', '1.2.3.4')
    .expect(429, '429: Too Many Requests.')
    .expect('X-RateLimit-Limit', '3')
    .expect('X-RateLimit-Remaining', '0')
    .end(done);
  });
  it('should status 200 - 8.8.8.8 - remaining 2/3', function (done) {
    request(appNonDefault)
    .get('/')
    .set('x-expressip', '8.8.8.8')
    .expect(200, '<p>Hello test.</p>')
    .expect('X-RateLimit-Limit', '3')
    .expect('X-RateLimit-Remaining', '2')
    .end(done);
  });
  it('should status 200 - 8.8.8.8 - remaining 1/3', function (done) {
    request(appNonDefault)
    .get('/')
    .set('x-expressip', '8.8.8.8')
    .expect(200, '<p>Hello test.</p>')
    .expect('X-RateLimit-Limit', '3')
    .expect('X-RateLimit-Remaining', '1')
    .end(done);
  });
  it('should status 429 - 1.2.3.4 - remaining 0/3 /2', function (done) {
    request(appNonDefault)
    .get('/')
    .set('x-expressip', '1.2.3.4')
    .expect(429, '429: Too Many Requests.')
    .expect('X-RateLimit-Limit', '3')
    .expect('X-RateLimit-Remaining', '0')
    .end(done);
  });
  it('should status 200 - 8.8.8.8 - remaining 0/3', function (done) {
    request(appNonDefault)
    .get('/')
    .set('x-expressip', '8.8.8.8')
    .expect(200, '<p>Hello test.</p>')
    .expect('X-RateLimit-Limit', '3')
    .expect('X-RateLimit-Remaining', '0')
    .end(done);
  });
  it('should status 429 - 8.8.8.8 - remaining 0/3', function (done) {
    request(appNonDefault)
    .get('/')
    .set('x-expressip', '8.8.8.8')
    .expect(429, '429: Too Many Requests.')
    .expect('X-RateLimit-Limit', '3')
    .expect('X-RateLimit-Remaining', '0')
    .end(done);
  });
});


/**
 * app with blacklisted ips
 */
var appBlack = express()
appBlack
  .use(limit({
    blackList: ['4.4.1.*'],
    message_403: 'access forbidden, please contact foo@bar.com',
    env: 'test'
  }))
  .use(hello)
  .listen(PORT++);

describe('app with blacklisted ips', function () {
  it('should 403 Forbidden - blackList', function (done) {
    request(appBlack)
    .get('/')
    .set('x-expressip', '4.4.1.8')
    .expect(403, 'access forbidden, please contact foo@bar.com')
    .end(done);
  });
});


/**
 * app with whitelisted ips
 */
var appWhite = express()
appWhite
  .use(limit({
    whiteList: ['127.0.*.*'],
    max: 50,
    env: 'test'
  }))
  .use(hello)
  .listen(PORT++);

describe('app with whitelisted ips', function () {
  it('should 200 OK - whiteList - no limits', function (done) {
    request(appWhite)
    .get('/')
    .set('x-expressip', '127.0.4.4')
    .expect(200, '<p>Hello test.</p>')
    .end(done);
  });
});
