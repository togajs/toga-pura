'use strict';

var pura = require('../index'),
	es = require('event-stream'),
	expect = require('expect.js'),
	toga = require('toga'),

	config = {
		src: __dirname + '/fixtures/**/*.*',
		dest: __dirname + '/actual'
	};

describe('toga-pura e2e', function () {
	var count;

	function toAst(file, cb) {
		count++;

		file.ast = JSON.parse(file.contents.toString());
		cb(null, file);
	}

	it('should convert AST to HTML', function (done) {
		count = 0;

		toga
			.src(config.src)
			.pipe(es.map(toAst))
			.pipe(pura.compiler())
			.pipe(toga.dest(config.dest))
			.on('error', done)
			.on('end', function () {
				expect(count).to.be(1);
				done();
			});
	});
});
