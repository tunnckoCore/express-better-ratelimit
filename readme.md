# better-ratelimit [![NPM version][npmjs-shields]][npmjs-url] [![Build Status][travis-img]][travis-url] [![Dependency Status][depstat-img]][depstat-url] [![Coveralls][coveralls-shields]][coveralls-url]
> [Express.js][express-url] request rate limit middleware by IP with MemoryStore


## Install [![Nodei.co stats][npmjs-install]][npmjs-url]
> Install with [npm](https://npmjs.org)

```
$ npm install express-better-ratelimit
$ npm test
```

**This package follows [ferver](https://github.com/jonathanong/ferver)**
> Please read [history.md](history.md) for more info!

- option `message_429` deprecated **>=v1.1.x**, instead use `accessLimited`
- option `message_403` deprecated **>=v1.1.x**, instead use `accessForbidden`


## Usage
> Some demo example which is exactly `example.js`

```js
var express = require('express');
var limit = require('./index');

var app = express();

app.use(limit({
  duration: 30000, //30 seconds
  max: 5
  //blackList: ['127.0.0.1']
}));

app.use(function helloWorld(req, res, next) {
  res.set('Content-Type', 'text/plain');
  res.status(200).send('Hello world');
  next();
});

var port = process.env.PORT || 3333;
app.listen(port);
console.log('Express server start listening on port %s', port);
console.log('Type few times: curl -i http://localhost:%s', port);
```


## [.expressBetterRatelimit](index.js#L32)
> With options through init you can control black/white lists, limit per ip and reset interval.

* `[options]` **{Object}**
  - `duration` **{Integer}** Limit duration in milliseconds, default `1000 * 60 * 60 * 1` (1 hour)
  - `whiteList` **{Array}** All ips that won't be limited, default `empty array`
  - `blackList` **{Array}** All ips that always be limited and 403, default `empty array`
  - `accessLimited` **{String}** Message for all requests after limit, default `429: Too Many Requests.`
  - `accessForbidden` **{String}** Message for limited/forbidden, default `403: This is forbidden area for you.`
  - `max` **{Integer}** Max requests per ip, default `500`
  - `env` **{Boolean}** Manage enviroment, for tests will use `x-koaip` header, default `null`
* `return` **{Function}**


## Authors & Contributors 
**Charlike Make Reagent** [![author tips][author-gittip-img]][author-gittip]
+ [gittip/tunnckoCore][author-gittip]
+ [github/tunnckoCore][author-github]
+ [twitter/tunnckoCore][author-twitter]
+ [npmjs/tunnckoCore][author-npmjs]


## License [![MIT license][license-img]][license-url]
Copyright (c) 2014 [Charlike Make Reagent][author-website], [contributors](https://github.com/tunnckoCore/express-better-ratelimit/graphs/contributors).  
Released under the [`MIT`][license-url] license.

[npmjs-url]: http://npm.im/express-better-ratelimit
[npmjs-shields]: http://img.shields.io/npm/v/express-better-ratelimit.svg
[npmjs-install]: https://nodei.co/npm/express-better-ratelimit.svg?mini=true

[coveralls-url]: https://coveralls.io/r/tunnckoCore/express-better-ratelimit?branch=master
[coveralls-shields]: https://img.shields.io/coveralls/tunnckoCore/express-better-ratelimit.svg

[license-url]: https://github.com/tunnckoCore/express-better-ratelimit/blob/master/license.md
[license-img]: http://img.shields.io/badge/license-MIT-blue.svg

[travis-url]: https://travis-ci.org/tunnckoCore/express-better-ratelimit
[travis-img]: https://travis-ci.org/tunnckoCore/express-better-ratelimit.svg?branch=master

[depstat-url]: https://david-dm.org/tunnckoCore/express-better-ratelimit
[depstat-img]: https://david-dm.org/tunnckoCore/express-better-ratelimit.svg

[author-gittip-img]: http://img.shields.io/gittip/tunnckoCore.svg
[author-gittip]: https://www.gittip.com/tunnckoCore
[author-github]: https://github.com/tunnckoCore
[author-twitter]: https://twitter.com/tunnckoCore

[author-website]: http://www.whistle-bg.tk
[author-npmjs]: https://npmjs.org/~tunnckocore

[express-url]: https://github.com/strongloop/express