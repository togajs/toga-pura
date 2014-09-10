'use strict';

var TogaCompilerPura = require('../index'),
	es = require('event-stream'),
	expect = require('expect.js'),
	vs = require('vinyl-fs');

describe('TogaPuraTailor', function () {
	var compiler = TogaCompilerPura;

	it('should create an instance when invoked directly', function () {
		var c = compiler();
		expect(c instanceof TogaCompilerPura).to.be(true);
	});

	it('should create an instance when called with `new`', function () {
		var c = new TogaCompilerPura();
		expect(c instanceof TogaCompilerPura).to.be(true);
	});

	describe('prototype', function () {
		describe('_transform', function () {
			var toAst = function (file, cb) {
				file.toga = {
					ast: JSON.parse(file.contents.toString())
				};

				cb(null, file);
			};

			it('should convert AST to HTML', function (done) {
				vs.src(__dirname + '/fixtures/**/*.*')
					.pipe(es.map(toAst))
					.pipe(compiler())
					.pipe(vs.dest(__dirname + '/actual'))
					.on('end', done);
			});
		});
	});
});
