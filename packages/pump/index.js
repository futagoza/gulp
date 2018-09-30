/* eslint-disable no-unneeded-ternary */

"use strict";

const cs = require( "@futagoza/create-stream" );
const pump = require( "pump" );

const TYPE_ERROR = "Expecting a either a function, promise or stream, but got ";

/**
 * Will wrap `pump` in a Promise, as well as change any promise's and functions to streams.
 *
 * @param {...Function} args Streams, functions and promises.
 */
function p( ...args ) {

    if ( args.length < 1 ) return Promise.resolve();
    if ( args.length === 1 && Array.isArray( args[ 0 ] ) ) args = args[ 0 ];
    if ( args.length === 1 ) args.push( () => void 0 );

    return new Promise( ( resolve, reject ) => {

        const streams = args.map( arg => {

            const T = typeof arg;
            if ( T !== "function" && T !== "object" ) return reject( new TypeError( TYPE_ERROR + T ) );

            if ( typeof arg.pipe === "function" ) return arg;

            return cs.createStream( arg );

        } );

        streams.push( err => {

            if ( err ) return reject( err );
            resolve();

        } );

        pump( ...streams );

    } );

}

// Exports

module.exports = p;
module.exports.default = p;
module.exports.p = p;
module.exports.pump = pump;
