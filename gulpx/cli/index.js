"use strict";

const { color, log } = require( "@futagoza/cli-utils" );
const config = require( "./lib/config" );
const isPromise = require( "./lib/isPromise" );
const isStream = require( "./lib/isStream" );
const lookup = require( "./lib/lookup" );
const pump = require( "@futagoza/pump" );
const pretty = require( "pretty-hrtime" );
const series = require( "p-series" );

const DONE_SYMBOL = Symbol( "gulpx task done" );
const PATH_ERROR = T => `gulpx-cli > The resolved path to a ${ T } is required`;

/**
 * Will execute Gulp tasks (set in the _settings_) in a encapsulated Promise.
 * 
 * __NOTE:__ If `settings` is given a _string_-type property called `config`, it will be presumed
 * that this is a resolved path to a config with default settings for _@gulpx/cli_
 * 
 * @param {{}} [settings] Config property defaults
 */
function main( settings = {} ) {

    if ( typeof settings.config === "string" ) try {

        settings = Object.assign( {}, require( settings.config ), settings );

    } catch ( ex ) {

        return Promise.reject( ex );

    }

    const { autoDefault, apifile, apiname, gulpfile, options, root, tasks } = config( settings );

    if ( typeof gulpfile !== "string" ) return Promise.reject( PATH_ERROR( "'gulpfile.js'" ) );
    if ( typeof apifile !== "string" ) return Promise.reject( PATH_ERROR( "Gulp API" ) + ` from ${ root }` );

    let gulpApi;
    const unfinished = [];

    return series( [

        () => {

            log.info( `Using gulpfile ${ color.magenta( gulpfile ) }`, apiname ? ` (${ apiname })` : "" );

            gulpApi = require( apifile );
            require( gulpfile );

        },

        ...tasks.map( taskName => () => {

            let hrtime;

            const task = new Promise( ( resolve, reject ) => {

                const taskJob = gulpApi.task( taskName );

                if ( gulpApi.lastRun( taskName ) ) return resolve( DONE_SYMBOL );
                if ( ! taskJob ) {

                    if ( autoDefault ) return reject( "gulpx-cli > No tasks were found." );
                    return reject( `gulpx ${ taskName } is not a registered task.` );

                }
                if ( typeof taskJob !== "function" ) return resolve( DONE_SYMBOL );

                function done( err ) {

                    err ? reject( err ) : resolve( DONE_SYMBOL );

                }

                log.info( `Starting '${ color.cyanBright( taskName ) }'...` );
                hrtime = process.hrtime();

                let job;
                try {

                    job = taskJob( done, options );

                } catch ( ex ) {

                    return reject( ex );

                }

                if ( isPromise( job ) )

                    job
                        .catch( done )
                        .then( () => done() );

                else if ( isStream( job ) || Array.isArray( job ) )

                    pump( job )
                        .catch( done )
                        .then( () => done() );

            } );

            return task.then( result => {

                if ( result !== DONE_SYMBOL ) {

                    unfinished.push( taskName );
                    return void 0;

                }

                hrtime = pretty( process.hrtime( hrtime ) );
                log.info( `Finished '${ color.cyanBright( taskName ) }' after ${ color.magenta( hrtime ) }` );

            } );

        } ),

        () => {

            if ( unfinished.length < 1 ) return void 0;

            // `Promise.reject()` here instead?
            log.warning( color.red( "The following tasks did not complete:" ), color.cyanBright( unfinished.join( ", " ) ) );
            log.warning( color.red( "Did you forget to signal async completion?" ) );

        },

    ] );

}

module.exports = { main, lookup };
