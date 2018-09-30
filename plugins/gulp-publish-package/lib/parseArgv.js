"use strict";

const { visitArgv } = require( "@futagoza/cli-utils" );

/**
 * Will look through the given _argv_-like _array_ for known options.
 * 
 * __NOTE:__ All options are expected to start with `--`, and unless a known NPM or Yarn flag,
 * must always be followed by a value.
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

        // Remove the `--` at the start
        const option = arg.slice( 2 );

        switch ( option ) {

            // Command line options with values
            case "access":
            case "new-version":
            case "newVersion":
            case "only":
            case "otp":
            case "otpcode":
            case "registry":
            case "reg":
            case "tag":
                if ( ! nextArg() ) throw new Error( `Expecting an argument for "${ arg }"` );
                options[ option ] = nextArg.consume();
                break;

            // Command line options without values (flags)
            case "dry-run":
            case "dry":
            case "dryRun":
            case "private":
            case "public":
            case "scoped":
            case "restricted":
            case "yarn":
                options[ option ] = true;
                break;

        }

    } );

    // And... we're done.
    return options;

}

module.exports = parseArgv;
