"use strict";

/**
 * Extension added to the publishing command.
 */
const _ext = process.platform === "win32" ? ".cmd" : "";

/**
 * Generate the command `npm` or `yarn`, based on the options.
 * 
 * @param {{}} options An options object passed to the callee, then passed here.
 * @param {String} preference The default tool to use (defaults to _npm_).
 * @returns {String} `npm`, `npm.cmd`, `yarn`, or `yarn.cmd`
 */
function generateCommand( options = {}, preference = "npm" ) {

    if ( options.dry || options.dryRun || options[ "dry-run" ] ) return "npm" + _ext;

    if ( options.yarn || options.newVersion || options[ "new-version" ] ) return "yarn" + _ext;

    return preference + ( preference.includes( "." ) ? "" : _ext );

}

module.exports = generateCommand;
