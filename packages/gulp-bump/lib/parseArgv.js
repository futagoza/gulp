"use strict";

const { visitArgv } = require( "@futagoza/cli-utils" );

/**
 * Will look through the given _argv_-like _array_ for known options.
 * 
 * __WARNING:__ Will throw a fatel error.
 * 
 * @param {String[]} args The arguments array (typically `process.argv.slice(2)`)
 * @param {{}} [defaults] An optional object containing the default options.
 * @returns {{}} The known options found in `args`
 */
function parseArgv( args, defaults ) {

    // Initlize the options object that will be will have it's defaults overwritten
    const options = typeof defaults === "object" ? Object.assign( {}, defaults ) : {};

    // Iterate over the args
    visitArgv( args, ( arg, nextArg ) => {

        // Remove the `--` or `-` at the start
        const option = arg.startsWith( "--" ) ? arg.slice( 2 ) : arg.slice( 1 );

        switch ( option ) {

            // Command line options with values
            case "key":
            case "keys":
            case "new-version":
            case "only":
            case "preid":
            case "regex":
            case "type":
            case "V":
                if ( ! nextArg() ) throw new Error( `Expecting an argument for "${ arg }"` );
                options[ option ] = nextArg.consume();
                break;

            // Command line options without values (flags)
            case "case":
            case "keepmetadata":
            case "major":
            case "minor":
            case "patch":
            case "tag":
                options[ option ] = true;
                break;

        }

    } );

    // And... we're done.
    return options;

}

module.exports = parseArgv;
