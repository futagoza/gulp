"use strict";

/**
 * Check if the given object is a `Promise`-like object.
 * 
 * @param {*} object An instance of Promise.
 */
function isPromise( object ) {

    const T = typeof object;

    return object
        && ( T === "function" || T === "object" )
        && typeof object.catch === "function"
        && typeof object.then === "function";

}

module.exports = isPromise;
