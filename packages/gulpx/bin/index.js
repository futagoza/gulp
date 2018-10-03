"use strict";

const { color, log } = require( "@futagoza/cli-utils" );
const config = require( "./config" );
const asyncDone = require( "async-done" );
const lookup = require( "./lookup" );
const pretty = require( "pretty-hrtime" );
const series = require( "p-series" );

const DONE_SYMBOL = Symbol( "gulpx task done" );
const PATH_ERROR = T => `gulpx > The resolved path to a ${ T } is required`;

/**
 * Will execute Gulp tasks (set in the _settings_) in a encapsulated Promise.
 * 
 * __NOTE:__ If `settings` is given a _string_-type property called `config`, it will be presumed
 * that this is a resolved path to a config with default settings for _@futagoza/gulpx_
 * 
 * @param {{}} [settings] Config property defaults
 */
function main( settings = {} ) {

    if ( typeof settings.config === "string" ) try {

        settings = Object.assign( {}, require( settings.config ), settings );

    } catch ( ex ) {

        return Promise.reject( ex );

    }

    const { autodefault, clientfile, clientname, provider, options, root, requests } = config( settings );

    if ( typeof provider !== "string" ) return Promise.reject( PATH_ERROR( "'gulpfile.js'" ) );
    if ( typeof clientfile !== "string" ) return Promise.reject( PATH_ERROR( "Gulp client" ) + ` from ${ root }` );

    let gulpClient;
    const finished = {};

    return series( [

        () => {

            log.info( `Using gulpfile ${ color.magenta( provider ) }`, clientname ? ` (${ clientname })` : "" );

            gulpClient = require( clientfile );
            require( provider );

        },

        ...requests.map( taskName => () => {

            let hrtime;

            const task = new Promise( ( resolve, reject ) => {

                const taskJob = gulpClient.task( taskName );

                if ( gulpClient.lastRun( taskName ) ) return resolve( DONE_SYMBOL );
                if ( ! taskJob ) {

                    if ( autodefault ) return reject( "gulpx > No tasks were found." );
                    return reject( `gulpx ${ taskName } is not a registered task.` );

                }
                if ( typeof taskJob !== "function" ) return resolve( DONE_SYMBOL );

                function finish( err ) {

                    err ? reject( err ) : resolve( DONE_SYMBOL );

                }

                log.info( `Starting '${ color.cyanBright( taskName ) }'...` );
                hrtime = process.hrtime();

                asyncDone( done => taskJob( done, options ), finish );

            } );

            return task.then( result => {

                if ( result !== DONE_SYMBOL ) return void 0;

                finished[ taskName ] = true;

                hrtime = pretty( process.hrtime( hrtime ) );
                log.info( `Finished '${ color.cyanBright( taskName ) }' after ${ color.magenta( hrtime ) }` );

            } );

        } ),

        () => {

            const finishedCount = Object.keys( finished ).length;
            const requestedCount = requests.length;

            log.info( `Done ${ color.blue( finishedCount ) } of ${ color.green( requestedCount ) } tasks.` );

            if ( finishedCount === requestedCount ) return void 0;

            const unfinished = [];
            requests.forEach( request => {

                if ( ! finished[ request ] ) unfinished.push( request );

            } );

            // `Promise.reject()` here instead?
            log.warning( color.red( "The following tasks did not complete:" ), color.cyanBright( unfinished.join( ", " ) ) );
            log.warning( color.red( "Did you forget to signal async completion?" ) );

        },

    ] );

}

module.exports = { main, lookup };
