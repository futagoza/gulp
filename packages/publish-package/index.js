"use strict";

const { existsSync } = require( "fs" );
const { join } = require( "path" );
const run = require( "@futagoza/node-run" );
const buildArgv = require( "./lib/buildArgv" );
const generateCommand = require( "./lib/generateCommand" );
const reject = require( "./lib/reject" );

/**
 * Will publish the Node package in the given folder via NPM or Yarn.
 * 
 * _NOTE:_ Returns a rejected promise if no `package.json` is found.
 * 
 * @param {String} [path] The package directory.
 * @param {{}} [options] Options to pass to the publishing too;
 */
function publish( path, options = {} ) {

    if ( typeof path !== "string" ) {

        options = typeof path === "object" ? path : {};
        path = options.path || options.folder || options.dir || false;

    }
    options = Object.assign( {}, options );

    if ( ! path ) return reject( new Error( "No path specified to publish" ) );
    if ( ! existsSync( join( path, "package.json" ) ) ) {

        return reject( new Error( "A package.json was not found at " + path ), { path } );

    }

    if ( options.access ) {

        if ( options.restricted )

            return reject( new Error( `The options "access" and "restricted" cant be used together` ) );

        if ( options.private )

            return reject( new Error( `The options "access" and "private" cant be used together` ) );

        if ( options.public )

            return reject( new Error( `The options "access" and "public" cant be used together` ) );

        if ( options.scoped )

            return reject( new Error( `The options "access" and "scoped" cant be used together` ) );

    } else if ( options.public || options.scoped ) {

        const access = options.public ? "public" : "scoped";

        if ( options.restricted )

            return reject( new Error( `The options "${ access }" and "restricted" cant be used together` ) );

        if ( options.private )

            return reject( new Error( `The options "${ access }" and "private" cant be used together` ) );

    } else if ( options.restricted || options.private ) {

        const access = options.restricted ? "restricted" : "private";

        if ( options.public )

            return reject( new Error( `The options "${ access }" and "public" cant be used together` ) );

        if ( options.scoped )

            return reject( new Error( `The options "${ access }" and "scoped" cant be used together` ) );

    } else {

        options.access = "public";

    }

    if ( ! options.yarn && ! options.registry ) options.registry = "https://registry.npmjs.org/";

    const command = generateCommand( options );
    const args = buildArgv( options );
    const runOpts = { cwd: path };

    if ( typeof options.runOpts === "object" ) Object.assign( runOpts, options.runOpts );
    if ( typeof options.log === "function" ) options.log( path, command, args, runOpts );

    return run( command, args, runOpts );

}

module.exports = publish;
