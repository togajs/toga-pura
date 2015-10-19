'use strict';

/**
 * # Toga Pura Compiler
 */

var trabea = require('trabea'),
	mixin = require('mtil/object/mixin'),

	/**
	 * Default options.
	 */
	defaults = {
		name: 'toga-pura'
	};

exports.formatter = function (options) {
	options = mixin({}, defaults, options);

	return trabea(options);
};
