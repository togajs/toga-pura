'use strict';

var pura = require('../index'),
	expect = require('expect.js');

describe('toga-pura spec', function () {
	describe('compiler', function () {
		it('should return a transform stream', function () {
			var retval = pura.compiler();

			expect(retval.pipe).to.be.a(Function);
			expect(retval.readable).to.be(true);
			expect(retval.writable).to.be(true);
		});
	});
});
