"use strict";

const detect = require( "detect-file" );
const { dirname, join } = require( "path" );
const resolve = require( "resolve-from" ).silent;

const detectOpts = { "nocase": true };

/**
 * Returns the nearest `filename` to the given `cwd`, or returns nothing.
 * 
 * @param {string} cwd The directory to start the search from.
 * @param {string} [filename] The file to look for (defaults to __gulpfile.js__).
 * @returns {string|void} The resolved path to `filename` or `undefined`
 */
function file( cwd, filename = "gulpfile.js" ) {

    const path = detect( join( cwd, filename ), detectOpts );
    if ( path ) return path;

    const dir = dirname( cwd );
    if ( dir !== cwd ) return file( dir );

}

/**
 * Will attempt to resolve one of the given `modules` from `cwd`, and return it's name along
 * with the resolved path for the modules main file.
 * 
 * The default `modules` it looks for are __gulp__ and __@futagoza/gulpx__
 * 
 * @param {string} cwd The directory to start the search from.
 * @param {string[]} [modules] An array of module names to search for.
 * @returns {{file?:string,name?:string}} The resolved module.
 */
function dependency( cwd, modules = [ "gulp", "@futagoza/gulpx" ] ) {

    let file, name;

    for ( const module of modules ) {

        file = resolve( cwd, module );
        if ( file ) {

            name = module;
            break;

        }

    }

    return { file, name };

}

// Export

module.exports = { file, dependency };
