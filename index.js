'use strict';

/**
 * # Toga Pura Compiler
 *
 * A light theme for [Toga](http://togajs.github.io/) documentation.
 */

var proto,
	Transform = require('stream').Transform,
	handlebars = require('handlebars'),
	inherits = require('mtil/function/inherits'),
	mixin = require('mtil/object/mixin'),

	/**
	 * Default options.
	 */
	defaults = {
		title: 'Documentation'
	};

require('./assets/helpers')(handlebars);
require('./assets/partials')(handlebars);

/**
 * @class PuraCompiler
 * @extends Transform
 *
 * @constructor
 * @param {Object} options
 */
function PuraCompiler(options) {
	if (!(this instanceof PuraCompiler)) {
		return new PuraCompiler(options);
	}

	/**
	 * @property options
	 * @type {Object}
	 */
	this.options = mixin({}, defaults, options);

	Transform.call(this, { objectMode: true });
}

proto = inherits(PuraCompiler, Transform);

/**
 * @method _transform
 * @param {Vinyl} file
 * @param {String} enc
 * @param {Function} cb
 */
proto._transform = function (file, enc, cb) {
	var options = this.options,
		path = file && file.path,
		ast = file && file.ast;

	if (!ast) {
		return cb();
	}

	// Create new path
	// TODO: refactor this
	file.path = file.base + file.path.replace(file.cwd, '').replace(/[\\\/]/g, '_') + '.html';

	// Create new contents
	file.contents = new Buffer(handlebars.partials.index({
		title: options.title,
		path: path.replace(file.cwd, ''),
		ext: path.split('.').pop(),
		ast: ast
	}));

	this.push(file);

	cb();
};

exports.compiler = PuraCompiler;
