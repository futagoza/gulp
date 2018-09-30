"use strict";

const { dirname } = require( "path" );
const lookup = require( "./lookup" );

/**
 * Returns a config that the __gulpx-cli__ will use while it is running.
 * 
 * @param {{}} [settings] Config property defaults
 * @returns {{}} The resolved config.
 */
function config( settings = {} ) {

    let autoDefault, root;
    let { apifile, apiname, cwd, gulpfile, options, tasks } = settings;

    if ( typeof cwd !== "string" ) cwd = process.cwd();
    if ( typeof options !== "object" ) options = {};
    if ( ! Array.isArray( tasks ) ) tasks = [];
    if ( typeof gulpfile !== "string" ) gulpfile = lookup.gulpfile( cwd );
    if ( gulpfile ) {

        root = dirname( gulpfile );

        if ( typeof apifile !== "string" ) {

            apifile = lookup.api( root );
            if ( apifile ) {

                apiname = apifile.name;
                apifile = apifile.file;

            }

        }

    }

    if ( tasks.length === 0 ) {

        autoDefault = true;
        tasks[ 0 ] = "default";

    }

    return {
        autoDefault: autoDefault === true,
        apifile,
        apiname,
        gulpfile,
        options,
        root,
        tasks,
    };

}

module.exports = config;
