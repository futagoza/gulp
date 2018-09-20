"use strict";

const cp = require( "child_process" );

/**
 * Will run `child_process.spawn()` wrapped in a `Promise`.
 *
 * @param {String} command Path of the executable to run as a child process.
 * @param {String[]} [args] Arguments to pass to the child process.
 * @param {{}} [options] Options passed to `child_process.spawn()`.
 */
function exec( command, args, options = {} ) {

    if ( ! Array.isArray( args ) ) {

        options = args || {};
        args = options.args || options.argv || null;

    }

    if ( args === null ) {

        const [ head, ...tail ] = command.split( options.ws || " " );

        command = head;
        args = tail;

    }

    if ( ! options.stdio ) options.stdio = "inherit";

    return new Promise( ( resolve, reject ) => {

        cp.spawn( command, args, options )

            .on( "error", reject )
            .on( "close", ( code, signal ) => resolve( { code, signal } ) );

    } );

}

module.exports = exec;
module.exports.exec = exec;
module.exports.default = exec;
