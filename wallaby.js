// Wallaby.js configuration

var webpackConfig = require('./webpack.config');

var wallabyWebpack = require('wallaby-webpack');
var wallabyPostprocessor = wallabyWebpack({});

module.exports = function (wallaby) {
    return {
        // set `load: false` to all source files and tests processed by webpack
        // (except external files),
        // as they should not be loaded in browser,
        // their wrapped versions will be loaded instead
        files: [
            // {pattern: 'lib/jquery.js', instrument: false},
            {pattern: 'src/**/*.js', load: false},
            {pattern: 'src/**/*.ts', load: false},
            {pattern: 'src/**/*.tsx', load: false}
        ],

        tests: [
            {pattern: 'test/**/*.js', load: false},
            {pattern: 'test/**/*.ts', load: false},
            {pattern: 'test/**/*.tsx', load: false}
        ],

        postprocessor: wallabyPostprocessor,

        testFramework: 'jasmine@2.4.1',

        setup: function () {
            // required to trigger test loading
            window.__moduleBundler.loadTests();
        }
    };
};
