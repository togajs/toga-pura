/**
 * # Toga Pura Compiler
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.compiler = compiler;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _trabea = require('trabea');

var _trabea2 = _interopRequireDefault(_trabea);

var compilerDefaults = {
	name: 'toga-pura'
};

function compiler(options) {
	return new _trabea2['default'](_extends({}, compilerDefaults, options));
}

;