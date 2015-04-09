# `toga-pura`

[![NPM version][npm-img]][npm-url] [![Downloads][downloads-img]][npm-url] [![Build Status][travis-img]][travis-url] [![Coverage Status][coveralls-img]][coveralls-url] [![Chat][gitter-img]][gitter-url]

A light theme for [Toga](http://togajs.github.io) documentation.

## Install

    $ npm install toga-pura

## Usage

```js
var toga = require('toga'),
    js = require('toga-js'),
    md = require('toga-markdown'),
    pura = require('toga-pura'),

    config = {
        src: './src/assets/**/*.js',
        dest: './web/docs'
    };

toga
    .src(config.src)
    .pipe(js.parser())
    .pipe(md.formatter())
    .pipe(pura.compiler())
    .pipe(toga.dest(config.dest));
```

## Contribute

[![Tasks][waffle-img]][waffle-url] [![Tip][gittip-img]][gittip-url]

Standards for this project, including tests, code coverage, and semantics are enforced with a build tool. Pull requests must include passing tests with 100% code coverage and no linting errors.

### Test

    $ npm test

----

© 2014 Shannon Moeller <me@shannonmoeller.com>

Licensed under [MIT](http://shannonmoeller.com/mit.txt)

[coveralls-img]: http://img.shields.io/coveralls/togajs/toga-pura/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/togajs/toga-pura
[downloads-img]: http://img.shields.io/npm/dm/toga-pura.svg?style=flat-square
[gitter-img]:    http://img.shields.io/badge/gitter-join_chat-1dce73.svg?style=flat-square
[gitter-url]:    https://gitter.im/togajs/toga
[gittip-img]:    http://img.shields.io/gittip/shannonmoeller.svg?style=flat-square
[gittip-url]:    https://www.gittip.com/shannonmoeller
[npm-img]:       http://img.shields.io/npm/v/toga-pura.svg?style=flat-square
[npm-url]:       https://npmjs.org/package/toga-pura
[travis-img]:    http://img.shields.io/travis/togajs/toga-pura.svg?style=flat-square
[travis-url]:    https://travis-ci.org/togajs/toga-pura
[waffle-img]:    http://img.shields.io/github/issues/togajs/toga-pura.svg?style=flat-square
[waffle-url]:    http://waffle.io/togajs/toga-pura
