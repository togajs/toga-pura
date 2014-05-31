'use strict';

/**
 * # Toga Pura Compiler
 *
 * A light theme for [Toga](http://togajs.github.io/) documentation.
 */

var proto,
	File = require('vinyl'),
	Transform = require('stream').Transform,
	handlebars = require('handlebars'),
	inherits = require('mout/lang/inheritPrototype'),
	mixIn = require('mout/object/mixIn');

require('./lib/helpers')(handlebars);
require('./lib/partials')(handlebars);

/**
 * @class TogaCompilerPura
 * @extends Transform
 *
 * @constructor
 * @param {Object} options
 */
function TogaCompilerPura(options) {
	if (!(this instanceof TogaCompilerPura)) {
		return new TogaCompilerPura(options);
	}

	/**
	 * @property options
	 * @type {Object}
	 */
	this.options = mixIn({}, this.defaults, options);

	/**
	 * @property data
	 * @type {Object}
	 */
	this.data = {};

	Transform.call(this, { objectMode: true });
}

proto = inherits(TogaCompilerPura, Transform);

/**
 * Default options.
 *
 * @property defaults
 * @type {Object}
 */
proto.defaults = {
	title: 'Documentation'
};

/**
 * @method _transform
 * @param {Vinyl} file
 * @param {String} enc
 * @param {Function} cb
 */
proto._transform = function (file, enc, cb) {
	var options = this.options,
		path = file && file.path,
		toga = file && file.toga,
		ast = toga && toga.ast;

	if (!ast) {
		return cb();
	}

	// Create new path (this is gross)
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

/**
 * @method _flush
 * @param {Function} cb
 */
proto._flush = function (cb) {
	this.push(new File({
		path: 'data.json',
		contents: new Buffer(JSON.stringify(this.data, null, 2))
	}));

	cb();
};

module.exports = TogaCompilerPura;
