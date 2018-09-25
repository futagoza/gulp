"use strict";

const { color, log } = require( "@futagoza/cli-utils" );
const bumpregex = require( "bump-regex" );
const parseArgv = require( "./lib/parseArgv" );
const PluginError = require( "plugin-error" );
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

    log.info(
        "Bumped", color.cyan( result.prev ),
        "to", color.green( result.new ),
        typeof filename !== "string" ? ""
            : "in " + color.yellow(
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

    options = parseArgv( argv, options );
    options.version = options[ "new-version" ] || options.V || options.version;

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
