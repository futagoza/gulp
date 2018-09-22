"use strict";

/**
 * Will look through the given _argv_-like _array_ or _string_ for known options.
 * 
 * __NOTE:__ All options are expected to start with `--`, and unless a known NPM or Yarn flag,
 * must always be followed by a value.
 * 
 * @param {String|String[]} args The arguments array (typically `process.argv.slice(2)`)
 * @param {{}} [defaults] An optional object containing the default options.
 * @returns {{}} The known options found in `args`
 */
function parseArgv( args, defaults ) {

    // Initlize the options object that will be will have it's defaults overwritten
    const options = typeof defaults === "object" ? Object.assign( {}, defaults ) : {};

    // Yes, a string can be used because I prefer a nice clean string over a noisy array
    args = typeof args === "string" ? args.split( " " ) : args.slice( 0 );

    while ( args.length !== 0 ) {

        // Get the next argument and remove the `--` at the start
        const arg = args.shift().slice( 2 );

        switch ( arg ) {

            // Command line options with values
            case "access":
            case "new-version":
            case "newVersion":
            case "otp":
            case "otpcode":
            case "registry":
            case "reg":
            case "tag":
                options[ arg ] = args.shift();
                break;

            // Command line options without values (flags)
            case "dry-run":
            case "dry":
            case "dryRun":
            case "public":
            case "scoped":
            case "restricted":
            case "private":
                options[ arg ] = true;
                break;

        }

    }

    // And... we're done.
    return options;

}

module.exports = parseArgv;
