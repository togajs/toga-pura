'use strict';

var TogaCompilerPura = require('../index');
var es = require('event-stream');
var vs = require('vinyl-fs');

describe('TogaPuraTailor', function () {
    var compiler = TogaCompilerPura;

    it('should create an instance when invoked directly', function () {
        var c = compiler();
        expect(c instanceof TogaCompilerPura).toBe(true);
    });

    it('should create an instance when called with `new`', function () {
        var c = new TogaCompilerPura();
        expect(c instanceof TogaCompilerPura).toBe(true);
    });

    describe('#_transform', function () {
        var toAst = function (file, cb) {
            file.toga = {
                ast: JSON.parse(file.contents.toString())
            };

            cb(null, file);
        };

        var toConsole = function (file, cb) {
            console.log(file.contents.toString());

            cb(null, file);
        };

        it('should', function (done) {
            vs.src(__dirname + '/fixtures/**/*.*')
                .pipe(es.map(toAst))
                .pipe(compiler())
                .pipe(es.map(toConsole))
                .on('end', done);
        });
    });
});
