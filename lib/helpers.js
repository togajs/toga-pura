'use strict';

var layouts = require('handlebars-layouts');

module.exports = function (handlebars) {
    layouts(handlebars);

    handlebars.registerHelper('partial', function (partial) {
        var context = Object.create(this);
        var template = handlebars.partials[partial.toLowerCase()];

        // Partial template required
        if (typeof template === 'undefined') {
            throw new Error('Missing layout partial: \'' + partial + '\'');
        }

        // Render final layout partial with revised blocks
        if (typeof template === 'function') {
            return template(context);
        }

        // Compile, then render
        return handlebars.compile(template)(context);
    });
};
