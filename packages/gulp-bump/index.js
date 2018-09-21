"use strict";

const bumpregex = require( "bump-regex" );
const chalk = require( "chalk" );
const minimist = require( "minimist" );
const PluginError = require( "plugin-error" );
const log = require( "plugin-log" );
const through = require( "through2" );

/**
 * Return's a new Gulp plugin error.
 * 
 * @param {*} message The error message or object.
 */
function error( message ) {

    return new PluginError( "@futagoza/gulp-bump", message );

}

/**
 * The default summary shown after bumping is done.
 * 
 * @param {String} filename The bumped file's name.
 * @param {{}} result The result from `bump-regex` used to bump the file.
 */
function summary( filename, result ) {

    log(
        "Bumped", chalk.cyan( result.prev ),
        "to", chalk.green( result.new ),
        typeof filename !== "string" ? ""
            : "in " + chalk.yellow(
                filename
                    .replace( process.cwd(), "" )
                    .replace( /\\/g, "/" )
                    .replace( /^\//, "" )
            )
    );

}

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

    options = Object.assign( {}, options, minimist( argv, {

        boolean: [ "case", "major", "minor", "keepmetadata", "patch" ],
        string: [ "type", "key", "keys", "preid", "regex", "new-version" ],
        alias: {
            tag: "keepmetadata",
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

    if ( typeof options.keys === "string" ) options.keys = options.keys.split( "," );
    if ( typeof options.regex === "string" ) options.regex = new RegExp( options.regex );

    const printSummary = typeof options.summary === "function" ? options.summary : summary;

    return through.obj( ( file, encoding, cb ) => {

        if ( file.isNull() ) return cb( null, file );
        if ( file.isStream() ) return cb( error( "Streaming not supported" ) );

        options.str = String( file.contents );
        bumpregex( options, ( err, result ) => {

            if ( err ) return cb( error( err ) );
            file.contents = Buffer.from( result.str, encoding );

            if ( ! options.quiet ) printSummary( file.path, result );

            file.bumpData = result;
            cb( null, file );

        } );

    } );

}

// Exports

module.exports = bump;
module.exports.bump = bump;
module.exports.default = bump;
module.exports.error = error;
module.exports.summary = summary;
