'use strict';

/**
 * # Toga Pura Compiler
 *
 * A light theme for [Toga](http://togajs.github.io/) documentation.
 */

var File = require('vinyl');
var Transform = require('stream').Transform;
var handlebars = require('handlebars');
var inherits = require('mout/lang/inheritPrototype');
var mixIn = require('mout/object/mixIn');

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

var proto = inherits(TogaCompilerPura, Transform);

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
 * @param {String} file
 * @param {String} enc
 * @param {Function} cb
 */
proto._transform = function (file, enc, cb) {
    var options = this.options;
    var toga = file && file.toga;
    var ast = toga && toga.ast;

    if (!ast) {
        return cb();
    }

    file.contents = new Buffer(handlebars.partials.index({
        title: options.title,
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
