"use strict";

const gulpbump = require( "gulp-bump" );
const minimist = require( "minimist" );

/**
 * Will bump the `version` field of any file passed to it from Gulp.
 * 
 * @param {String[]} [argv] This is `process.argv` by default.
 * @param {{}} [options] The default options to pass to `gulp-bump`.
 */
function bump( argv, options = {} ) {

    if ( ! Array.isArray( argv ) ) {

        options = argv || {};
        argv = options.argv || process.argv.slice( 2 );

    }

    Object.assign( options, minimist( argv, {

        boolean: [ "major", "minor", "patch" ],
        string: [ "type", "new-version" ],
        alias: {
            V: "new-version"
        },

    } ) );
    options.version = options[ "new-version" ] || options.version;

    if ( ! options.type && ! options.version ) {

        if ( options.major ) options.type = "major";
        else if ( options.minor ) options.type = "minor";
        else if ( options.patch ) options.type = "patch";
        else options.type = "patch";

    }

    return gulpbump( options );

}

module.exports = bump;
module.exports.bump = bump;
module.exports.default = bump;
