'use strict';

/**
 * # Toga Pura Compiler
 *
 * A theme for [Toga](http://togajs.github.io/) documentation.
 */

var trabea = require('trabea'),
	mixin = require('mtil/object/mixin'),

	/** Default options. */
	defaults = {
	};

exports.compiler = function (options) {
	options = mixin({}, defaults, options);

	return trabea(options);
};
