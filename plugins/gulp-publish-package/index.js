"use strict";

const { existsSync } = require( "fs" );
const { join } = require( "path" );
const { color, log } = require( "@futagoza/cli-utils" );
const match = require( "gulp-match" );
const parseArgv = require( "./lib/parseArgv" );
const publish = require( "@futagoza/publish-package" );
const PluginError = require( "plugin-error" );
const through = require( "through2" );

/**
 * Builds a Gulp plugin error for this package.
 * 
 * @param {String} message The error message
 */
function error( message ) {

    return new PluginError( "@futagoza/gulp-publish-package", message );

}

/**
 * Default status logger.
 *
 * @param {String} path The path of the package being published.
 * @param {String} command Command to spawn.
 * @param {String[]} args Arguments that will be passed to the spawned process.
 */
function defaultLogger( path, command, args ) {

    args = args.slice( 0 );

    args.unshift( color.magenta( path.replace( /\\/g, "/" ) ), command );

    log.info( ...args );

}

/**
 * Will publish the NPM packages passed to it from Gulp.
 *
 * @param {String[]} [argv] This is `process.argv` by default.
 * @param {{}} [options] The options that are appended to the command.
 */
function publishThrough( argv, options = {} ) {

    if ( ! Array.isArray( argv ) ) {

        options = argv || {};
        argv = options.argv || process.argv.slice( 2 );

    }
    options = parseArgv( argv, options );

    if ( ! options.log ) options.log = defaultLogger;

    return through.obj( ( file, encoding, done ) => {

        const path = file.path;

        if ( file.isStream() ) return done( error( "Streaming not supported" ) );
        if ( ! existsSync( path ) ) return done( error( "Path not found: " + path ) );
        if ( ! match( file, options.only || true ) ) return done( null, file );

        publish( path, options )
            .catch( done )
            .then( result => done( null, result ) );

    } );

}

module.exports = publishThrough;
