"use strict";

const { existsSync } = require( "fs" );
const { join } = require( "path" );
const { color, log } = require( "@futagoza/cli-utils" );
const parseArgv = require( "./lib/parseArgv" );
const publish = require( "@futagoza/publish-package" );
const PluginError = require( "plugin-error" );
const through = require( "through2" );
const toRegex = require( "to-regex" );

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
 * __NOTE:__ If `path` is the only argument, it's persumed this is normal log.
 *
 * @param {String} path The path of the package being published.
 * @param {String} [command] Command to spawn.
 * @param {String[]} [args] Arguments that will be passed to the spawned process.
 * @param {{}} [runOpts] Options that will be passed to the spawned process.
 */
function defaultLogger( path, command, args, runOpts ) {

    if ( ! command && ! args && ! runOpts ) {

        log.info( path );

    } else {

        args = args.slice( 0 );

        args.unshift( color.magenta( path.replace( /\\/g, "/" ) ), command );

        log.info( ...args );

    }

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
    options.checkVersion = options.checkVersion || options[ "check-version" ];

    if ( ! options.log ) options.log = defaultLogger;

    let ignore = void 0;
    if ( typeof options.only === "string" )

        ignore = toRegex( options.only, {
            contains: true,
            negate: options.ignore !== true,
            nocase: true,
        } );

    return through.obj( ( file, encoding, done ) => {

        const path = file.path;

        if ( file.isStream() ) return done( error( "Streaming not supported" ) );
        if ( ! existsSync( path ) ) return done( error( "Path not found: " + path ) );

        if ( ignore ) {

            const { name } = require( join( path, "package.json" ) );
            if ( ignore.test( name ) ) return done( null, file );

        }

        publish( path, options )
            .catch( done )
            .then( result => done( null, result ) );

    } );

}

module.exports = publishThrough;
