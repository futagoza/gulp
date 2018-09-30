"use strict";

const detect = require( "detect-file" );
const { dirname, join } = require( "path" );
const resolve = require( "resolve-from" ).silent;

const detectOpts = { "nocase": true };

/**
 * Returns the nearest `gulpfile.js` to the given `cwd`, or returns nothing.
 * 
 * @param {string} cwd The directory to start the search from.
 * @returns {string|void} The resolved `gulpfile.js` or `undefined`
 */
function gulpfile( cwd ) {

    const filename = detect( join( cwd, "gulpfile.js" ), detectOpts );
    if ( filename ) return filename;

    const dir = dirname( cwd );
    if ( dir !== cwd ) return gulpfile( dir );

}

/**
 * Will attempt to resolve the modules __gulp__ or __@gulpx/api__ from `cwd`, and return the path
 * and name of the resolved API module.
 * 
 * @param {string} cwd The directory to start the search from.
 * @returns {{file?:string,name?:string}} The resolved API.
 */
function api( cwd ) {

    let apifile, apiname;

    apifile = resolve( cwd, "gulp" );
    if ( apifile ) {

        apiname = "gulp";

    } else {

        apifile = resolve( cwd, "@gulpx/api" );
        if ( apifile ) {

            apiname = "@gulpx/api";

        }

    }

    return {
        file: apifile,
        name: apiname,
    };

}

// Export

module.exports = { gulpfile, api };
