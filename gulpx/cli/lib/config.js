"use strict";

const { dirname } = require( "path" );
const lookup = require( "./lookup" );

/**
 * Returns a frozen config that __@gulpx/cli__ will use while it is running.
 * 
 * @param {{}} [settings] Config property defaults
 */
function config( settings = {} ) {

    let autoDefault, root;
    let { clientfile, clientname, cwd, provider, options, requests } = settings;

    if ( typeof cwd !== "string" ) cwd = process.cwd();
    if ( typeof options !== "object" ) options = {};
    if ( ! Array.isArray( requests ) ) requests = [];
    if ( typeof provider !== "string" ) provider = lookup.file( cwd );
    if ( provider ) {

        root = dirname( provider );

        if ( typeof clientfile !== "string" ) {

            const rmd = lookup.dependency( root );
            clientname = rmd.name;
            clientfile = rmd.file;

        }

    }

    if ( requests.length === 0 ) {

        autoDefault = true;
        requests[ 0 ] = "default";

    }

    return Object.freeze( {
        autodefault: autoDefault === true,
        clientfile,
        clientname,
        cwd,
        provider,
        options,
        root,
        requests,
    } );

}

module.exports = config;
