"use strict";

const gulp = require( "gulp" );
const bump = require( "./bump" );
const publish = require( "./publish" );
const pump = require( "pump" );

// Bump the "version" field of `package.json`
gulp.task( "bump", () => pump(

    gulp.src( "package.json" ),
    bump(),
    gulp.dest( "./" )

) );

// Puplish `@futagoza/gulp`
gulp.task( "publish", () => pump(
    gulp.src( "." ),
    publish( )
) );
