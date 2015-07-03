/**
 * # Toga Pura Compiler
 */

import Trabea from 'trabea';

var compilerDefaults = {
	name: 'toga-pura'
};

export function compiler(options) {
	return new Trabea({
		...compilerDefaults,
		...options
	});
};
