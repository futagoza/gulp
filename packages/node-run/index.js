/* eslint-disable no-unneeded-ternary */

"use strict";

const cp = require( "child_process" );

/**
 * This package's name.
 * 
 * @type {String}
 */
const PACKAGE_NAME = require( "./package.json" ).name;

/**
 * Confirm if the given error was thrown from a spawn'ed process.
 * 
 * @param {Error} error An error instance.
 */
function isSpawnError( error ) {

    return error.name === PACKAGE_NAME
        || error.SpawnError === true
        || ( error.spawnargs && error.syscall ) ? true : false;

}

/**
 * Return's either a buffer or a string depending on `encoding`.
 * 
 * @param {[]} data 
 * @param {String} encoding
 */
function compile( data, { encoding = "buffer" } ) {

    return encoding === "buffer" ? Buffer.concat( data ) : data.join( "" ).trim();

}

/**
 * Will run `child_process.spawn()` wrapped in a `Promise`.
 *
 * @param {String} command Path of the executable to run as a child process.
 * @param {String[]} [args] Arguments to pass to the child process.
 * @param {{}} [options] Options passed to `child_process.spawn()`.
 */
function run( command, args, options = {} ) {

    if ( ! Array.isArray( args ) ) {

        options = args || {};
        args = options.args || options.argv || null;

    }

    if ( args === null ) {

        const [ head, ...tail ] = command.split( options.ws || " " );

        command = head;
        args = tail;

    }

    options.stdio = options.stdio || ( options.pipe ? "pipe" : options.inherit ? "inherit" : "inherit" );
    const STDIO_IS_PIPE = options.stdio === "pipe";
    const input = options.input;

    return new Promise( ( resolve, _reject ) => {

        let CLOSE_CODE = 0;
        let stdout = STDIO_IS_PIPE ? [] : null;
        let stderr = STDIO_IS_PIPE ? [] : null;

        /**
         * - If a string, create an error object; Otherwise assume it's an object.
         * - Attach properties to the error to identify it as an error of this module.
         * - Attach stdio, Spawn and othe usefull objects?
         * - Promise.reject
         * 
         * @param {Error} error
         */
        function reject( error ) {

            if ( typeof error === "string" ) error = new Error( error );

            error.code = CLOSE_CODE;
            error.name = PACKAGE_NAME;
            error.SpawnError = true;
            error.stdout = stdout ? stdout.slice( 0 ) : null;
            error.stderr = stderr ? stderr.slice( 0 ) : null;

            error.path = command;
            error.spawnargs = args;
            error.syscall = "spawn " + command;

            return _reject( error );

        }

        const child = cp.spawn( command, args, options );

        if ( STDIO_IS_PIPE ) {

            child.stdout
                .on( "error", reject )
                .on( "data", data => stdout.push( data ) );

            child.stderr
                .on( "error", reject )
                .on( "data", data => stderr.push( data ) );

            if ( input )

                child.stdin
                    .on( "error", reject )
                    .end( input );

        }

        child
            .on( "error", reject )
            .on( "close", ( code, signal ) => {

                if ( STDIO_IS_PIPE ) {

                    stdout = compile( stdout, options );
                    stderr = compile( stderr, options );

                }

                if ( code === 0 ) return resolve( { command, args, options, signal, stderr, stdout } );

                CLOSE_CODE = code;
                return reject( `command exited with code: ${ code }` );

            } );

    } );

}

// Exports

module.exports = run;
module.exports.run = run;
module.exports.isSpawnError = isSpawnError;
module.exports.default = run;
