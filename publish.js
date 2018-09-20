"use strict";

const bluebird = require( "bluebird" );
const exec = require( "./exec" );
const { existsSync } = require( "fs" );
const glob = require( "glob" );
const { join } = require( "path" );
const log = require( "plugin-log" );
const minimist = require( "minimist" );
const PluginError = require( "plugin-error" );
const through = require( "through2" );

const CMD = process.platform === "win32" ? ".cmd" : "";
const error = message => new PluginError( "@futagoza/gulp/publish", message );
const rejection = reason => Promise.reject( error( reason ) );

/**
 * 
 * 
 * @param {String} [path]
 * @param {{}} [options]
 */
function publishFolder( path, options = {} ) {

    if ( typeof path !== "string" ) {

        options = typeof path === "object" ? path : {};
        path = options.path || options.folder || options.dir || false;

    }

    if ( ! path ) return rejection( "No path specified to publish" );
    if ( options.public || options.scoped ) {

        if ( options.access ) return rejection( "The options `access` and `public` cant be used together" );

        options.access = "public";

    }
    if ( options.restricted || options.private ) {

        const ERROR_REASON = "The options `access`, `private` and/or `restricted` cant be used together";
        if ( options.access || ( options.restricted && options.private ) ) return rejection( ERROR_REASON );

        options.access = "restricted";

    }

    const YARN = options.yarn;
    let command = YARN ? `yarn${ CMD } publish` : `npm${ CMD } publish`;
    command += ` --access ${ options.access || "public" }`;

    if ( options[ "dry-run" ] || options.dryRun || options.dry ) command += " --dry-run";

    if ( options.otp || options.otpcode ) command += ` --otp ${ options.otp || options.otpcode }`;

    if ( options.tag ) command += " --tag " + options.tag;

    if ( YARN && ( options.newVersion || options.version ) )

        command += ` --new-version ${ options.newVersion || options.version }`;

    if ( ! YARN ) command += ` --registry ${ options.registry || "https://registry.npmjs.org/" }`;
    else if ( options.registry ) command += ` --registry ${ options.registry }`;

    log( log.colors.magenta( path.replace( /\\/g, "/" ) ), command );
    return exec( command, { cwd: path } );

}

/**
 * 
 * 
 * @param {String|String[]} [patterns]
 * @param {{}} [options]
 */
function publishGlob( patterns, options = {} ) {

    if ( typeof patterns !== "string" || ! Array.isArray( patterns ) ) {

        options = patterns || {};
        patterns = options.patterns || options.globs || false;

    }
    if ( typeof patterns === "string" ) patterns = [ patterns ];

    if ( ! patterns ) return rejection( "No patterns specified to find paths to publish" );

    return bluebird.all( patterns.map( p => new Promise( ( resolve, reject ) => {

        glob( p, ( err, matches ) => {

            if ( err ) reject( err );

            bluebird
                .each( matches, d => publishFolder( d, options ) )
                .catch( reject )
                .then( resolve );

        } );

    } ) ) );

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

    Object.assign( options, minimist( argv, {

        boolean: [ "dry-run", "yarn", "public", "private", "restricted" ],
        string: [ "access", "otp", "tag", "newVersion", "registry" ],
        alias: {
            dry: "dry-run",
            dryRun: "dry-run",
            "new-version": "newVersion",
            otpcode: "otp",
            reg: "registry",
            scoped: "public",
            t: "tag",
            V: "newVersion"
        },

    } ) );

    return through.obj( ( file, encoding, done ) => {

        const path = file.path;

        if ( file.isStream() )

            done( error( "Streaming not supported" ) );

        else if ( ! existsSync( path ) )

            done( error( "Path not found: " + path ) );

        else

            publishFolder( path, options )
                .catch( done )
                .then( result => done( null, result ) );

    } );

}

// Exports
module.exports = publishThrough;
module.exports.default = publishThrough;
module.exports.glob = publishGlob;
module.exports.folder = publishFolder;
module.exports.through = publishThrough;
